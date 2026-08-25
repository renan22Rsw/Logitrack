/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { DatabaseService } from '../database/database.service';
import { MailService } from '@/mail/mail.service';
import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { Role } from '@prisma/client';

jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hashed-password'),
}));

describe('UsersService', () => {
  let service: UsersService;
  let prisma: any;
  let mailService: any;

  const txMock = {
    user: {
      create: jest.fn(),
      update: jest.fn(),
    },
    auditLog: {
      create: jest.fn(),
    },

    refreshToken: {
      deleteMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: DatabaseService,
          useValue: {
            user: {
              findUnique: jest.fn(),
              findMany: jest.fn(),
              count: jest.fn(),
              update: jest.fn(),
            },
            auditLog: {
              create: jest.fn(),
            },
            $transaction: jest.fn((callback) => callback(txMock)),
          },
        },
        {
          provide: MailService,
          useValue: {
            sendUserCreatedByAdminEmail: jest.fn(),
            sendUserUpdatedByAdminEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<DatabaseService>(DatabaseService);
    mailService = module.get<MailService>(MailService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUsers', () => {
    const users = [
      { id: 'user-1', name: 'User 1', email: 'user1@test.com' },
      { id: 'user-2', name: 'User 2', email: 'user2@test.com' },
    ];

    it('should return all users without pagination when page/limit are not provided', async () => {
      prisma.user.findMany.mockResolvedValue(users);

      const result = await service.getUsers();

      expect(result).toEqual(users);
      expect(prisma.user.findMany).toHaveBeenCalledWith({
        where: {},
        orderBy: { createdAt: 'desc' },
      });
      expect(prisma.user.count).not.toHaveBeenCalled();
    });

    it('should call findMany with the correct search filter', async () => {
      prisma.user.findMany.mockResolvedValue([users[0]]);

      await service.getUsers('user1');

      expect(prisma.user.findMany).toHaveBeenCalledWith({
        where: {
          OR: [
            { name: { contains: 'user1', mode: 'insensitive' } },
            { email: { contains: 'user1', mode: 'insensitive' } },
          ],
        },
        orderBy: { createdAt: 'desc' },
      });
    });

    it('should return paginated users when page and limit are provided', async () => {
      prisma.user.findMany.mockResolvedValue(users);
      prisma.user.count.mockResolvedValue(20);

      const result = await service.getUsers(undefined, 2, 10);

      expect(result).toEqual({
        data: users,
        meta: { page: 2, limit: 10, total: 20, totalPages: 2 },
      });
      expect(prisma.user.findMany).toHaveBeenCalledWith({
        where: {},
        skip: 10, // (2 - 1) * 10
        take: 10,
        orderBy: { createdAt: 'desc' },
      });
      expect(prisma.user.count).toHaveBeenCalledWith({ where: {} });
    });

    it('should round totalPages up when total is not evenly divisible by limit', async () => {
      prisma.user.findMany.mockResolvedValue(users);
      prisma.user.count.mockResolvedValue(21);

      const result = await service.getUsers(undefined, 1, 10);

      expect((result as any).meta.totalPages).toBe(3); // Math.ceil(2.1)
    });
  });

  describe('getUniqueUser', () => {
    it('should return the user with the correct select fields', async () => {
      const user = { id: 'user-1', name: 'User 1' };
      prisma.user.findUnique.mockResolvedValue(user);

      const result = await service.getUniqueUser('user-1');

      expect(result).toEqual(user);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: 'user-1' },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          about: true,
          mustChangePassword: true,
          createdAt: true,
          updatedAt: true,
          deletedAt: true,
          isDemo: true,
          movements: true,
          auditLogs: true,
        },
      });
    });

    it('should return null when user is not found', async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      const result = await service.getUniqueUser('inexistente');

      expect(result).toBeNull();
    });
  });

  describe('createUser', () => {
    const dto = {
      name: 'New User',
      email: 'new@test.com',
      password: 'plain-password',
      about: '',
    };

    it('should throw BadRequestException if email already exists', async () => {
      prisma.user.findUnique.mockResolvedValue({ id: 'existing-id' });

      await expect(service.createUser(dto)).rejects.toThrow(
        BadRequestException,
      );

      expect(txMock.user.create).not.toHaveBeenCalled();
    });

    it('should create user with hashed password and create a log', async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      const createdUser = { id: 'user-1', name: dto.name, email: dto.email };
      txMock.user.create.mockResolvedValue(createdUser);
      txMock.auditLog.create.mockResolvedValue({});

      const result = await service.createUser(dto);

      expect(result).toEqual(createdUser);
      expect(txMock.user.create).toHaveBeenCalledWith({
        data: {
          name: dto.name,
          email: dto.email,
          password: 'hashed-password',
          mustChangePassword: false,
        },
        select: expect.any(Object),
      });
      expect(txMock.auditLog.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('createUserByAdmin', () => {
    const dto = {
      name: 'New User',
      email: 'new@test.com',
      role: Role.OPERATOR,
    };

    it('should throw BadRequestException if email already exists', async () => {
      prisma.user.findUnique.mockResolvedValue({ id: 'existing-id' });

      await expect(service.createUserByAdmin(dto)).rejects.toThrow(
        BadRequestException,
      );

      expect(txMock.user.create).not.toHaveBeenCalled();
    });

    it('should create user with a temporary password, log it and send an email', async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      const createdUser = {
        id: 'user-1',
        name: dto.name,
        email: dto.email,
        role: dto.role,
      };
      txMock.user.create.mockResolvedValue(createdUser);
      txMock.auditLog.create.mockResolvedValue({});

      const result = await service.createUserByAdmin(dto);

      expect(result).toEqual(createdUser);
      expect(txMock.user.create).toHaveBeenCalledWith({
        data: {
          name: dto.name,
          email: dto.email,
          role: dto.role,
          password: 'hashed-password',
          mustChangePassword: true,
        },
        select: expect.any(Object),
      });
      expect(mailService.sendUserCreatedByAdminEmail).toHaveBeenCalledWith(
        createdUser.email,
        createdUser.name,
        expect.any(String), // temporaryPassword gerado com randomBytes, não dá pra prever o valor
      );
    });
  });

  describe('updateUser', () => {
    const dto = { name: 'Updated Name' };

    it('should throw NotFoundException if user was not found', async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      await expect(service.updateUser(dto, 'inexistente')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should update user data and create a log', async () => {
      const existingUser = {
        id: 'user-1',
        name: 'Old Name',
        email: 'user1@test.com',
      };

      prisma.user.findUnique
        .mockResolvedValueOnce(existingUser) // busca por id
        .mockResolvedValueOnce(existingUser); // busca por email (o próprio)

      const updatedUser = { ...existingUser, name: 'Updated Name' };
      txMock.user.update.mockResolvedValue(updatedUser);
      txMock.auditLog.create.mockResolvedValue({});

      const result = await service.updateUser(dto, 'user-1');

      expect(result).toEqual(updatedUser);
      expect(txMock.user.update).toHaveBeenCalledWith({
        where: { id: 'user-1' },
        data: dto,
        select: expect.any(Object),
      });
    });

    it('should hash the password when it is provided in the update', async () => {
      const existingUser = {
        id: 'user-1',
        name: 'User',
        email: 'user1@test.com',
      };

      prisma.user.findUnique
        .mockResolvedValueOnce(existingUser)
        .mockResolvedValueOnce(existingUser);

      txMock.user.update.mockResolvedValue(existingUser);
      txMock.auditLog.create.mockResolvedValue({});

      await service.updateUser({ password: 'new-plain-password' }, 'user-1');

      expect(txMock.user.update).toHaveBeenCalledWith({
        where: { id: 'user-1' },
        data: { password: 'hashed-password' },
        select: expect.any(Object),
      });
    });

    // BUG: o service busca `existingEmail` usando `user.email` (o email atual
    // do próprio usuário), não `data.email` (o novo email enviado no update).
    // Por isso, `existingEmail.id` sempre é igual a `id`, e essa validação
    // nunca lança BadRequestException, mesmo com um novo email duplicado.
    // Este teste documenta o comportamento ATUAL do código, não o esperado.
    it('does not currently detect a duplicate email on update (known bug)', async () => {
      const existingUser = {
        id: 'user-1',
        name: 'User',
        email: 'user1@test.com',
      };

      prisma.user.findUnique
        .mockResolvedValueOnce(existingUser) // busca por id
        .mockResolvedValueOnce(existingUser); // busca por user.email -> acha ele mesmo sempre

      txMock.user.update.mockResolvedValue(existingUser);
      txMock.auditLog.create.mockResolvedValue({});

      await expect(
        service.updateUser({ email: 'ja-usado@test.com' }, 'user-1'),
      ).resolves.toEqual(existingUser); // não lança erro, mesmo tentando um email "duplicado"
    });

    it('should throw ForbiddenException if user is a demo/guest account', async () => {
      const demoUser = { id: 'user-1', email: 'guest@test.com', isDemo: true };

      prisma.user.findUnique.mockResolvedValueOnce(demoUser);

      await expect(
        service.updateUser({ name: 'Novo Nome' }, 'user-1'),
      ).rejects.toThrow(ForbiddenException);

      expect(txMock.user.update).not.toHaveBeenCalled();
    });
  });

  describe('updateUserByAdmin', () => {
    const dto = { name: 'Updated Name' };

    it('should throw NotFoundException if user was not found', async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      await expect(
        service.updateUserByAdmin(dto, 'inexistente'),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if the new email belongs to another user', async () => {
      prisma.user.findUnique
        .mockResolvedValueOnce({ id: 'user-1' }) // busca por id
        .mockResolvedValueOnce({ id: 'user-2' }); // busca por data.email -> pertence a outro

      await expect(
        service.updateUserByAdmin({ email: 'outro@test.com' }, 'user-1'),
      ).rejects.toThrow(BadRequestException);
    });

    it('should allow update when the new email belongs to the same user', async () => {
      const existingUser = { id: 'user-1', email: 'same@test.com' };

      prisma.user.findUnique
        .mockResolvedValueOnce(existingUser)
        .mockResolvedValueOnce(existingUser);

      txMock.user.update.mockResolvedValue(existingUser);
      txMock.auditLog.create.mockResolvedValue({});
      mailService.sendUserUpdatedByAdminEmail.mockResolvedValue(undefined);

      await expect(
        service.updateUserByAdmin({ email: 'same@test.com' }, 'user-1'),
      ).resolves.toEqual(existingUser);
    });

    it('should not query email uniqueness when email is not being updated', async () => {
      const existingUser = { id: 'user-1', email: 'user1@test.com' };
      prisma.user.findUnique.mockResolvedValueOnce(existingUser);

      txMock.user.update.mockResolvedValue(existingUser);
      txMock.auditLog.create.mockResolvedValue({});
      mailService.sendUserUpdatedByAdminEmail.mockResolvedValue(undefined);

      await service.updateUserByAdmin({ name: 'Novo Nome' }, 'user-1');

      expect(prisma.user.findUnique).toHaveBeenCalledTimes(1);
    });

    it('should update user, log it and send an email', async () => {
      const existingUser = { id: 'user-1', email: 'user1@test.com' };
      const updatedUser = { ...existingUser, name: 'Updated Name' };

      prisma.user.findUnique.mockResolvedValueOnce(existingUser);
      txMock.user.update.mockResolvedValue(updatedUser);
      txMock.auditLog.create.mockResolvedValue({});
      mailService.sendUserUpdatedByAdminEmail.mockResolvedValue(undefined);

      const result = await service.updateUserByAdmin(dto, 'user-1');

      expect(result).toEqual(updatedUser);
      expect(txMock.auditLog.create).toHaveBeenCalledTimes(1);
      expect(mailService.sendUserUpdatedByAdminEmail).toHaveBeenCalledWith(
        updatedUser.email,
        updatedUser.name,
      );
    });
  });

  describe('deleteUser', () => {
    it('should throw NotFoundException if user was not found', async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      await expect(
        service.deleteUser('inexistente', 'inexistente'),
      ).rejects.toThrow(NotFoundException);

      expect(txMock.auditLog.create).not.toHaveBeenCalled();
      expect(txMock.user.update).not.toHaveBeenCalled();
    });

    it('should create a log and soft-delete the user on self-delete', async () => {
      const user = { id: 'user-1', name: 'User 1' };
      const deletedUser = { ...user, deletedAt: new Date() };

      prisma.user.findUnique.mockResolvedValue(user);
      txMock.refreshToken.deleteMany.mockResolvedValue({});
      txMock.auditLog.create.mockResolvedValue({});
      txMock.user.update.mockResolvedValue(deletedUser);

      const result = await service.deleteUser('user-1', 'user-1');

      expect(result).toEqual(deletedUser);
      expect(txMock.refreshToken.deleteMany).toHaveBeenCalledWith({
        where: { userId: 'user-1' },
      });
      expect(txMock.auditLog.create).toHaveBeenCalledWith({
        data: {
          userId: 'user-1', // actorId
          action: 'DELETE',
          entity: 'USER',
          entityId: user.id,
          description: `Usuário ${user.name} deletou seu próprio perfil`,
        },
      });
      expect(txMock.user.update).toHaveBeenCalledWith({
        where: { id: 'user-1' },
        data: { deletedAt: expect.any(Date) },
      });
    });

    it('should create a log with admin description when actor differs from target', async () => {
      const user = { id: 'user-1', name: 'User 1' };
      const deletedUser = { ...user, deletedAt: new Date() };

      prisma.user.findUnique.mockResolvedValue(user);
      txMock.refreshToken.deleteMany.mockResolvedValue({});
      txMock.auditLog.create.mockResolvedValue({});
      txMock.user.update.mockResolvedValue(deletedUser);

      const result = await service.deleteUser('user-1', 'admin-1');

      expect(result).toEqual(deletedUser);
      expect(txMock.auditLog.create).toHaveBeenCalledWith({
        data: {
          userId: 'admin-1', // actorId, não o target
          action: 'DELETE',
          entity: 'USER',
          entityId: user.id,
          description: `Usuário ${user.name} foi deletado por um administrador`,
        },
      });
    });

    it('should throw ForbiddenException if user is a demo/guest account', async () => {
      const demoUser = { id: 'user-1', email: 'guest@test.com', isDemo: true };

      prisma.user.findUnique.mockResolvedValue(demoUser);

      await expect(service.deleteUser('user-1', 'user-1')).rejects.toThrow(
        ForbiddenException,
      );

      expect(txMock.auditLog.create).not.toHaveBeenCalled();
      expect(txMock.user.update).not.toHaveBeenCalled();
    });
  });
});
