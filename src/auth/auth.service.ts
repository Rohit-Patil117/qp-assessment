import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { Admin } from '../entities/admin.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    private jwtService: JwtService,
  ) {}

  async userRegister(registerDto: RegisterDto): Promise<User> {
    try {
      const user: User = new User();
      user.name = registerDto.name;
      user.email = registerDto.email;
      user.password = await bcrypt.hash(registerDto.password, 10);
      return await this.userRepository.save(user);
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.message.includes('duplicate key value violates unique constraint')
      ) {
        throw new ConflictException('User with this email already exists');
      }
      console.error(error);
      throw error;
    }
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      if (user && (await bcrypt.compare(password, user.password))) {
        return user;
      }
      return null;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async adminRegister(registerDto: RegisterDto): Promise<Admin> {
    try {
      const admin: Admin = new Admin();
      admin.name = registerDto.name;
      admin.email = registerDto.email;
      admin.password = await bcrypt.hash(registerDto.password, 10);
      return await this.adminRepository.save(admin);
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.message.includes('duplicate key value violates unique constraint')
      ) {
        throw new ConflictException('Admin with this email already exists');
      }
      console.error(error);
      throw error;
    }
  }

  async validateAdmin(email: string, password: string): Promise<Admin | null> {
    try {
      const admin = await this.adminRepository.findOne({ where: { email } });
      if (admin && (await bcrypt.compare(password, admin.password))) {
        return admin;
      }
      return null;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async login(user: User | Admin) {
    try {
      const payload = { email: user.email, sub: user.id, role: user.role };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
