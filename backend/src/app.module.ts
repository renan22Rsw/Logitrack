import { Module } from '@nestjs/common';

import { DatabaseService } from './database/database.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { StockMovementsModule } from './stock-movements/stock-movements.module';
import { AuditLogsModule } from './audit-logs/audit-logs.module';
import { MailModule } from './mail/mail.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ProductsModule,
    StockMovementsModule,
    AuditLogsModule,
    MailModule,
    HealthModule,
  ],
  providers: [DatabaseService],
})
export class AppModule {}
