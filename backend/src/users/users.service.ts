import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService as PrismaService } from '../database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, AuditAction, AuditEntity } from '@prisma/client';

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
          deletedAt: true,
        },
      });
    }

    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
    });
  }

  async getUniqueUser(id: string): Promise<Omit<User, 'password'> | null> {
    return this.prisma.user.findUnique({
      where: { id },

      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
    });
  }

  async createUser(data: CreateUserDto): Promise<Omit<User, 'password'>> {
    const { name, email, password } = data;

    const user = await this.prisma.user.findUnique({ where: { email } });

    if (user) throw new BadRequestException('User already exists');

    const hashedPassword = await bcrypt.hash(password, 10);

    return await this.prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
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
          deletedAt: true,
        },
      });

      await tx.auditLog.create({
        data: {
          userId: newUser.id,
          action: AuditAction.CREATE,
          entity: AuditEntity.USER,
          entityId: newUser.id,
          description: `Usuário ${newUser.name} foi criado`,
        },
      });

      return newUser;
    });
  }

  async updateUser(
    data: UpdateUserDto,
    id: string,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) throw new NotFoundException('User not found');

    const existingEmail = await this.prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (existingEmail && existingEmail.id !== id) {
      throw new BadRequestException('Email já em uso');
    }
    const updateData = { ...data };

    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    return this.prisma.$transaction(async (tx) => {
      const updatedUser = await tx.user.update({
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
          deletedAt: true,
        },
      });

      await tx.auditLog.create({
        data: {
          userId: updatedUser.id,
          action: AuditAction.UPDATE,
          entity: AuditEntity.USER,
          entityId: updatedUser.id,
          description: 'Usuário atualizou seu perfil',
        },
      });

      return updatedUser;
    });
  }

  async deleteUser(id: string): Promise<Omit<User, 'password'>> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) throw new NotFoundException('User not found');

    await this.prisma.auditLog.create({
      data: {
        userId: user.id,
        action: AuditAction.DELETE,
        entity: AuditEntity.USER,
        entityId: user.id,
        description: `Usuário ${user.name} deletou seu perfil`,
      },
    });

    return this.prisma.user.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
