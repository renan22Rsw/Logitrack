import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DatabaseService as PrismaService } from '../database/database.service';

import bcrypt from 'bcrypt';
import { User } from '@/types/user';
import { JwtPayload } from '@/types/jwt-payload';

import { AuditAction, AuditEntity } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const validPassword = await bcrypt.compare(pass, user.password);

    if (!validPassword) throw new UnauthorizedException('Invalid credentials');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }

  async login(data: User) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Usuário não existe');
    }

    if (user.deletedAt) {
      throw new UnauthorizedException('Conta do usuário está inativa');
    }

    const payload = {
      sub: data.id,
      email: data.email,
      role: data.role,
    };

    const acess_token = this.jwtService.sign(payload, {
      expiresIn: '15m',
    });

    const refresh_token = this.jwtService.sign(payload, {
      expiresIn: '7d',
    });

    await this.prisma.$transaction(async (tx) => {
      await tx.refreshToken.create({
        data: {
          userId: data.id,
          token: refresh_token,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
      });

      await tx.auditLog.create({
        data: {
          userId: data.id,
          action: AuditAction.LOGIN,
          entity: AuditEntity.AUTH,
          entityId: data.id,
          description: 'O usuário entrou no sistema',
        },
      });
    });

    return {
      acess_token: acess_token,
      refresh_token: refresh_token,
    };
  }

  async refresh(token: string) {
    const storedToken = await this.prisma.refreshToken.findUnique({
      where: { token: token },
    });

    if (!storedToken) throw new UnauthorizedException('Invalid refresh token');

    if (storedToken.expiresAt < new Date()) {
      throw new UnauthorizedException('Refresh token expired');
    }

    const payload: JwtPayload = this.jwtService.verify(token);

    const newAcessToken = this.jwtService.sign(
      {
        sub: payload.sub,
        email: payload.email,
        role: payload.role,
      },
      {
        expiresIn: '15m',
      },
    );

    return { acess_token: newAcessToken };
  }

  async logout(token: string, user: JwtPayload) {
    await this.prisma.$transaction(async (tx) => {
      await tx.refreshToken.deleteMany({
        where: { token: token },
      });

      await tx.auditLog.create({
        data: {
          userId: user.sub,
          action: AuditAction.LOGOUT,
          entity: AuditEntity.AUTH,
          entityId: user.sub,
          description: 'O usuário saiu do sistema',
        },
      });
    });

    return { message: 'logged out' };
  }
}
