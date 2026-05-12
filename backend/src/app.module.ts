import { Module } from '@nestjs/common';

import { DatabaseService } from './database/database.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { StockMovementsModule } from './stock-movements/stock-movements.module';

@Module({
  imports: [AuthModule, UsersModule, ProductsModule, StockMovementsModule],
  providers: [DatabaseService],
})
export class AppModule {}
