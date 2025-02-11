import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Grocery } from '../entities/grocery.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { AddGroceryDto } from './dto/add-grocery.dto';
import { UpdateGroceryDto } from './dto/update-grocery.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Grocery)
    private groceryRepository: Repository<Grocery>,
  ) {}

  async addNewGrocery(addGroceryDto: AddGroceryDto): Promise<Grocery> {
    try {
      const grocery = this.groceryRepository.create(addGroceryDto);
      return await this.groceryRepository.save(grocery);
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.message.includes('duplicate key value violates unique constraint')
      ) {
        throw new ConflictException(
          'Grocery item with this name already exists',
        );
      }
      console.error(error);
      throw error;
    }
  }

  async getAllGroceryItems(): Promise<Grocery[]> {
    try {
      return await this.groceryRepository.find();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getGroceryItem(id: number): Promise<Grocery> {
    try {
      const grocery = await this.groceryRepository.findOne({ where: { id } });
      if (!grocery) {
        throw new NotFoundException(`Grocery item with ID ${id} not found`);
      }
      return grocery;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async removeGroceryItem(id: number): Promise<{ message: string }> {
    try {
      const grocery = await this.groceryRepository.findOne({ where: { id } });

      if (!grocery) {
        throw new NotFoundException(`Grocery item with ID ${id} not found`);
      }

      await this.groceryRepository.remove(grocery);
      return { message: `Grocery item with ID ${id} removed successfully` };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateGroceryItem(
    id: number,
    updateGroceryDto: UpdateGroceryDto,
  ): Promise<{ message: string }> {
    try {
      const grocery = await this.groceryRepository.findOne({ where: { id } });

      if (!grocery) {
        throw new NotFoundException(`Grocery item with ID ${id} not found`);
      }

      // Update only the fields that are provided in the DTO
      Object.assign(grocery, updateGroceryDto);

      await this.groceryRepository.save(grocery);
      return { message: `Grocery item with ID ${id} updated successfully` };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateInventory(
    id: number,
    updateInventoryDto: UpdateInventoryDto,
  ): Promise<{ message: string }> {
    try {
      const grocery = await this.groceryRepository.findOne({ where: { id } });

      if (!grocery) {
        throw new NotFoundException(`Grocery item with ID ${id} not found`);
      }

      grocery.quantity = updateInventoryDto.quantity;
      await this.groceryRepository.save(grocery);

      return { message: `Inventory updated for grocery item with ID ${id}` };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
