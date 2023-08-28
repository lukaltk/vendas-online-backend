import { Controller, Get } from '@nestjs/common';
import { Roles } from '../decorator/role.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { ReturnProduct } from './dto/return-product.dto';
import { ProductService } from './product.service';
import { ProductEntity } from './entity/product.entity';

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
}
