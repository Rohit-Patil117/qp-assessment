import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';
import { Grocery } from '../entities/grocery.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Grocery)
    private readonly groceryRepository: Repository<Grocery>,
    private dataSource: DataSource,
  ) {}

  async getAllGroceryItems(): Promise<Grocery[]> {
    try {
      return await this.groceryRepository.find();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async bookGroceryItems(
    createOrderDto: CreateOrderDto,
    userId: string,
  ): Promise<Order> {
    const { items } = createOrderDto;

    // Start a transaction
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Validate user
      const user = await queryRunner.manager.findOne(User, {
        where: { id: userId },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      let totalPrice = 0;
      const orderItems: OrderItem[] = [];

      for (const item of items) {
        const grocery = await queryRunner.manager.findOne(Grocery, {
          where: { id: item.groceryId },
        });

        if (!grocery) {
          throw new NotFoundException(
            `Grocery item with ID ${item.groceryId} not found`,
          );
        }

        if (grocery.quantity < item.quantity) {
          throw new BadRequestException(
            `Insufficient stock for ${grocery.name}`,
          );
        }

        // Deduct stock
        grocery.quantity -= item.quantity;
        await queryRunner.manager.save(Grocery, grocery);

        const subtotalPrice = grocery.price * item.quantity;
        totalPrice += subtotalPrice;

        // Create OrderItem instance
        const orderItem = new OrderItem();
        orderItem.grocery = grocery;
        orderItem.quantity = item.quantity;
        orderItem.subtotalPrice = subtotalPrice;

        orderItems.push(orderItem);
      }

      // Create Order instance
      const order = new Order();
      order.user = user;
      order.totalPrice = totalPrice;
      order.orderItems = orderItems;

      // Save Order
      const savedOrder = await queryRunner.manager.save(Order, order);

      // Commit transaction
      await queryRunner.commitTransaction();

      return plainToInstance(Order, savedOrder);
    } catch (error) {
      // Rollback transaction if an error occurs
      await queryRunner.rollbackTransaction();
      console.error('Transaction failed:', error);
      throw error;
    } finally {
      // Release the query runner
      await queryRunner.release();
    }
  }
}
