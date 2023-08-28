import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from '../decorator/role.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { ReturnProduct } from './dto/return-product.dto';
import { ProductService } from './product.service';
import { ProductEntity } from './entity/product.entity';
import { CreateProductDTO } from './dto/create-product.dto';
import { DeleteResult } from 'typeorm';

@Roles(UserType.ADMIN, UserType.USER)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProducts(): Promise<ReturnProduct[]> {
    return (await this.productService.getAllProducts()).map(
      (product: ProductEntity) => new ReturnProduct(product),
    );
  }

  @Roles(UserType.ADMIN)
  @UsePipes(ValidationPipe)
  @Post()
  async createProduct(
    @Body() createProduct: CreateProductDTO,
  ): Promise<ProductEntity> {
    return this.productService.createProduct(createProduct);
  }

  @Roles(UserType.ADMIN)
  @UsePipes(ValidationPipe)
  @Delete('/:productId')
  async deleteProduct(
    @Param('productId') productId: number,
  ): Promise<DeleteResult> {
    return this.productService.deleteProduct(productId);
  }
}
