import { JwtService } from '@nestjs/jwt';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { DatabaseService as PrismaService } from '../database/database.service';

import bcrypt from 'bcrypt';
import { createHash, randomBytes } from 'crypto';
import { User } from '@/types/user';
import { JwtPayload } from '@/types/jwt-payload';

import { AuditAction, AuditEntity } from '@prisma/client';
import { MailService } from '@/mail/mail.service';
import { ResetPasswordDto } from '@/mail/dto/reset-password-dto';
import { ForgotPasswordDto } from '@/mail/dto/forgot-password-dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly mailService: MailService,
  ) {}

  private hashToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }

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

    const hashedRefreshToken = this.hashToken(refresh_token);

    await this.prisma.$transaction(async (tx) => {
      await tx.refreshToken.create({
        data: {
          userId: data.id,
          token: hashedRefreshToken,
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
    const hashedToken = this.hashToken(token);

    const storedToken = await this.prisma.refreshToken.findUnique({
      where: { token: hashedToken },
    });

    if (!storedToken) throw new UnauthorizedException('Invalid refresh token');

    if (storedToken.expiresAt < new Date()) {
      await this.prisma.refreshToken.delete({ where: { id: storedToken.id } });
      throw new UnauthorizedException('Refresh token expired');
    }

    let payload: JwtPayload;

    try {
      payload = this.jwtService.verify(token);
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }

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

  async forgotPassowrd(dto: ForgotPasswordDto) {
    const { email } = dto;

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      const temporaryPassword = randomBytes(12).toString('hex');
      const hashedPassword = await bcrypt.hash(temporaryPassword, 10);

      const user = await this.prisma.user.update({
        where: {
          email: existingUser.email,
        },
        data: {
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
        },
      });

      await this.mailService.sendForgotPasswordEmail(
        user.email,
        user.name as string,
        temporaryPassword,
      );
    }

    return { message: 'Se o e-mail existir, enviaremos instruções' };
  }

  async resetPassword(userId: string, dto: ResetPasswordDto) {
    const { password } = dto;

    const existingUser = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      throw new BadRequestException('O usuário não existe');
    }

    if (!existingUser.mustChangePassword) {
      throw new BadRequestException('user does not need to reset the password');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.prisma.user.update({
      where: { email: existingUser.email },
      data: {
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
      },
    });

    return { message: 'Senha foi criada com sucesso' };
  }

  async logout(token: string, user: JwtPayload) {
    const hashedToken = this.hashToken(token);

    await this.prisma.$transaction(async (tx) => {
      await tx.refreshToken.deleteMany({
        where: { token: hashedToken },
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
