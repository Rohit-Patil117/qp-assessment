import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { User } from './entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { Admin } from './entities/admin.entity';
import { Grocery } from './entities/grocery.entity';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      password: process.env.DB_PASSWORD,
      username: process.env.DB_USERNAME,
      entities: [User, Admin, Grocery, Order, OrderItem],
      database: process.env.DB_NAME,
      synchronize: true,
      logging: true,
    }),
    AuthModule,
    AdminModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
