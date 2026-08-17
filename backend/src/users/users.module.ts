import { Module } from '@nestjs/common';
import { DatabaseService as PrismaService } from '../database/database.service';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AdminController } from './admin.controller';
import { MailService } from '../mail/mail.service';
@Module({
  providers: [UsersService, PrismaService, MailService],
  exports: [UsersService],
  controllers: [UsersController, AdminController],
})
export class UsersModule {}
