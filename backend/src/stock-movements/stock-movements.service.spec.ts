/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { Test, TestingModule } from '@nestjs/testing';
import { StockMovementsService } from './stock-movements.service';
import { DatabaseService } from '../database/database.service';
import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { MovementType, Role } from '@prisma/client';

describe('StockMovementsService', () => {
  let service: StockMovementsService;
  let prisma: any;

  const txMock = {
    product: {
      update: jest.fn(),
    },

    stockMovement: {
      create: jest.fn(),
      update: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StockMovementsService,
        {
          provide: DatabaseService,
          useValue: {
            product: {
              findFirst: jest.fn(),
            },

            stockMovement: {
              findMany: jest.fn(),
              count: jest.fn(),
            },

            $transaction: jest.fn((callback) => callback(txMock)),
          },
        },
      ],
    }).compile();

    service = module.get<StockMovementsService>(StockMovementsService);
    prisma = module.get<DatabaseService>(DatabaseService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createStockMovement', () => {
    const dto = {
      productId: '1',
      quantity: 10,
      type: MovementType.IN,
    };

    it('should throw a ForbiddenException if user is a OPERATOR', async () => {
      await expect(
        service.createStockMovement(dto, 'user-1', Role.OPERATOR),
      ).rejects.toThrow(ForbiddenException);

      expect(prisma.product.findFirst).not.toHaveBeenCalled();
    });

    it('should throw a NotFoundException if product was not found ', async () => {
      prisma.product.findFirst.mockResolvedValue(null);

      await expect(
        service.createStockMovement(
          { ...dto, productId: '' },
          'user-1',
          Role.ADMIN,
        ),
      ).rejects.toThrow(NotFoundException);
    });
    it('should throw a BadRequestException if it has not enough stock', async () => {
      const existingProduct = { id: '1', currentStock: 5 };
      const outDto = { productId: '1', quantity: 10, type: MovementType.OUT };

      prisma.product.findFirst.mockResolvedValue(existingProduct);

      await expect(
        service.createStockMovement(outDto, 'user-1', Role.ADMIN),
      ).rejects.toThrow(BadRequestException);

      expect(txMock.stockMovement.create).not.toHaveBeenCalled();
      expect(txMock.product.update).not.toHaveBeenCalled();
    });

    it('should create a log and update stock movement quantity', async () => {
      prisma.product.findFirst.mockResolvedValue(dto);
      txMock.stockMovement.create.mockResolvedValue(dto);
      txMock.product.update.mockResolvedValue({ quantity: 20 });

      const result = await service.createStockMovement(
        dto,
        'user-1',
        Role.ADMIN,
      );

      expect(result).toEqual(dto);
      expect(txMock.stockMovement.create).toHaveBeenCalledTimes(1);
      expect(txMock.product.update).toHaveBeenCalledTimes(1);

      expect(txMock.product.update).toHaveBeenCalledWith({
        where: { id: dto.productId },

        data: {
          currentStock:
            dto.type === MovementType.IN
              ? {
                  increment: dto.quantity,
                }
              : {
                  decrement: dto.quantity,
                },
        },
      });
    });
  });

  describe('getAllStockMovements', () => {
    const stock_movements = [
      { productId: '1', quantity: 10, type: MovementType.IN },
      { productId: '2', quantity: 10, type: MovementType.IN },
    ];

    it('should return all stockMovement without pagination when page/limit are not provided', async () => {
      prisma.stockMovement.findMany.mockResolvedValue(stock_movements);

      const result = await service.getAllStockMovements();

      expect(result).toEqual(stock_movements);
      expect(prisma.stockMovement.findMany).toHaveBeenCalledWith({
        where: { product: { deletedAt: null } },
        orderBy: { createdAt: 'desc' },
        include: {
          product: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
            },
          },
        },
      });
    });

    it('should call findMany with the correct search filter', async () => {
      const search_stockMovements = {
        name: 'product-1',
        sku: 'PROD-1',
        deletedAt: null,
      };

      prisma.stockMovement.findMany.mockResolvedValue(search_stockMovements);

      const result = await service.getAllStockMovements('product-1');

      expect(result).toEqual(search_stockMovements);
      expect(prisma.stockMovement.findMany).toHaveBeenCalledWith({
        where: {
          product: {
            deletedAt: null,
            OR: [
              { name: { contains: 'product-1', mode: 'insensitive' } },
              { sku: { contains: 'product-1', mode: 'insensitive' } },
            ],
          },
        },
        include: {
          product: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
            },
          },
        },

        orderBy: { createdAt: 'desc' },
      });
    });

    it('should return paginated stockMovements when page and limit are provided', async () => {
      prisma.stockMovement.findMany.mockResolvedValue(stock_movements);
      prisma.stockMovement.count.mockResolvedValue(20);

      const result = await service.getAllStockMovements(undefined, 2, 10);

      expect(result).toEqual({
        data: stock_movements,
        meta: {
          page: 2,
          limit: 10,
          total: 20,
          totalPages: 2,
        },
      });
    });

    it('should calculate skip correctly based on page and limit', async () => {
      prisma.stockMovement.findMany.mockResolvedValue(stock_movements);
      prisma.stockMovement.count.mockResolvedValue(20);

      await service.getAllStockMovements(undefined, 3, 10);

      expect(prisma.stockMovement.findMany).toHaveBeenCalledWith({
        where: {
          product: {
            deletedAt: null,
          },
        },

        include: {
          product: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
            },
          },
        },

        skip: 20,
        take: 10,
        orderBy: { createdAt: 'desc' },
      });

      expect(prisma.stockMovement.count).toHaveBeenCalledWith({
        where: {
          product: { deletedAt: null },
        },
      });
    });

    it('should round totalPages up when total is not evenly divisible by limit', async () => {
      prisma.stockMovement.findMany.mockResolvedValue(stock_movements);
      prisma.stockMovement.count.mockResolvedValue(21);

      const result = await service.getAllStockMovements(undefined, 1, 10);

      expect((result as any).meta.totalPages).toBe(3);
    });

    it('should combine search filter with pagination', async () => {
      const search_stockMovements = {
        name: 'product-1',
        sku: 'PROD-1',
        deletedAt: null,
      };

      prisma.stockMovement.findMany.mockResolvedValue(search_stockMovements);
      prisma.stockMovement.count.mockResolvedValue(20);

      await service.getAllStockMovements('product-1', 1, 10);

      expect(prisma.stockMovement.findMany).toHaveBeenCalledWith({
        where: {
          product: {
            deletedAt: null,
            OR: [
              { name: { contains: 'product-1', mode: 'insensitive' } },
              { sku: { contains: 'product-1', mode: 'insensitive' } },
            ],
          },
        },
        include: {
          product: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
            },
          },
        },
        skip: 0,
        take: 10,
        orderBy: { createdAt: 'desc' },
      });

      expect(prisma.stockMovement.count).toHaveBeenCalledWith({
        where: {
          product: {
            deletedAt: null,
            OR: [
              { name: { contains: 'product-1', mode: 'insensitive' } },
              { sku: { contains: 'product-1', mode: 'insensitive' } },
            ],
          },
        },
      });
    });
  });
});
