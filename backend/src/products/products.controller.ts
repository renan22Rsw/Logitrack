import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  Request,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import type { FastifyRequest } from 'fastify';
import { Product, Role } from '@prisma/client';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { RolesGuard } from '@/users/roles.guard';
import { Roles } from '@/users/roles.decorator';
import { ProductsPaginated } from '@/types/products';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  createProduct(
    @Body(new ValidationPipe()) createProductDto: CreateProductDto,
    @Request() req: FastifyRequest,
  ): Promise<Product> {
    return this.productsService.createProduct(
      createProductDto,
      req.user.sub,
      req.user.role as Role,
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAllProducts(
    @Query('search') search?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<Product[] | ProductsPaginated> {
    return this.productsService.findAllProducts(
      search,
      page ? Number(page) : undefined,
      limit ? Number(limit) : undefined,
    );
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findProductById(@Param('id') id: string): Promise<Product | null> {
    return this.productsService.findProductById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @Request() req: FastifyRequest,
  ): Promise<Product> {
    return this.productsService.updateProduct(
      id,
      updateProductDto,
      req.user.sub,
      req.user.role as Role,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  removeProduct(
    @Param('id') id: string,
    @Request() req: FastifyRequest,
  ): Promise<Product> {
    return this.productsService.removeProduct(
      id,
      req.user.sub,
      req.user.role as Role,
    );
  }
}
