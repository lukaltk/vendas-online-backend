import { CreateProductDTO } from '../dto/create-product.dto';
import { categoryMock } from '../../category/__mock__/category.mock';

export const createProductMock: CreateProductDTO = {
  categoryId: categoryMock.id,
  name: 'Product Mock',
  price: 12.34,
  image: 'Image Mock',
};
