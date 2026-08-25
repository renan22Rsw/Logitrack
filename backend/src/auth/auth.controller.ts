import {
  Body,
  Controller,
  Post,
  Request,
  Response,
  UnauthorizedException,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

import type { FastifyRequest, FastifyReply } from 'fastify';
import { ForgotPasswordDto } from '@/mail/dto/forgot-password-dto';
import { ResetPasswordDto } from '@/mail/dto/reset-password-dto';

import { Throttle, ThrottlerGuard, seconds, minutes } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(ThrottlerGuard, LocalAuthGuard)
  @Throttle({ default: { limit: 6, ttl: seconds(60) } })
  @Post('sign-in')
  async login(
    @Request() req: FastifyRequest,
    @Response({ passthrough: true }) res: FastifyReply,
  ) {
    const { acess_token, refresh_token } = await this.authService.login(
      req.user,
    );

    const isProd = process.env.NODE_ENV === 'production';

    res
      .setCookie('access_token', acess_token, {
        httpOnly: true,
        secure: isProd,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 15,
      })
      .setCookie('refresh_token', refresh_token, {
        httpOnly: true,
        secure: isProd,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      });

    return { ok: true };
  }

  @Post('refresh')
  async refresh(
    @Request() req: FastifyRequest,
    @Response({ passthrough: true }) res: FastifyReply,
  ) {
    const refreshToken = req.cookies['refresh_token'];

    if (!refreshToken) {
      throw new UnauthorizedException('refresh token not found');
    }
    const { acess_token } = await this.authService.refresh(refreshToken);

    const isProd = process.env.NODE_ENV === 'production';

    res.setCookie('access_token', acess_token, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 15,
    });

    return { ok: true };
  }

  @UseGuards(ThrottlerGuard)
  @Throttle({ default: { limit: 6, ttl: minutes(15) } })
  @Post('forgot-password')
  async forgotPassword(@Body(new ValidationPipe()) user: ForgotPasswordDto) {
    return this.authService.forgotPassowrd(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('reset-password')
  async resetPassword(
    @Request() req: FastifyRequest,
    @Body(new ValidationPipe()) user: ResetPasswordDto,
  ) {
    return this.authService.resetPassword(req.user.sub, user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(
    @Request() req: FastifyRequest,
    @Response({ passthrough: true }) res: FastifyReply,
  ) {
    const refreshToken = req.cookies['refresh_token'];

    if (refreshToken) {
      await this.authService.logout(refreshToken, req.user);
    }

    res.clearCookie('access_token').clearCookie('refresh_token');

    return { message: 'logged out' };
  }
}
