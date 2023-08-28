import { ProductEntity } from '../entity/product.entity';
import { categoryMock } from '../../category/__mock__/category.mock';

export const productMock: ProductEntity = {
  id: 321,
  name: 'Product Mock',
  price: 10.01,
  image: 'http://image.com',
  categoryId: categoryMock.id,
  createdAt: new Date(),
  updatedAt: new Date(),
};
