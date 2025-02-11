import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class UpdateInventoryDto {
  @ApiProperty({
    example: 100,
    description: 'Updated quantity of the grocery item',
  })
  @IsInt()
  @Min(0, { message: 'Quantity cannot be negative' })
  quantity: number;
}
