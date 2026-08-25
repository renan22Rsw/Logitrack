import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Request,
  Response,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import type { FastifyRequest, FastifyReply } from 'fastify';

import { AuthService } from '@/auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

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
    @Response({ passthrough: true }) res: FastifyReply,
  ): Promise<Omit<User, 'password'>> {
    const refreshToken = req.cookies['refresh_token'];

    const user = await this.usersService.deleteUser(req.user.sub, req.user.sub);

    if (refreshToken) {
      await this.authService.logout(refreshToken, req.user);
    }

    res.clearCookie('access_token').clearCookie('refresh_token');

    return user;
  }
}
