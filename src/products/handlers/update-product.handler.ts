import { CommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';
import { UnauthorizedException } from '@nestjs/common';
import { UpdateProductCommand } from '../commands/update-product.command';

@CommandHandler(UpdateProductCommand)
export class UpdateProductHandler {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async execute(command: UpdateProductCommand) {
    const { userId, productId, name, content, price } = command;

    try {
      return await this.productRepository
        .createQueryBuilder()
        .update(Product)
        .set({ name: name, content: content, price: price })
        .where('id = :productId', { productId })
        .andWhere('sellerId = :userId ', { userId })
        .execute();
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException('상품 수정 실패');
    }
  }
}
