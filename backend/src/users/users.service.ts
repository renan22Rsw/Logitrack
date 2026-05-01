import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService as PrismaService } from '../database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';

import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers(search?: string): Promise<Omit<User, 'password'>[]> {
    if (search) {
      return this.prisma.user.findMany({
        where: {
          OR: [
            {
              name: {
                contains: search,
                mode: 'insensitive',
              },
            },
            {
              email: {
                contains: search,
                mode: 'insensitive',
              },
            },
          ],
        },

        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    }

    return this.prisma.user.findMany();
  }

  async createUser(data: CreateUserDto): Promise<Omit<User, 'password'>> {
    const { name, email, password } = data;

    const user = await this.prisma.user.findUnique({ where: { email } });

    if (user) throw new BadRequestException('User already exists');

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },

      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async updateUser(
    data: UpdateUserDto,
    id: string,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) throw new NotFoundException('User not found');

    const updateData = { ...data };

    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    return this.prisma.user.update({
      where: { id },
      data: {
        ...updateData,
      },

      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async deleteUser(id: string): Promise<Omit<User, 'password'>> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) throw new NotFoundException('User not found');

    return this.prisma.user.delete({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
