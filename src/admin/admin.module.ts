import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grocery } from '../entities/grocery.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Grocery])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
