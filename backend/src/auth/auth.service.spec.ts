/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { DatabaseService } from '../database/database.service';
import { MailService } from '@/mail/mail.service';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
  hash: jest.fn().mockResolvedValue('hashed-password'),
}));

import bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: any;
  let prisma: any;
  let mailService: any;

  const txMock = {
    refreshToken: {
      create: jest.fn(),
      deleteMany: jest.fn(),
    },
    auditLog: {
      create: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
            verify: jest.fn(),
          },
        },
        {
          provide: DatabaseService,
          useValue: {
            user: {
              findUnique: jest.fn(),
              update: jest.fn(),
            },
            refreshToken: {
              findUnique: jest.fn(),
              delete: jest.fn(),
            },
            $transaction: jest.fn((callback) => callback(txMock)),
          },
        },
        {
          provide: MailService,
          useValue: {
            sendForgotPasswordEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    prisma = module.get<DatabaseService>(DatabaseService);
    mailService = module.get<MailService>(MailService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    const storedUser = {
      id: 'user-1',
      email: 'user@test.com',
      password: 'hashed-in-db',
      name: 'User',
    };

    it('should throw UnauthorizedException if user does not exist', async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      await expect(
        service.validateUser('user@test.com', 'any-password'),
      ).rejects.toThrow(UnauthorizedException);

      expect(bcrypt.compare).not.toHaveBeenCalled();
    });

    it('should throw UnauthorizedException if password is invalid', async () => {
      prisma.user.findUnique.mockResolvedValue(storedUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(
        service.validateUser('user@test.com', 'wrong-password'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should return the user without the password when credentials are valid', async () => {
      prisma.user.findUnique.mockResolvedValue(storedUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.validateUser(
        'user@test.com',
        'correct-password',
      );

      expect(result).toEqual({
        id: storedUser.id,
        email: storedUser.email,
        name: storedUser.name,
      });
      expect(result).not.toHaveProperty('password');
    });
  });

  describe('login', () => {
    const data = { id: 'user-1', email: 'user@test.com', role: 'ADMIN' } as any;

    it('should throw UnauthorizedException if user does not exist', async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      await expect(service.login(data)).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if user is deactivated', async () => {
      prisma.user.findUnique.mockResolvedValue({
        id: 'user-1',
        deletedAt: new Date(),
      });

      await expect(service.login(data)).rejects.toThrow(UnauthorizedException);
    });

    it('should sign tokens, store the hashed refresh token and log the login', async () => {
      prisma.user.findUnique.mockResolvedValue({
        id: 'user-1',
        deletedAt: null,
      });
      jwtService.sign
        .mockReturnValueOnce('access-token')
        .mockReturnValueOnce('refresh-token');
      txMock.refreshToken.create.mockResolvedValue({});
      txMock.auditLog.create.mockResolvedValue({});

      const result = await service.login(data);

      expect(result).toEqual({
        acess_token: 'access-token',
        refresh_token: 'refresh-token',
      });
      expect(jwtService.sign).toHaveBeenNthCalledWith(
        1,
        { sub: data.id, email: data.email, role: data.role },
        { expiresIn: '15m' },
      );
      expect(jwtService.sign).toHaveBeenNthCalledWith(
        2,
        { sub: data.id, email: data.email, role: data.role },
        { expiresIn: '7d' },
      );
      expect(txMock.refreshToken.create).toHaveBeenCalledWith({
        data: {
          userId: data.id,
          token: expect.any(String), // hash sha256 do refresh_token, não o token puro
          expiresAt: expect.any(Date),
        },
      });
      // garante que o token salvo no banco não é o token em texto puro
      expect(txMock.refreshToken.create.mock.calls[0][0].data.token).not.toBe(
        'refresh-token',
      );
      expect(txMock.auditLog.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('refresh', () => {
    it('should throw UnauthorizedException if stored token is not found', async () => {
      prisma.refreshToken.findUnique.mockResolvedValue(null);

      await expect(service.refresh('some-token')).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should delete and throw UnauthorizedException if stored token is expired', async () => {
      prisma.refreshToken.findUnique.mockResolvedValue({
        id: 'token-1',
        expiresAt: new Date(Date.now() - 1000), // já expirou
      });
      prisma.refreshToken.delete.mockResolvedValue({});

      await expect(service.refresh('some-token')).rejects.toThrow(
        UnauthorizedException,
      );

      expect(prisma.refreshToken.delete).toHaveBeenCalledWith({
        where: { id: 'token-1' },
      });
    });

    it('should throw UnauthorizedException if jwt verification fails', async () => {
      prisma.refreshToken.findUnique.mockResolvedValue({
        id: 'token-1',
        expiresAt: new Date(Date.now() + 10000),
      });
      jwtService.verify.mockImplementation(() => {
        throw new Error('invalid signature');
      });

      await expect(service.refresh('some-token')).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should return a new access token when refresh token is valid', async () => {
      prisma.refreshToken.findUnique.mockResolvedValue({
        id: 'token-1',
        expiresAt: new Date(Date.now() + 10000),
      });
      jwtService.verify.mockReturnValue({
        sub: 'user-1',
        email: 'user@test.com',
        role: 'ADMIN',
      });
      jwtService.sign.mockReturnValue('new-access-token');

      prisma.user.findUnique.mockResolvedValue({
        id: 'user-1',
        deletedAt: null,
      });

      const result = await service.refresh('valid-token');

      expect(result).toEqual({ acess_token: 'new-access-token' });
      expect(jwtService.sign).toHaveBeenCalledWith(
        { sub: 'user-1', email: 'user@test.com', role: 'ADMIN' },
        { expiresIn: '15m' },
      );
    });

    it('should throw UnauthorizedException and delete the token if user is deactivated', async () => {
      prisma.refreshToken.findUnique.mockResolvedValue({
        id: 'token-1',
        expiresAt: new Date(Date.now() + 10000),
      });
      jwtService.verify.mockReturnValue({
        sub: 'user-1',
        email: 'user@test.com',
        role: 'ADMIN',
      });
      prisma.user.findUnique.mockResolvedValue({
        id: 'user-1',
        deletedAt: new Date(),
      });
      prisma.refreshToken.delete.mockResolvedValue({});

      await expect(service.refresh('valid-token')).rejects.toThrow(
        UnauthorizedException,
      );
      expect(prisma.refreshToken.delete).toHaveBeenCalledWith({
        where: { id: 'token-1' },
      });
    });
  });

  describe('forgotPassowrd', () => {
    it('should return a generic message and do nothing if user does not exist', async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      const result = await service.forgotPassowrd({
        email: 'nao-existe@test.com',
      });

      expect(result).toEqual({
        message: 'Se o e-mail existir, enviaremos instruções',
      });
      expect(prisma.user.update).not.toHaveBeenCalled();
      expect(mailService.sendForgotPasswordEmail).not.toHaveBeenCalled();
    });

    it('should generate a temporary password, update the user and send an email', async () => {
      const existingUser = { email: 'user@test.com' };
      prisma.user.findUnique.mockResolvedValue(existingUser);
      prisma.user.update.mockResolvedValue({
        email: 'user@test.com',
        name: 'User',
      });

      const result = await service.forgotPassowrd({ email: 'user@test.com' });

      expect(result).toEqual({
        message: 'Se o e-mail existir, enviaremos instruções',
      });
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { email: 'user@test.com' },
        data: {
          password: 'hashed-password',
          mustChangePassword: true,
        },
        select: expect.any(Object),
      });
      expect(mailService.sendForgotPasswordEmail).toHaveBeenCalledWith(
        'user@test.com',
        'User',
        expect.any(String), // temporaryPassword gerado com randomBytes
      );
    });
  });

  describe('resetPassword', () => {
    it('should throw BadRequestException if user does not exist', async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      await expect(
        service.resetPassword('user-1', { password: 'new-password' }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException if user does not need to reset the password', async () => {
      prisma.user.findUnique.mockResolvedValue({
        id: 'user-1',
        mustChangePassword: false,
      });

      await expect(
        service.resetPassword('user-1', { password: 'new-password' }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should hash the new password and clear mustChangePassword', async () => {
      prisma.user.findUnique.mockResolvedValue({
        id: 'user-1',
        email: 'user@test.com',
        mustChangePassword: true,
      });
      prisma.user.update.mockResolvedValue({});

      const result = await service.resetPassword('user-1', {
        password: 'new-password',
      });

      expect(result).toEqual({ message: 'Senha foi criada com sucesso' });
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { email: 'user@test.com' },
        data: {
          password: 'hashed-password',
          mustChangePassword: false,
        },
        select: expect.any(Object),
      });
    });
  });

  describe('logout', () => {
    it('should revoke the refresh token and log the logout', async () => {
      txMock.refreshToken.deleteMany.mockResolvedValue({});
      txMock.auditLog.create.mockResolvedValue({});

      const result = await service.logout('some-token', {
        sub: 'user-1',
      } as any);

      expect(result).toEqual({ message: 'logged out' });
      expect(txMock.refreshToken.deleteMany).toHaveBeenCalledWith({
        where: { token: expect.any(String) },
      });
      expect(txMock.auditLog.create).toHaveBeenCalledWith({
        data: {
          userId: 'user-1',
          action: 'LOGOUT',
          entity: 'AUTH',
          entityId: 'user-1',
          description: 'O usuário saiu do sistema',
        },
      });
    });
  });
});
