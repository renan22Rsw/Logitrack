/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from './admin.controller';
import { UsersService as AdminService } from './users.service';
import { Role } from '@prisma/client';

describe('AdminController', () => {
  let controller: AdminController;
  let service: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [
        {
          provide: AdminService,
          useValue: {
            getUsers: jest.fn(),
            createUserByAdmin: jest.fn(),
            updateUserByAdmin: jest.fn(),
            deleteUser: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AdminController>(AdminController);
    service = module.get<AdminService>(AdminService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getUsers', () => {
    it('should call service with search only when page/limit are not provided', async () => {
      service.getUsers.mockResolvedValue([]);

      await controller.getUsers('user1');

      expect(service.getUsers).toHaveBeenCalledWith(
        'user1',
        undefined,
        undefined,
      );
    });

    it('should convert page and limit from string to number', async () => {
      service.getUsers.mockResolvedValue({
        data: [],
        meta: { page: 2, limit: 10, total: 0, totalPages: 0 },
      });

      await controller.getUsers(undefined, '2', '10');

      expect(service.getUsers).toHaveBeenCalledWith(undefined, 2, 10);
    });

    it('should return whatever the service returns', async () => {
      const paginated = {
        data: [{ id: 'user-1' }],
        meta: { page: 1, limit: 10, total: 1, totalPages: 1 },
      };
      service.getUsers.mockResolvedValue(paginated);

      const result = await controller.getUsers(undefined, '1', '10');

      expect(result).toEqual(paginated);
    });
  });

  describe('createUsers', () => {
    it('should call service with the dto', async () => {
      const dto = {
        name: 'New User',
        email: 'new@test.com',
        role: Role.OPERATOR,
      };
      const createdUser = { id: 'user-1', ...dto };

      service.createUserByAdmin.mockResolvedValue(createdUser);

      const result = await controller.createUsers(dto);

      expect(result).toEqual(createdUser);
      expect(service.createUserByAdmin).toHaveBeenCalledWith(dto);
    });
  });

  describe('updateUser', () => {
    it('should call service with the dto and the id param', async () => {
      const dto = { name: 'Updated Name' };
      const updatedUser = { id: 'user-1', name: 'Updated Name' };

      service.updateUserByAdmin.mockResolvedValue(updatedUser);

      const result = await controller.updateUser(dto, 'user-1');

      expect(result).toEqual(updatedUser);
      expect(service.updateUserByAdmin).toHaveBeenCalledWith(dto, 'user-1');
    });
  });

  describe('deleteUser', () => {
    it('should call service with the id param', async () => {
      const deletedUser = { id: 'user-1', deletedAt: new Date() };

      service.deleteUser.mockResolvedValue(deletedUser);

      const result = await controller.deleteUser('user-1');

      expect(result).toEqual(deletedUser);
      expect(service.deleteUser).toHaveBeenCalledWith('user-1');
    });
  });
});
