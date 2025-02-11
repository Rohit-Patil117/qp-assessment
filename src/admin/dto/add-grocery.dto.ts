import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class AddGroceryDto {
  @ApiProperty({ example: 'Milk', description: 'Name of the grocery item' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  name: string;

  @ApiProperty({ example: 2.99, description: 'Price of the grocery item' })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ example: 10, description: 'Quantity of the grocery item' })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({
    example: 'Dairy',
    description: 'Category of the grocery item',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  category: string;

  @ApiProperty({
    example: 'Fresh organic milk',
    description: 'Description of the grocery item',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
