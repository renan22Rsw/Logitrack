import {
  Body,
  Controller,
  Post,
  Request,
  Response,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

import type { FastifyRequest, FastifyReply } from 'fastify';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@Response({ passthrough: true }) res: FastifyReply) {
    res.clearCookie('access_token').clearCookie('refresh_token');
  }
}
