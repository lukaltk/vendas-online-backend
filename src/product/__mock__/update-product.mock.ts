import { categoryMock } from '../../category/__mock__/category.mock';
import { UpdateProductDTO } from '../dto/update-product.dto';

export const updateProductMock: UpdateProductDTO = {
  categoryId: categoryMock.id,
  name: 'Mock Product',
  price: 43.21,
  image: 'Mock Image',
};
