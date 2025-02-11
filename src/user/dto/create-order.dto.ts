import { ArrayNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderItemDto } from './order-item.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    type: () => [OrderItemDto],
    description: 'List of order items',
    example: [
      { groceryId: 1, quantity: 2 },
      { groceryId: 3, quantity: 1 },
    ],
  })
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}
