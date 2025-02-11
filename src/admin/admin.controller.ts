import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { AddGroceryDto } from './dto/add-grocery.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateGroceryDto } from './dto/update-grocery.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { RoleGuard } from '../auth/role.guard';
import { Roles } from '../auth/roles.decorator';
import { successResponse } from '../utils/common-response';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({
    summary: 'Add new grocery item',
    description: 'This will add a new grocery item for admin',
  })
  @Post('addNewGrocery')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('admin')
  async addNewGrocery(@Body() addGroceryDto: AddGroceryDto) {
    const newGrocery = await this.adminService.addNewGrocery(addGroceryDto);
    return successResponse(newGrocery);
  }

  @ApiOperation({
    summary: 'Get all grocery items',
    description: 'This will get all grocery items for admin',
  })
  @Get('getAllGroceryItems')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('admin')
  async getAllGroceryItems() {
    const groceryItems = await this.adminService.getAllGroceryItems();
    return successResponse(groceryItems);
  }

  @ApiOperation({
    summary: 'Get single grocery item',
    description: 'This will get a single grocery item for admin',
  })
  @Get('getGroceryItem/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('admin')
  async getGroceryItem(@Param('id') id: number) {
    const groceryItem = await this.adminService.getGroceryItem(id);
    return successResponse(groceryItem);
  }

  @ApiOperation({
    summary: 'Remove grocery item',
    description: 'This will remove grocery item for admin',
  })
  @Delete('removeGroceryItem/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('admin')
  async removeGroceryItem(@Param('id') id: number) {
    const groceryItem = await this.adminService.removeGroceryItem(id);
    return successResponse(groceryItem);
  }

  @ApiOperation({
    summary: 'Update grocery item',
    description: 'This will update grocery item for admin',
  })
  @Put('updateGroceryItem/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('admin')
  async updateGroceryItem(
    @Param('id') id: number,
    @Body() updateGroceryDto: UpdateGroceryDto,
  ) {
    const groceryItem = await this.adminService.updateGroceryItem(
      id,
      updateGroceryDto,
    );
    return successResponse(groceryItem);
  }

  @ApiOperation({
    summary: 'Update inventory',
    description: 'This will update inventory for grocery item for admin',
  })
  @Patch('updateInventory/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('admin')
  async updateInventory(
    @Param('id') id: number,
    @Body() updateInventoryDto: UpdateInventoryDto,
  ) {
    const groceryItem = await this.adminService.updateInventory(
      id,
      updateInventoryDto,
    );
    return successResponse(groceryItem);
  }
}
