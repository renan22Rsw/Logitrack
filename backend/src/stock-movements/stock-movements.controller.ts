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
import { FindAllStockMovementsResponse } from '@/types/stock-movements';

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
  getAllStockMovements(
    @Query('search') search?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('type') type?: MovementType,
    @Query('productId') productId?: string,
    @Query('userId') userId?: string,
  ): Promise<StockMovement[] | FindAllStockMovementsResponse> {
    return this.stackMovementsService.getAllStockMovements(
      search,
      page ? Number(page) : undefined,
      limit ? Number(limit) : undefined,
      type,
      productId,
      userId,
    );
  }
}
