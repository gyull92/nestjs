import { CommandHandler } from '@nestjs/cqrs';
import { DeleteProductCommand } from '../commands/delete-product.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';
import { UnauthorizedException } from '@nestjs/common';

@CommandHandler(DeleteProductCommand)
export class DeleteProductHandler {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async execute(deleteInfo: DeleteProductCommand) {
    const { userId, productId } = deleteInfo;

    try {
      return await this.productRepository
        .createQueryBuilder()
        .delete()
        .from(Product)
        .where('id = :id', { id: productId })
        .andWhere('userId = :userId', { userId: userId })
        .execute();
    } catch (e) {
      throw new UnauthorizedException('상품 삭제 실패');
    }
  }
}
