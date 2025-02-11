import { IsInt, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OrderItemDto {
  @ApiProperty({ example: 1, description: 'Grocery id' })
  @IsInt()
  groceryId: number;

  @ApiProperty({ example: 1, description: 'Quantity' })
  @IsInt()
  @IsPositive()
  quantity: number;
}
