import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../product.service';
import { Repository } from 'typeorm';
import { ProductEntity } from '../entity/product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { productMock } from '../__mock__/product.mock';
import { createProductMock } from '../__mock__/create-product.mock';
import { CategoryService } from '../../category/category.service';
import { categoryMock } from '../../category/__mock__/category.mock';

describe('ProductService', () => {
  let service: ProductService;
  let productRepository: Repository<ProductEntity>;
  let categoryService: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(ProductEntity),
          useValue: {
            find: jest.fn().mockResolvedValue([productMock]),
            save: jest.fn().mockResolvedValue(productMock),
          },
        },
        {
          provide: CategoryService,
          useValue: {
            getCategoryById: jest.fn().mockResolvedValue(categoryMock),
          },
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    categoryService = module.get<CategoryService>(CategoryService);
    productRepository = module.get<Repository<ProductEntity>>(
      getRepositoryToken(ProductEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(categoryService).toBeDefined();
    expect(productRepository).toBeDefined();
  });

  it('should return all products', async () => {
    const products = await service.getAllProducts();

    expect(products).toEqual([productMock]);
  });

  it('should return error if products empty', async () => {
    jest.spyOn(productRepository, 'find').mockResolvedValue([]);

    expect(service.getAllProducts()).rejects.toThrowError();
  });

  it('should return error in exception', () => {
    jest.spyOn(productRepository, 'find').mockRejectedValue(new Error());

    expect(service.getAllProducts()).rejects.toThrowError();
  });

  it('should return product after insert in DB', async () => {
    const product = await service.createProduct(createProductMock);

    expect(product).toEqual(productMock);
  });

  it('should return error if category id not found', () => {
    jest
      .spyOn(categoryService, 'getCategoryById')
      .mockRejectedValue(new Error());

    expect(service.createProduct(createProductMock)).rejects.toThrowError();
  });
});
