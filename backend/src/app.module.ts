import { Module } from '@nestjs/common';

import { DatabaseService } from './database/database.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { StockMovementsModule } from './stock-movements/stock-movements.module';
import { AuditLogsService } from './audit-logs/audit-logs.service';
import { AuditLogsController } from './audit-logs/audit-logs.controller';
import { AuditLogsModule } from './audit-logs/audit-logs.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ProductsModule,
    StockMovementsModule,
    AuditLogsModule,
  ],
  providers: [DatabaseService, AuditLogsService],
  controllers: [AuditLogsController],
})
export class AppModule {}
