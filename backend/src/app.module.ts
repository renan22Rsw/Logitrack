import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseService } from './database/database.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AdminController } from './users/admin.controller';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [AppController, AdminController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
