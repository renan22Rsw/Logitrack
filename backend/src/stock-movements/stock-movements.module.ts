import { Module } from '@nestjs/common';
import { StockMovementsController } from './stock-movements.controller';
import { StockMovementsService } from './stock-movements.service';
import { DatabaseService } from '../database/database.service';

@Module({
  controllers: [StockMovementsController],
  providers: [StockMovementsService, DatabaseService],
})
export class StockMovementsModule {}
