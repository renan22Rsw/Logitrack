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
import { CreateUserByAdminDto } from '@/users/dto/create-user.dto';
import { UpdateUserByAdminDto } from '@/users/dto/update-user.dto';

import { Role } from '@prisma/client';
import { PaginatedUser } from '@/types/user';

@Controller('admin/users')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getUsers(
    @Query('search') search?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<Omit<User, 'password'>[] | PaginatedUser> {
    return this.adminService.getUsers(
      search,
      page ? Number(page) : undefined,
      limit ? Number(limit) : undefined,
    );
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async createUsers(
    @Body(new ValidationPipe()) data: CreateUserByAdminDto,
  ): Promise<Omit<User, 'password'>> {
    return this.adminService.createUserByAdmin(data);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async updateUser(
    @Body(new ValidationPipe()) data: UpdateUserByAdminDto,
    @Param('id') id: string,
  ): Promise<Omit<User, 'password'>> {
    return this.adminService.updateUserByAdmin(data, id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async deleteUser(@Param('id') id: string): Promise<Omit<User, 'password'>> {
    return this.adminService.deleteUser(id);
  }
}
