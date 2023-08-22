import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from '../category.service';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../entity/category.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { categoryMock } from '../__mock__/category.mock';
import { createCategoryMock } from '../__mock__/create-category.mock';

describe('CategoryService', () => {
  let service: CategoryService;
  let categoryRepository: Repository<CategoryEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: getRepositoryToken(CategoryEntity),
          useValue: {
            find: jest.fn().mockResolvedValue([categoryMock]),
            findOne: jest.fn().mockResolvedValue(categoryMock),
            save: jest.fn().mockResolvedValue(categoryMock),
          },
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    categoryRepository = module.get<Repository<CategoryEntity>>(
      getRepositoryToken(CategoryEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(categoryRepository).toBeDefined();
  });

  it('should return list category', async () => {
    const categories = await service.getAllCategories();

    expect(categories).toEqual([categoryMock]);
  });

  it('should return error in list empty', () => {
    jest.spyOn(categoryRepository, 'find').mockResolvedValue([]);

    expect(service.getAllCategories()).rejects.toThrowError();
  });

  it('should return error in list exception', () => {
    jest.spyOn(categoryRepository, 'find').mockRejectedValue(new Error());

    expect(service.getAllCategories()).rejects.toThrowError();
  });

  it('should return error if exists category name', () => {
    expect(service.createCategory(createCategoryMock)).rejects.toThrowError();
  });

  it('should return category after save', async () => {
    jest.spyOn(categoryRepository, 'findOne').mockResolvedValue(undefined);

    const category = await service.createCategory(createCategoryMock);

    expect(category).toEqual(categoryMock);
  });

  it('should return error in exception', () => {
    jest.spyOn(categoryRepository, 'save').mockRejectedValue(new Error());

    expect(service.createCategory(createCategoryMock)).rejects.toThrowError();
  });

  it('should return category in get by name', async () => {
    const category = await service.getCategoryByName(createCategoryMock.name);

    expect(category).toEqual(categoryMock);
  });

  it('should return error if get by name is empty', () => {
    jest.spyOn(categoryRepository, 'findOne').mockResolvedValue(undefined);

    expect(
      service.getCategoryByName(createCategoryMock.name),
    ).rejects.toThrowError();
  });
});
