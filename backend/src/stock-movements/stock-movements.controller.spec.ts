/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { Test, TestingModule } from '@nestjs/testing';
import { StockMovementsController } from './stock-movements.controller';
import { StockMovementsService } from './stock-movements.service';
import { MovementType, Role } from '@prisma/client';
import type { FastifyRequest } from 'fastify';
describe('StockMovementsController', () => {
  let controller: StockMovementsController;
  let service: any;

  const mockRequest = (userId: string, role: Role) =>
    ({
      user: { sub: userId, role },
    }) as unknown as FastifyRequest;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockMovementsController],
      providers: [
        {
          provide: StockMovementsService,
          useValue: {
            createStockMovement: jest.fn(),
            getAllStockMovements: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<StockMovementsController>(StockMovementsController);
    service = module.get<StockMovementsService>(StockMovementsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createStockMovement', () => {
    it('should call stockMovementService.createStockMovement with dto and user data from request', async () => {
      const dto = {
        quantity: 10,
        type: MovementType.IN,
      };

      const req = mockRequest('user-1', Role.ADMIN);
      const createdStockMovement = { productId: 'prod-1', ...dto };

      service.createStockMovement.mockResolvedValue(createdStockMovement);

      const result = await controller.createStockMovement(
        createdStockMovement,
        req,
      );

      expect(result).toEqual(createdStockMovement);
      expect(service.createStockMovement).toHaveBeenCalledWith(
        createdStockMovement,
        'user-1',
        Role.ADMIN,
      );
    });
  });

  describe('getAllStockMovements', () => {
    it('should call service with search only when page/limit are not provided', async () => {
      service.getAllStockMovements.mockResolvedValue([]);

      await controller.getAllStockMovements('product-1');

      expect(service.getAllStockMovements).toHaveBeenCalledWith(
        'product-1',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      );
    });

    it('should convert page and limit from string to number', async () => {
      service.getAllStockMovements.mockResolvedValue({
        data: [],
        meta: { page: 2, limit: 10, total: 0, totalPages: 0 },
      });

      await controller.getAllStockMovements(undefined, '2', '10');

      expect(service.getAllStockMovements).toHaveBeenCalledWith(
        undefined,
        2,
        10,
        undefined,
        undefined,
        undefined,
      );
    });

    it('should return whatever the service returns', async () => {
      const paginated = {
        data: [{ id: 'prod-1' }],
        meta: { page: 1, limit: 10, total: 1, totalPages: 1 },
      };
      service.getAllStockMovements.mockResolvedValue(paginated);

      const result = await controller.getAllStockMovements(
        undefined,
        '1',
        '10',
        'IN',
        undefined,
        undefined,
      );

      expect(result).toEqual(paginated);
    });
  });
});
