import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DatabaseService as PrismaService } from '../database/database.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { MailService } from '../mail/mail.service';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  providers: [
    AuthService,
    PrismaService,
    MailService,
    LocalStrategy,
    JwtStrategy,
  ],
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '86400s' },
    }),

    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    }),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
