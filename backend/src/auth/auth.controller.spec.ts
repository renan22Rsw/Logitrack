/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Test, TestingModule } from '@nestjs/testing';
import { ThrottlerModule } from '@nestjs/throttler';
import { UnauthorizedException } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import type { FastifyRequest, FastifyReply } from 'fastify';

describe('AuthController', () => {
  let controller: AuthController;
  let service: any;

  // res do Fastify precisa ser "chainable" (setCookie retorna this)
  const mockResponse = () => {
    const res: any = {};
    res.setCookie = jest.fn().mockReturnValue(res);
    res.clearCookie = jest.fn().mockReturnValue(res);
    return res as FastifyReply;
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      imports: [
        ThrottlerModule.forRoot([
          {
            ttl: 60000,
            limit: 10,
          },
        ]),
      ],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
            refresh: jest.fn(),
            forgotPassowrd: jest.fn(),
            resetPassword: jest.fn(),
            logout: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should call authService.login with req.user and set both cookies', async () => {
      const req = {
        user: { id: 'user-1', email: 'user@test.com', role: 'ADMIN' },
      } as unknown as FastifyRequest;
      const res = mockResponse();

      service.login.mockResolvedValue({
        acess_token: 'access-token',
        refresh_token: 'refresh-token',
      });

      const result = await controller.login(req, res);

      expect(result).toEqual({ ok: true });
      expect(service.login).toHaveBeenCalledWith(req.user);
      expect(res.setCookie).toHaveBeenCalledWith(
        'access_token',
        'access-token',
        expect.objectContaining({ httpOnly: true, maxAge: 60 * 15 }),
      );
      expect(res.setCookie).toHaveBeenCalledWith(
        'refresh_token',
        'refresh-token',
        expect.objectContaining({ httpOnly: true, maxAge: 60 * 60 * 24 * 7 }),
      );
    });
  });

  describe('refresh', () => {
    it('should throw UnauthorizedException if no refresh token cookie is present', async () => {
      const req = { cookies: {} } as unknown as FastifyRequest;
      const res = mockResponse();

      await expect(controller.refresh(req, res)).rejects.toThrow(
        UnauthorizedException,
      );

      expect(service.refresh).not.toHaveBeenCalled();
    });

    it('should call authService.refresh with the cookie token and set the new access cookie', async () => {
      const req = {
        cookies: { refresh_token: 'stored-refresh-token' },
      } as unknown as FastifyRequest;
      const res = mockResponse();

      service.refresh.mockResolvedValue({ acess_token: 'new-access-token' });

      const result = await controller.refresh(req, res);

      expect(result).toEqual({ ok: true });
      expect(service.refresh).toHaveBeenCalledWith('stored-refresh-token');
      expect(res.setCookie).toHaveBeenCalledWith(
        'access_token',
        'new-access-token',
        expect.objectContaining({ httpOnly: true, maxAge: 60 * 15 }),
      );
    });
  });

  describe('forgotPassword', () => {
    it('should call authService.forgotPassowrd with the dto', async () => {
      const dto = { email: 'user@test.com' };
      const response = {
        message: 'Se o e-mail existir, enviaremos instruções',
      };

      service.forgotPassowrd.mockResolvedValue(response);

      const result = await controller.forgotPassword(dto);

      expect(result).toEqual(response);
      expect(service.forgotPassowrd).toHaveBeenCalledWith(dto);
    });
  });

  describe('resetPassword', () => {
    it('should call authService.resetPassword with the id from req.user.sub and the dto', async () => {
      const req = { user: { sub: 'user-1' } } as unknown as FastifyRequest;
      const dto = { password: 'new-password' };
      const response = { message: 'Senha foi criada com sucesso' };

      service.resetPassword.mockResolvedValue(response);

      const result = await controller.resetPassword(req, dto);

      expect(result).toEqual(response);
      expect(service.resetPassword).toHaveBeenCalledWith('user-1', dto);
    });
  });

  describe('logout', () => {
    it('should call authService.logout with the refresh token and user, then clear cookies', async () => {
      const req = {
        cookies: { refresh_token: 'stored-refresh-token' },
        user: { sub: 'user-1' },
      } as unknown as FastifyRequest;
      const res = mockResponse();

      service.logout.mockResolvedValue({ message: 'logged out' });

      const result = await controller.logout(req, res);

      expect(result).toEqual({ message: 'logged out' });
      expect(service.logout).toHaveBeenCalledWith(
        'stored-refresh-token',
        req.user,
      );
      expect(res.clearCookie).toHaveBeenCalledWith('access_token');
      expect(res.clearCookie).toHaveBeenCalledWith('refresh_token');
    });

    it('should just clear cookies without calling authService.logout when there is no refresh token cookie', async () => {
      const req = {
        cookies: {},
        user: { sub: 'user-1' },
      } as unknown as FastifyRequest;
      const res = mockResponse();

      const result = await controller.logout(req, res);

      expect(result).toEqual({ message: 'logged out' });
      expect(service.logout).not.toHaveBeenCalled();
      expect(res.clearCookie).toHaveBeenCalledWith('access_token');
      expect(res.clearCookie).toHaveBeenCalledWith('refresh_token');
    });
  });
});
