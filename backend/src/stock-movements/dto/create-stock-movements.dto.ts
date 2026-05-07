import { MovementType } from '@prisma/client';
import {
  IsUUID,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsInt,
  IsPositive,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateStockMovementDto {
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  productId: string;

  @Transform(({ value }) => Number(value))
  @IsPositive()
  @IsInt()
  quantity: number;

  @IsEnum(MovementType)
  type: MovementType;

  @IsOptional()
  @IsString()
  reason?: string;
}
