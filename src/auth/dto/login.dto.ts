import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'john@example.com' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Testing@123' })
  password: string;
}
