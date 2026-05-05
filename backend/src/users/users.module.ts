import { Module } from '@nestjs/common';
import { DatabaseService as PrismaService } from '../database/database.service';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AdminController } from './admin.controller';
@Module({
  providers: [UsersService, PrismaService],
  exports: [UsersService],
  controllers: [UsersController, AdminController],
})
export class UsersModule {}
