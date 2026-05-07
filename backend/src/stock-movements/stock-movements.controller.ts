import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { StockMovementsService } from './stock-movements.service';
import { CreateStockMovementDto } from './dto/create-stock-movements.dto';
import type { FastifyRequest } from 'fastify';
import { Role, StockMovement, MovementType } from '@prisma/client';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { RolesGuard } from '@/users/roles.guard';
import { Roles } from '@/users/roles.decorator';

@Controller('stock-movements')
export class StockMovementsController {
  constructor(private readonly stackMovementsService: StockMovementsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  createStockMovement(
    @Body(new ValidationPipe()) stockMovement: CreateStockMovementDto,
    @Request() req: FastifyRequest,
  ): Promise<StockMovement> {
    return this.stackMovementsService.createStockMovement(
      stockMovement,
      req.user.sub,
      req.user.role as Role,
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getAllStockMovements() {
    return this.stackMovementsService.getAllStockMovements();
  }

  @Get('type')
  @UseGuards(JwtAuthGuard)
  getMovementsByType(@Query('type') type: MovementType) {
    return this.stackMovementsService.getMovementsByType(type);
  }

  @Get('product')
  @UseGuards(JwtAuthGuard)
  getStockMovementByProductId(@Query('productId') productId: string) {
    return this.stackMovementsService.getStockMovementByProductId(productId);
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  getStockMovementByUserId(@Query('userId') userId: string) {
    return this.stackMovementsService.getStockMovementByUserId(userId);
  }
}
