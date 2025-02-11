import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsInt,
  Min,
  MaxLength,
  IsNumber,
} from 'class-validator';

export class UpdateGroceryDto {
  @ApiProperty({
    example: 'Apple',
    description: 'Name of the grocery item',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(30)
  name?: string;

  @ApiProperty({
    example: 1.99,
    description: 'Price of the grocery item',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiProperty({
    example: 50,
    description: 'Available quantity',
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  quantity?: number;

  @ApiProperty({
    example: 'Fruits',
    description: 'Category of the grocery item',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  category?: string;

  @ApiProperty({
    example: 'Fresh apples',
    description: 'Description of the grocery item',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;
}
