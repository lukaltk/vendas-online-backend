import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ReturnCategory } from './dto/return-category.dto';
import { CategoryService } from './category.service';
import { CategoryEntity } from './entity/category.entity';
import { Roles } from '../decorator/role.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { CreateCategory } from './dto/create-category.dto';

@Roles(UserType.ADMIN, UserType.USER)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAllCategories(): Promise<ReturnCategory[]> {
    return (await this.categoryService.getAllCategories()).map(
      (category: CategoryEntity) => new ReturnCategory(category),
    );
  }

  @Roles(UserType.ADMIN)
  @UsePipes(ValidationPipe)
  @Post()
  async createCategory(
    @Body() createCategory: CreateCategory,
  ): Promise<CategoryEntity> {
    return this.categoryService.createCategory(createCategory);
  }
}
