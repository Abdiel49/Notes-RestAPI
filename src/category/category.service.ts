import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const wasCategory = await this.categoryRepository.findOne({
      where: { name: createCategoryDto.name },
    });

    if (wasCategory) {
      return wasCategory;
    }

    const categoryCreated = this.categoryRepository.create(createCategoryDto);

    return this.categoryRepository.save(categoryCreated);
  }

  async findAll() {
    const categories = await this.categoryRepository.find();

    if (!categories) {
      throw new NotFoundException('No categories found');
    }

    return categories;
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOne({ where: { id } });

    if (!category) {
      throw new NotFoundException(`No category found with id: ${id}`);
    }

    return category;
  }

  async findByName(name: string) {
    const category = await this.categoryRepository.findOne({ where: { name } });

    if (!category) {
      throw new NotFoundException(`No category found with name: ${name}`);
    }

    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOne({ where: { id } });

    if (!category) {
      throw new NotFoundException(`No category found with id: ${id}`);
    }

    Object.keys(updateCategoryDto).forEach((key) => {
      if (key in category && updateCategoryDto[key] !== undefined) {
        category[key] = updateCategoryDto[key];
      }
    });

    return this.categoryRepository.save(category);
  }

  async remove(id: number) {
    const category = await this.categoryRepository.findOne({ where: { id } });

    if (!category) {
      throw new NotFoundException(`No category found with id: ${id}`);
    }

    return this.categoryRepository.softDelete(id);
  }
}
