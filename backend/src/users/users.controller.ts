import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import type { FastifyRequest } from 'fastify';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getUniqueUser(
    @Request() req: FastifyRequest,
  ): Promise<Omit<User, 'password'> | null> {
    return this.usersService.getUniqueUser(req.user.sub);
  }

  @Post()
  async createUser(
    @Body(new ValidationPipe()) user: CreateUserDto,
  ): Promise<Omit<User, 'password'>> {
    return this.usersService.createUser(user);
  }

  @Patch('me')
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @Body(new ValidationPipe()) user: UpdateUserDto,
    @Request() req: FastifyRequest,
  ): Promise<Omit<User, 'password'>> {
    return this.usersService.updateUser(user, req.user.sub);
  }

  @Delete('me')
  @UseGuards(JwtAuthGuard)
  async deleteUser(
    @Request() req: FastifyRequest,
  ): Promise<Omit<User, 'password'>> {
    return this.usersService.deleteUser(req.user.sub);
  }
}
