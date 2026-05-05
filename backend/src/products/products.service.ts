import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DatabaseService as PrismaService } from '../database/database.service';
import { Role, MovementType, Prisma, Product } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async createProduct(
    createProductDto: CreateProductDto,
    userId: string,
    userRole: Role,
  ): Promise<Product> {
    if (userRole === Role.OPERATOR) {
      throw new ForbiddenException('Operator cannot create a product');
    }

    const existingProduct = await this.prisma.product.findUnique({
      where: { sku: createProductDto.sku },
    });

    if (existingProduct) {
      throw new BadRequestException('SKU already exists');
    }

    return this.prisma.$transaction(async (tx) => {
      const product = await tx.product.create({
        data: {
          name: createProductDto.name,
          sku: createProductDto.sku,
          description: createProductDto.description,
          price: new Prisma.Decimal(createProductDto.price),
          currentStock: 0,
        },
      });

      if (createProductDto.initialStock && createProductDto.initialStock > 0) {
        await tx.stockMovement.create({
          data: {
            productId: product.id,
            userId,
            quantity: createProductDto.initialStock,
            type: MovementType.IN,
            reason: 'Initial stock',
          },
        });

        await tx.product.update({
          where: { id: product.id },
          data: {
            currentStock: createProductDto.initialStock,
          },
        });
      }

      return product;
    });
  }

  async findAllProducts(search?: string): Promise<Product[]> {
    return this.prisma.product.findMany({
      where: {
        deletedAt: null,

        ...(search && {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { sku: { contains: search, mode: 'insensitive' } },
          ],
        }),
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findProductById(id: string): Promise<Product | null> {
    const product = await this.prisma.product.findFirst({
      where: { id, deletedAt: null },
    });

    if (!product) throw new NotFoundException('Product not found');

    return product;
  }

  async updateProduct(
    id: string,
    updateProductDto: UpdateProductDto,
    userRole: Role,
  ): Promise<Product> {
    if (userRole === Role.OPERATOR) {
      throw new ForbiddenException('Operator cannot update a product');
    }

    const product = await this.prisma.product.findUnique({ where: { id } });

    if (!product) throw new NotFoundException('Product not found');

    if (updateProductDto.sku) {
      const existingProduct = await this.prisma.product.findUnique({
        where: { sku: updateProductDto.sku },
      });

      if (existingProduct) {
        throw new BadRequestException('SKU already in use');
      }
    }

    return this.prisma.product.update({
      where: { id },
      data: {
        ...(updateProductDto.name && { name: updateProductDto.name }),
        ...(updateProductDto.sku && { sku: updateProductDto.sku }),
        ...(updateProductDto.description && {
          description: updateProductDto.description,
        }),
        ...(updateProductDto.price && {
          price: new Prisma.Decimal(updateProductDto.price),
        }),
      },
    });
  }

  async removeProduct(id: string, userRole: Role): Promise<Product> {
    if (userRole === Role.OPERATOR) {
      throw new ForbiddenException('Operator cannot delete a product');
    }

    const product = await this.prisma.product.findFirst({ where: { id } });

    if (!product) throw new NotFoundException('Product not found');

    if (product.deletedAt) {
      throw new BadRequestException('Product already deleted');
    }

    return this.prisma.product.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
