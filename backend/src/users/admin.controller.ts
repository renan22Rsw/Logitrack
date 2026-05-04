import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService as AdminService } from './users.service';
import { User } from '@prisma/client';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { RolesGuard } from '@/users/roles.guard';
import { Roles } from '@/users/roles.decorator';
import { CreateUserDto } from '@/users/dto/create-user.dto';
import { UpdateUserDto } from '@/users/dto/update-user.dto';

import { Role } from '@prisma/client';

@Controller('admin/users')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async getUsers(
    @Query('search') search?: string,
  ): Promise<Omit<User, 'password'>[]> {
    return this.adminService.getUsers(search);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async createUsers(
    @Body(new ValidationPipe()) data: CreateUserDto,
  ): Promise<Omit<User, 'password'>> {
    return this.adminService.createUser(data);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async updateUser(
    @Body(new ValidationPipe()) data: UpdateUserDto,
    @Param('id') id: string,
  ): Promise<Omit<User, 'password'>> {
    return this.adminService.updateUser(data, id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async deleteUser(@Param('id') id: string): Promise<Omit<User, 'password'>> {
    return this.adminService.deleteUser(id);
  }
}
