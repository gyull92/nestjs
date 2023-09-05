import { CommandHandler } from '@nestjs/cqrs';
import { PostProductCommand } from '../commands/post-product.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';
import { UnauthorizedException } from '@nestjs/common';

@CommandHandler(PostProductCommand)
export class PostProductHandler {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async execute(command: PostProductCommand) {
    const { userId, name, content, price } = command;

    try {
      return await this.productRepository
        .createQueryBuilder()
        .insert()
        .into(Product)
        .values({
          name: name,
          content: content,
          price: price,
          sellerId: userId,
        })
        .execute();
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException('상품 등록 실패');
    }
  }
}
