import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DatabaseService as PrismaService } from '../database/database.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';

@Module({
  providers: [AuthService, PrismaService, LocalStrategy, JwtStrategy],
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '86400s' },
    }),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
