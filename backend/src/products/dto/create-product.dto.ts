import { Transform } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  Min,
  IsInt,
  Matches,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Z0-9-]+$/, {
    message: 'SKU must have uppercase letters, numbers and hyphens',
  })
  sku: string;

  @IsOptional()
  @IsString()
  description?: string;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  price: number;

  @Transform(({ value }) =>
    value === '' || value == null ? undefined : Number(value),
  )
  @IsOptional()
  @IsInt()
  @Min(0)
  initialStock?: number;
}
