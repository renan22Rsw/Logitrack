import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService as PrismaService } from '../database/database.service';
import { CreateStockMovementDto } from './dto/create-stock-movements.dto';
import { MovementType, Role, StockMovement } from '@prisma/client';
import { StockMovementsPaginated } from '@/types/stock-movements';

@Injectable()
export class StockMovementsService {
  constructor(private readonly prisma: PrismaService) {}

  async createStockMovement(
    stockMovement: CreateStockMovementDto,
    userId: string,
    userRole: Role,
  ): Promise<StockMovement> {
    if (userRole === Role.OPERATOR) {
      throw new ForbiddenException('Operator cannot stock movements');
    }

    const product = await this.prisma.product.findFirst({
      where: { id: stockMovement.productId, deletedAt: null },
    });

    if (!product) throw new NotFoundException('Product not found');

    if (
      stockMovement.type === MovementType.OUT &&
      product.currentStock < stockMovement.quantity
    ) {
      throw new BadRequestException('Not enough stock');
    }

    return this.prisma.$transaction(async (tx) => {
      const movement = await tx.stockMovement.create({
        data: {
          productId: stockMovement.productId,
          userId,
          quantity: stockMovement.quantity,
          type: stockMovement.type,
          reason: stockMovement.reason,
        },
      });

      await tx.product.update({
        where: { id: stockMovement.productId },
        data: {
          currentStock:
            stockMovement.type === MovementType.IN
              ? {
                  increment: stockMovement.quantity,
                }
              : {
                  decrement: stockMovement.quantity,
                },
        },
      });

      return movement;
    });
  }

  async getAllStockMovements(
    search?: string,
    page?: number,
    limit?: number,
    type?: MovementType,
    productId?: string,
    userId?: string,
  ): Promise<StockMovement[] | StockMovementsPaginated> {
    const where = {
      ...(productId && { productId }),
      ...(userId && { userId }),
      ...(type && { type }),

      product: {
        deletedAt: null,
        ...(search && {
          OR: [
            { name: { contains: search, mode: 'insensitive' as const } },
            { sku: { contains: search, mode: 'insensitive' as const } },
          ],
        }),
      },
    };

    const include = {
      product: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
    };

    if (!page || !limit) {
      return this.prisma.stockMovement.findMany({
        where,
        include,
        orderBy: { createdAt: 'desc' },
      });
    }

    const skip = (page - 1) * limit;

    const [stockMovements, total] = await Promise.all([
      this.prisma.stockMovement.findMany({
        where,
        include,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),

      this.prisma.stockMovement.count({ where }),
    ]);

    return {
      data: stockMovements,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
