import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService as PrismaService } from '../database/database.service';
import { CreateStockMovementDto } from './dto/create-stock-movements.dto';
import { MovementType, Role, StockMovement } from '@prisma/client';

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

  getAllStockMovements() {
    return this.prisma.stockMovement.findMany({
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
  }

  getMovementsByType(type: MovementType) {
    return this.prisma.stockMovement.findMany({
      where: {
        type,
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
  }

  getStockMovementByProductId(productId: string) {
    return this.prisma.stockMovement.findMany({
      where: {
        productId,
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
  }

  getStockMovementByUserId(userId: string) {
    return this.prisma.stockMovement.findMany({
      where: {
        userId,
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
  }
}
