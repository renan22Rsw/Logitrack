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
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  // it will be an @UseRole decorator soon
  async getUsers(
    @Query('search') search?: string,
  ): Promise<Omit<User, 'password'>[]> {
    return this.usersService.getUsers(search);
  }

  @Post()
  async createUser(
    @Body(new ValidationPipe()) user: CreateUserDto,
  ): Promise<Omit<User, 'password'>> {
    return this.usersService.createUser(user);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  // it will be an @UseRole decorator soon
  async updateUser(
    @Body(new ValidationPipe()) user: UpdateUserDto,
    @Param('id') id: string,
  ): Promise<Omit<User, 'password'>> {
    return this.usersService.updateUser(user, id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  // it will be an @UseRole decorator soon
  async deleteUser(@Param('id') id: string): Promise<Omit<User, 'password'>> {
    return this.usersService.deleteUser(id);
  }
}
