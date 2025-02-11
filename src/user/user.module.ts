import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grocery } from '../entities/grocery.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Grocery])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
