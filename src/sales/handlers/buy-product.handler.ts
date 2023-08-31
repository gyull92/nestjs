import { CommandHandler } from '@nestjs/cqrs';
import { BuyProductCommand } from '../commands/buy-product.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { UnauthorizedException } from '@nestjs/common';
import { Sales } from 'src/entities/sales.entity';
import { Product } from 'src/entities/product.entity';
import { User } from 'src/entities/users.entity';

@CommandHandler(BuyProductCommand)
export class BuyProductHandler {
  constructor(
    @InjectRepository(Sales)
    private readonly salesRepository: Repository<Sales>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly connection: Connection,
  ) {}

  async execute(command: BuyProductCommand) {
    const { userId, productId } = command;

    const product = await this.productFind(productId);
    const user = await this.pointFind(userId);

    const productPrice = product.price;
    const productSeller = product.sellerId;
    const userPoint = user.point;

    if (userPoint > productPrice) {
      const queryRunner = await this.connection.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        await queryRunner.manager
          .createQueryBuilder()
          .insert()
          .into(Sales)
          .values({
            productId: productId,
            consumerId: userId,
            sellerId: productSeller,
          })
          .execute();

        await queryRunner.manager
          .createQueryBuilder()
          .update(Product)
          .set({ count: () => 'count +1' })
          .where({ id: productId })
          .execute();

        await queryRunner.manager
          .createQueryBuilder()
          .update(User)
          .set({ point: () => `point - ${productPrice}` })
          .execute();

        await queryRunner.commitTransaction();
      } catch (e) {
        console.log(e);
        await queryRunner.rollbackTransaction();
        throw new UnauthorizedException('상품 구매 실패');
      } finally {
        await queryRunner.release();
      }
    } else {
      throw new UnauthorizedException('포인트가 부족합니다');
    }
  }

  async productFind(productId) {
    try {
      return await this.productRepository
        .createQueryBuilder()
        .select(['products.price', 'products.sellerId'])
        .from(Product, 'products')
        .where('products.id = :productId', { productId })
        .getOne();
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException();
    }
  }

  async pointFind(userId) {
    try {
      return await this.userRepository
        .createQueryBuilder()
        .select('users')
        .from(User, 'users')
        .where('users.id = :userId', { userId })
        .getOne();
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException();
    }
  }
}
