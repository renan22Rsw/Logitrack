/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import type { FastifyRequest } from 'fastify';

describe('UsersController', () => {
  let controller: UsersController;
  let service: any;

  const mockRequest = (userId: string) =>
    ({
      user: { sub: userId },
    }) as unknown as FastifyRequest;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            getUniqueUser: jest.fn(),
            createUser: jest.fn(),
            updateUser: jest.fn(),
            deleteUser: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getUniqueUser', () => {
    it('should call service with the id from req.user.sub', async () => {
      const req = mockRequest('user-1');
      const user = { id: 'user-1', name: 'User 1' };

      service.getUniqueUser.mockResolvedValue(user);

      const result = await controller.getUniqueUser(req);

      expect(result).toEqual(user);
      expect(service.getUniqueUser).toHaveBeenCalledWith('user-1');
    });
  });

  describe('createUser', () => {
    it('should call service with the dto', async () => {
      const dto = {
        name: 'New User',
        email: 'new@test.com',
        password: 'plain-password',
        about: '',
      };
      const createdUser = { id: 'user-1', name: dto.name, email: dto.email };

      service.createUser.mockResolvedValue(createdUser);

      const result = await controller.createUser(dto);

      expect(result).toEqual(createdUser);
      expect(service.createUser).toHaveBeenCalledWith(dto);
    });
  });

  describe('updateUser', () => {
    it('should call service with the dto and the id from req.user.sub', async () => {
      const dto = { name: 'Updated Name' };
      const req = mockRequest('user-1');
      const updatedUser = { id: 'user-1', name: 'Updated Name' };

      service.updateUser.mockResolvedValue(updatedUser);

      const result = await controller.updateUser(dto, req);

      expect(result).toEqual(updatedUser);
      expect(service.updateUser).toHaveBeenCalledWith(dto, 'user-1');
    });
  });

  describe('deleteUser', () => {
    it('should call service with the id from req.user.sub', async () => {
      const req = mockRequest('user-1');
      const deletedUser = { id: 'user-1', deletedAt: new Date() };

      service.deleteUser.mockResolvedValue(deletedUser);

      const result = await controller.deleteUser(req);

      expect(result).toEqual(deletedUser);
      expect(service.deleteUser).toHaveBeenCalledWith('user-1');
    });
  });
});
