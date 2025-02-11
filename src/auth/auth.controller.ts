import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ApiOperation } from '@nestjs/swagger';
import { successResponse } from 'src/utils/common-response';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: 'Admin register',
    description: 'This will register a new admin account',
  })
  @Post('adminRegister')
  async adminRegister(@Body() registerDto: RegisterDto) {
    const admin = await this.authService.adminRegister(registerDto);
    return successResponse(admin);
  }

  @ApiOperation({
    summary: 'Admin login',
    description: 'This will login to the admin account',
  })
  @Post('adminLogin')
  async adminLogin(@Body() loginDto: LoginDto) {
    const admin = await this.authService.validateAdmin(
      loginDto.email,
      loginDto.password,
    );
    if (!admin) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const loginData = await this.authService.login(admin);
    return successResponse(loginData);
  }

  @ApiOperation({
    summary: 'User register',
    description: 'This will register a new user account',
  })
  @Post('userRegister')
  async userRegister(@Body() registerDto: RegisterDto) {
    const user = await this.authService.userRegister(registerDto);
    return successResponse(user);
  }

  @ApiOperation({
    summary: 'User login',
    description: 'This will login to the user account',
  })
  @Post('userLogin')
  async userLogin(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const loginData = await this.authService.login(user);
    return successResponse(loginData);
  }
}
