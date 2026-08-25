import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { DatabaseService as PrismaService } from '../database/database.service';
import { CreateUserDto, CreateUserByAdminDto } from './dto/create-user.dto';
import { UpdateUserByAdminDto, UpdateUserDto } from './dto/update-user.dto';
import { User, AuditAction, AuditEntity } from '@prisma/client';

import bcrypt from 'bcrypt';
import { PaginatedUsers } from '@/types/user';
import { randomBytes } from 'crypto';
import { MailService } from '@/mail/mail.service';
@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailSerive: MailService,
  ) {}

  async getUsers(
    search?: string,
    page?: number,
    limit?: number,
  ): Promise<Omit<User, 'password'>[] | PaginatedUsers> {
    const where = {
      ...(search && {
        OR: [
          {
            name: {
              contains: search,
              mode: 'insensitive' as const,
            },
          },

          {
            email: {
              contains: search,
              mode: 'insensitive' as const,
            },
          },
        ],
      }),
    };

    if (!page || !limit) {
      return this.prisma.user.findMany({
        where,
        orderBy: {
          createdAt: 'desc',
        },
      });
    }

    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),

      this.prisma.user.count({
        where,
      }),
    ]);

    return {
      data: users,

      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getUniqueUser(id: string): Promise<Omit<User, 'password'> | null> {
    return this.prisma.user.findUnique({
      where: { id },

      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        about: true,
        mustChangePassword: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
        isDemo: true,
        movements: true,
        auditLogs: true,
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
          mustChangePassword: false,
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          about: true,
          mustChangePassword: true,
          createdAt: true,
          updatedAt: true,
          deletedAt: true,
          isDemo: true,
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

  async createUserByAdmin(
    data: CreateUserByAdminDto,
  ): Promise<Omit<User, 'password'>> {
    const { name, email, role } = data;

    const user = await this.prisma.user.findUnique({ where: { email } });

    if (user) throw new BadRequestException('User already exists');

    return await this.prisma.$transaction(async (tx) => {
      const temporaryPassword = randomBytes(12).toString('hex');
      const hashedPassword = await bcrypt.hash(temporaryPassword, 10);

      const newUser = await tx.user.create({
        data: {
          name,
          email,
          role,
          password: hashedPassword,
          mustChangePassword: true,
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          about: true,
          mustChangePassword: true,
          createdAt: true,
          updatedAt: true,
          deletedAt: true,
          isDemo: true,
        },
      });
      await tx.auditLog.create({
        data: {
          userId: newUser.id,
          action: AuditAction.CREATE,
          entity: AuditEntity.USER,
          entityId: newUser.id,
          description: `Administrador criou o usuário ${newUser.name}`,
        },
      });

      await this.mailSerive.sendUserCreatedByAdminEmail(
        newUser.email,
        newUser.name as string,
        temporaryPassword,
      );

      return newUser;
    });
  }

  async updateUser(
    data: UpdateUserDto,
    id: string,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) throw new NotFoundException('User not found');

    if (user.isDemo) {
      throw new ForbiddenException('Demo account cannot be updated');
    }

    const existingEmail = await this.prisma.user.findUnique({
      where: {
        email: data.email,
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
          about: true,
          mustChangePassword: true,
          createdAt: true,
          updatedAt: true,
          deletedAt: true,
          isDemo: true,
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

  async updateUserByAdmin(
    data: UpdateUserByAdminDto,
    id: string,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (data.email) {
      const existingEmail = await this.prisma.user.findUnique({
        where: {
          email: data.email,
        },
      });

      if (existingEmail && existingEmail.id !== id) {
        throw new BadRequestException('Email já em uso');
      }
    }

    return this.prisma.$transaction(async (tx) => {
      const updatedUser = await tx.user.update({
        where: { id },
        data: {
          ...data,
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          about: true,
          mustChangePassword: true,
          createdAt: true,
          updatedAt: true,
          deletedAt: true,
          isDemo: true,
        },
      });

      await tx.auditLog.create({
        data: {
          userId: updatedUser.id,
          action: AuditAction.UPDATE,
          entity: AuditEntity.USER,
          entityId: updatedUser.id,
          description: `Administrador atualizou o usuário ${updatedUser.name}`,
        },
      });

      await this.mailSerive.sendUserUpdatedByAdminEmail(
        updatedUser.email,
        updatedUser.name as string,
      );

      return updatedUser;
    });
  }

  async deleteUser(
    id: string,
    actorId: string,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) throw new NotFoundException('User not found');

    if (user.isDemo) {
      throw new ForbiddenException('Demo account cannot be deleted');
    }

    const isSelfDelete = actorId === id;

    return this.prisma.$transaction(async (tx) => {
      await tx.refreshToken.deleteMany({ where: { userId: id } });

      await tx.auditLog.create({
        data: {
          userId: actorId,
          action: AuditAction.DELETE,
          entity: AuditEntity.USER,
          entityId: user.id,
          description: isSelfDelete
            ? `Usuário ${user.name} deletou seu próprio perfil`
            : `Usuário ${user.name} foi deletado por um administrador`,
        },
      });

      return tx.user.update({
        where: { id },
        data: { deletedAt: new Date() },
      });
    });
  }
}
