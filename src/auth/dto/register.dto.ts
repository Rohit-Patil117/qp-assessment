import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

const passwordRegEx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'John Doe' })
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'john@example.com' })
  email: string;

  @IsNotEmpty()
  @Matches(passwordRegEx, {
    message: `Password must contain Minimum 8 and maximum 20 characters,
    at least one uppercase letter,
    one lowercase letter,
    one number and
    one special character`,
  })
  @ApiProperty({ example: 'Testing@123' })
  password: string;
}
