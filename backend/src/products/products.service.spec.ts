/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { DatabaseService } from '../database/database.service';

import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';

import { Role } from '@prisma/client';

describe('ProductService', () => {
  let service: ProductsService;
  let prisma: any;

  const txMock = {
    product: {
      create: jest.fn(),
      update: jest.fn(),
    },

    auditLog: {
      create: jest.fn(),
    },

    stockMovement: {
      create: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: DatabaseService,
          useValue: {
            product: {
              findUnique: jest.fn(),
              findFirst: jest.fn(),
              findMany: jest.fn(),
              count: jest.fn(),
            },
            $transaction: jest.fn((callback) => callback(txMock)),
          },
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    prisma = module.get<DatabaseService>(DatabaseService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createProduct', () => {
    const dto = {
      name: 'Product Test',
      sku: 'SKU-001',
      description: 'desc',
      price: 100,
      initialStock: 10,
    };

    it('should throw a ForbiddenException if user is a OPERATOR', async () => {
      await expect(
        service.createProduct(dto, 'user-1', Role.OPERATOR),
      ).rejects.toThrow(ForbiddenException);

      expect(prisma.product.findUnique).not.toHaveBeenCalled();
    });

    it('should throw a BadRequestException if product SKU already exists', async () => {
      prisma.product.findUnique.mockResolvedValue({ id: 'existing-id' });

      await expect(
        service.createProduct(dto, 'user-1', Role.ADMIN),
      ).rejects.toThrow(BadRequestException);
    });

    it('should create product with initial stock and create the logs', async () => {
      prisma.product.findUnique.mockResolvedValue(null);

      const createdProduct = { id: 'prod-1', name: dto.name, currentStock: 0 };
      txMock.product.create.mockResolvedValue(createdProduct);
      txMock.auditLog.create.mockResolvedValue({});
      txMock.stockMovement.create.mockResolvedValue({
        id: 'mov-1',
        productId: 'prod-1',
        quantity: 10,
      });
      txMock.product.update.mockResolvedValue({
        ...createdProduct,
        currentStock: 10,
      });

      const result = await service.createProduct(dto, 'user-1', Role.ADMIN);

      expect(result).toEqual(createdProduct);
      expect(txMock.product.create).toHaveBeenCalledTimes(1);
      expect(txMock.auditLog.create).toHaveBeenCalledTimes(2);
      expect(txMock.stockMovement.create).toHaveBeenCalledTimes(1);
      expect(txMock.product.update).toHaveBeenCalledWith({
        where: { id: 'prod-1' },
        data: { currentStock: 10 },
      });
    });

    it('should not create stock movements if initial stock is 0 or undefined', async () => {
      prisma.product.findUnique.mockResolvedValue(null);
      txMock.product.create.mockResolvedValue({ id: 'prod-2' });
      txMock.auditLog.create.mockResolvedValue({});

      await service.createProduct(
        { ...dto, initialStock: 0 },
        'user-1',
        Role.ADMIN,
      );

      expect(txMock.stockMovement.create).not.toHaveBeenCalled();
      expect(txMock.auditLog.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAllProducts', () => {
    const products = [
      { id: 'prod-1', name: 'Product 1', sku: 'PROD-1' },
      { id: 'prod-2', name: 'Product 2', sku: 'PROD-2' },
    ];

    it('should return all products without pagination when page/limit are not provided', async () => {
      prisma.product.findMany.mockResolvedValue(products);

      const result = await service.findAllProducts();

      expect(result).toEqual(products);
      expect(prisma.product.findMany).toHaveBeenCalledWith({
        where: { deletedAt: null },
        orderBy: { createdAt: 'desc' },
      });
      expect(prisma.product.count).not.toHaveBeenCalled();
    });

    it('should call findMany with the correct search filter', async () => {
      const filteredProducts = [products[0]];

      prisma.product.findMany.mockResolvedValue(filteredProducts);

      const result = await service.findAllProducts('PROD-1');

      expect(result).toEqual(filteredProducts);
      expect(prisma.product.findMany).toHaveBeenCalledWith({
        where: {
          deletedAt: null,
          OR: [
            { name: { contains: 'PROD-1', mode: 'insensitive' } },
            { sku: { contains: 'PROD-1', mode: 'insensitive' } },
          ],
        },
        orderBy: { createdAt: 'desc' },
      });
    });

    it('should return paginated products when page and limit are provided', async () => {
      prisma.product.findMany.mockResolvedValue(products);
      prisma.product.count.mockResolvedValue(20);

      const result = await service.findAllProducts(undefined, 2, 10);

      expect(result).toEqual({
        data: products,
        meta: {
          page: 2,
          limit: 10,
          total: 20,
          totalPages: 2,
        },
      });
    });

    it('should calculate skip correctly based on page and limit', async () => {
      prisma.product.findMany.mockResolvedValue(products);
      prisma.product.count.mockResolvedValue(20);

      await service.findAllProducts(undefined, 3, 10);

      expect(prisma.product.findMany).toHaveBeenCalledWith({
        where: { deletedAt: null },
        skip: 20,
        take: 10,
        orderBy: { createdAt: 'desc' },
      });
      expect(prisma.product.count).toHaveBeenCalledWith({
        where: { deletedAt: null },
      });
    });

    it('should round totalPages up when total is not evenly divisible by limit', async () => {
      prisma.product.findMany.mockResolvedValue(products);
      prisma.product.count.mockResolvedValue(21);

      const result = await service.findAllProducts(undefined, 1, 10);

      expect((result as any).meta.totalPages).toBe(3);
    });

    it('should combine search filter with pagination', async () => {
      prisma.product.findMany.mockResolvedValue([products[0]]);
      prisma.product.count.mockResolvedValue(1);

      await service.findAllProducts('PROD-1', 1, 10);

      const expectedWhere = {
        deletedAt: null,
        OR: [
          { name: { contains: 'PROD-1', mode: 'insensitive' } },
          { sku: { contains: 'PROD-1', mode: 'insensitive' } },
        ],
      };

      expect(prisma.product.findMany).toHaveBeenCalledWith({
        where: expectedWhere,
        skip: 0,
        take: 10,
        orderBy: { createdAt: 'desc' },
      });
      expect(prisma.product.count).toHaveBeenCalledWith({
        where: expectedWhere,
      });
    });
  });

  describe('findProductById', () => {
    const product = { id: 'prod-1', name: 'product-1', deletedAt: null };

    it('should return a product', async () => {
      prisma.product.findFirst.mockResolvedValue(product);

      const result = await service.findProductById('prod-1');

      expect(result).toEqual(product);
      expect(prisma.product.findFirst).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException if product was not found', async () => {
      prisma.product.findFirst.mockResolvedValue(null);

      await expect(service.findProductById('')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updateProduct', () => {
    const dto = {
      name: 'Product Updated',
      sku: 'SKU-UPDATED',
      description: 'desc',
      price: 100,
      initialStock: 10,
    };

    it('should throw a ForbiddenException if user is a OPERATOR', async () => {
      await expect(
        service.updateProduct('prod-1', dto, 'user-1', Role.OPERATOR),
      ).rejects.toThrow(ForbiddenException);

      expect(prisma.product.findUnique).not.toHaveBeenCalled();
    });

    it('should throw NotFoundException if product was not found', async () => {
      prisma.product.findUnique.mockResolvedValue(null);

      await expect(
        service.updateProduct('', dto, 'user-1', Role.ADMIN),
      ).rejects.toThrow(NotFoundException);

      expect(prisma.product.findUnique).toHaveBeenCalledTimes(1);
    });

    it('should throw BadRequestException if sku is already in use', async () => {
      prisma.product.findUnique
        .mockResolvedValueOnce({ id: 'prod-1', sku: 'OLD-SKU' }) // busca por id
        .mockResolvedValueOnce({ id: 'prod-2', sku: 'SKU-UPDATED' }); // busca por sku, pertence a outro produto

      await expect(
        service.updateProduct('prod-1', dto, 'user-1', Role.ADMIN),
      ).rejects.toThrow(BadRequestException);

      expect(prisma.product.findUnique).toHaveBeenCalledTimes(2);
    });

    it('should allow update when sku belongs to the same product', async () => {
      const existingProduct = {
        id: 'prod-1',
        sku: 'SAME-SKU',
        name: 'Product',
      };

      prisma.product.findUnique
        .mockResolvedValueOnce(existingProduct) // busca por id
        .mockResolvedValueOnce(existingProduct); // busca por sku -> acha ele mesmo

      txMock.product.update.mockResolvedValue(existingProduct);
      txMock.auditLog.create.mockResolvedValue({});

      await expect(
        service.updateProduct(
          'prod-1',
          { sku: 'SAME-SKU' },
          'user-1',
          Role.ADMIN,
        ),
      ).resolves.toEqual(existingProduct);
    });

    it('should update product data and create a log', async () => {
      const existingProduct = { id: 'prod-1', sku: 'OLD-SKU', name: 'Product' };

      prisma.product.findUnique
        .mockResolvedValueOnce(existingProduct) // 1ª chamada: busca por id
        .mockResolvedValueOnce(null); // 2ª chamada: busca por sku (ninguém mais usa)

      const updatedProduct = { id: 'prod-1', sku: 'NEW-SKU', name: 'Product' };
      txMock.product.update.mockResolvedValue(updatedProduct);
      txMock.auditLog.create.mockResolvedValue({});

      const result = await service.updateProduct(
        'prod-1',
        { sku: 'NEW-SKU' },
        'user-1',
        Role.ADMIN,
      );

      expect(result).toEqual(updatedProduct);
      expect(txMock.product.update).toHaveBeenCalledTimes(1);
      expect(txMock.auditLog.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('removeProduct', () => {
    it('should throw a ForbiddenException if user is a OPERATOR', async () => {
      await expect(
        service.removeProduct('prod-1', 'user-1', Role.OPERATOR),
      ).rejects.toThrow(ForbiddenException);

      expect(prisma.product.findFirst).not.toHaveBeenCalled();
    });

    it('should throw NotFoundException if product was not found', async () => {
      prisma.product.findFirst.mockResolvedValue(null);

      await expect(
        service.removeProduct('', 'user-1', Role.ADMIN),
      ).rejects.toThrow(NotFoundException);

      expect(prisma.product.findFirst).toHaveBeenCalledTimes(1);
    });

    it('should throw BadRequestException if product is deleted', async () => {
      prisma.product.findFirst.mockResolvedValue({
        id: 'prod-1',
        deletedAt: '2026-08-20',
      });

      await expect(
        service.removeProduct('prod-1', 'user-1', Role.ADMIN),
      ).rejects.toThrow(BadRequestException);
    });

    it('should update product deletedAt and create a log', async () => {
      prisma.product.findFirst.mockResolvedValue({
        id: 'prod-1',
        deletedAt: null,
      });
      txMock.product.update.mockResolvedValue({
        id: 'prod-1',
        deletedAt: '2026-08-20',
      });
      txMock.auditLog.create.mockResolvedValue({});

      await service.removeProduct('prod-1', 'user-1', Role.ADMIN);

      expect(txMock.product.update).toHaveBeenCalledTimes(1);
      expect(txMock.product.update).toHaveBeenCalledWith({
        where: { id: 'prod-1' },
        data: { deletedAt: expect.any(Date) },
      });
      expect(txMock.auditLog.create).toHaveBeenCalledTimes(1);
    });
  });
});
