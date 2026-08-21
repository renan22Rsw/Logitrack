/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Role } from '@prisma/client';
import type { FastifyRequest } from 'fastify';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: any;

  const mockRequest = (userId: string, role: Role) =>
    ({
      user: { sub: userId, role },
    }) as unknown as FastifyRequest;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: {
            createProduct: jest.fn(),
            findAllProducts: jest.fn(),
            findProductById: jest.fn(),
            updateProduct: jest.fn(),
            removeProduct: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createProduct', () => {
    it('should call productsService.createProduct with dto and user data from request', async () => {
      const dto = {
        name: 'Product Test',
        sku: 'SKU-001',
        description: 'desc',
        price: 100,
      };
      const req = mockRequest('user-1', Role.ADMIN);
      const createdProduct = { id: 'prod-1', ...dto };

      service.createProduct.mockResolvedValue(createdProduct);

      const result = await controller.createProduct(dto, req);

      expect(result).toEqual(createdProduct);
      expect(service.createProduct).toHaveBeenCalledWith(
        dto,
        'user-1',
        Role.ADMIN,
      );
    });

    describe('findAllProducts', () => {
      it('should call service with search only when page/limit are not provided', async () => {
        service.findAllProducts.mockResolvedValue([]);

        await controller.findAllProducts('PROD-1');

        expect(service.findAllProducts).toHaveBeenCalledWith(
          'PROD-1',
          undefined,
          undefined,
        );
      });

      it('should convert page and limit from string to number', async () => {
        service.findAllProducts.mockResolvedValue({
          data: [],
          meta: { page: 2, limit: 10, total: 0, totalPages: 0 },
        });

        await controller.findAllProducts(undefined, '2', '10');

        expect(service.findAllProducts).toHaveBeenCalledWith(undefined, 2, 10);
      });

      it('should return whatever the service returns', async () => {
        const paginated = {
          data: [{ id: 'prod-1' }],
          meta: { page: 1, limit: 10, total: 1, totalPages: 1 },
        };
        service.findAllProducts.mockResolvedValue(paginated);

        const result = await controller.findAllProducts(undefined, '1', '10');

        expect(result).toEqual(paginated);
      });
    });

    describe('findProductById', () => {
      it('should call service with the id param', async () => {
        const product = { id: 'prod-1', name: 'Product' };
        service.findProductById.mockResolvedValue(product);

        const result = await controller.findProductById('prod-1');

        expect(result).toEqual(product);
        expect(service.findProductById).toHaveBeenCalledWith('prod-1');
      });
    });

    describe('updateProduct', () => {
      it('should call service with id, dto, and user data from request', async () => {
        const dto = { name: 'Updated' };
        const req = mockRequest('user-1', Role.MANAGER);
        const updatedProduct = { id: 'prod-1', name: 'Updated' };

        service.updateProduct.mockResolvedValue(updatedProduct);

        const result = await controller.updateProduct('prod-1', dto, req);

        expect(result).toEqual(updatedProduct);
        expect(service.updateProduct).toHaveBeenCalledWith(
          'prod-1',
          dto,
          'user-1',
          Role.MANAGER,
        );
      });
    });

    describe('removeProduct', () => {
      it('should call service with id and user data from request', async () => {
        const req = mockRequest('user-1', Role.ADMIN);
        const removedProduct = { id: 'prod-1', deletedAt: new Date() };

        service.removeProduct.mockResolvedValue(removedProduct);

        const result = await controller.removeProduct('prod-1', req);

        expect(result).toEqual(removedProduct);
        expect(service.removeProduct).toHaveBeenCalledWith(
          'prod-1',
          'user-1',
          Role.ADMIN,
        );
      });
    });
  });
});
