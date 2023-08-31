import { QueryHandler } from '@nestjs/cqrs';
import { GetProductCommand } from '../commands/get-product.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';
import { UnauthorizedException } from '@nestjs/common';

@QueryHandler(GetProductCommand)
export class GetProductHandler {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async execute(command: GetProductCommand) {
    const { productId } = command;

    try {
      return await this.productRepository
        .createQueryBuilder()
        .select('products')
        .from(Product, 'products')
        .where('id = :productId', { productId })
        .getOne();
    } catch (e) {
      throw new UnauthorizedException('상품 조회 실패');
    }
  }
}
