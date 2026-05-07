import { PartialType } from '@nestjs/mapped-types';
import { CreateStockMovementDto } from './create-stock-movements.dto';

export class UpdateStockMovementsDto extends PartialType(
  CreateStockMovementDto,
) {}
