import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RoleGuard } from '../auth/role.guard';
import { successResponse } from '../utils/common-response';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Get all grocery items',
    description: 'This will get all grocery items for user',
  })
  @Get('getAllGroceryItems')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('user')
  async getAllGroceryItems() {
    const groceryItems = await this.userService.getAllGroceryItems();
    return successResponse(groceryItems);
  }

  @ApiOperation({
    summary: 'Book multiple grocery items',
    description: 'This will book multiple grocery items for user',
  })
  @Post('bookGroceryItems')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('user')
  async bookGroceryItems(
    @Request() req,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    const userId = req.user.userId;
    const groceryItems = await this.userService.bookGroceryItems(
      createOrderDto,
      userId,
    );
    return successResponse(groceryItems);
  }
}
