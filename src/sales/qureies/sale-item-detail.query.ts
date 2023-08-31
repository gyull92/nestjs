import { QueryHandler } from '@nestjs/cqrs';
import { SaleItemDetailCommand } from '../commands/sale-item-detail.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Sales } from 'src/entities/sales.entity';
import { Repository } from 'typeorm';
import { UnauthorizedException } from '@nestjs/common';

@QueryHandler(SaleItemDetailCommand)
export class SaleItemDetailHandler {
  constructor(
    @InjectRepository(Sales)
    private readonly saleRepository: Repository<Sales>,
  ) {}

  async execute(command: SaleItemDetailCommand) {
    const { userId, saleId } = command;

    try {
      return await this.saleRepository
        .createQueryBuilder('sale')
        .leftJoin('sale.Product', 'product')
        .leftJoin('sale.Review', 'review')
        .leftJoin('sale.Consumer', 'user')
        .addSelect([
          'product.name',
          'product.price',
          'review.content',
          'review.star',
          'user.name',
          'user.phone',
          'user.address',
        ])
        .where('sale.id = :saleId', { saleId })
        .andWhere('sale.consumerId = :userId', { userId })
        .getOne();
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException();
    }

    // const saleInfo = await this.saleInfo(userId, saleId);
    // const productInfo = await this.productInfo(saleInfo.productId);
    // const userInfo = await this.consumerInfo(saleInfo.consumerId);
    // const reviewInfo = await this.reviewInfo(saleInfo.reviewId);

    // return {
    //   productInfo: productInfo,
    //   userInfo: userInfo,
    //   reviewInfo: reviewInfo,
    // };
  }

  // async saleInfo(userId, saleId) {
  //   try {
  //     return await this.saleRepository
  //       .createQueryBuilder()
  //       .select('sale')
  //       .from(Sales, 'sale')
  //       .where('sale.id = :saleId', { saleId })
  //       .andWhere('sale.sellerId = :userId', { userId })
  //       .getOne();
  //   } catch (e) {
  //     console.log(e);
  //     throw new UnauthorizedException('판매 정보 불러오기 실패');
  //   }
  // }

  // async productInfo(productId) {
  //   try {
  //     return await this.productRepository
  //       .createQueryBuilder()
  //       .select(
  //         'products.name, product.content, product.price, product.count, product.createdAt, product.updatedAt, product.deletedAt',
  //       )
  //       .from(Product, 'products')
  //       .where('products.id = :productId', { productId })
  //       .getRawOne();
  //   } catch (e) {
  //     console.log(e);
  //     throw new UnauthorizedException('상품 정보 불러오기 실패');
  //   }
  // }

  // async consumerInfo(userId) {
  //   try {
  //     return await this.userRepository
  //       .createQueryBuilder()
  //       .select('users.name, users.phone, users.address')
  //       .from(User, 'users')
  //       .where('users.id = :userId', { userId })
  //       .getRawOne();
  //   } catch (e) {
  //     console.log(e);
  //     throw new UnauthorizedException('구매자 정보 불러오기 실패');
  //   }
  // }

  // async reviewInfo(reviewId) {
  //   try {
  //     return await this.reviewRepository
  //       .createQueryBuilder()
  //       .select('reviews')
  //       .from(Review, 'reviews')
  //       .where('reviews.id = :reviewId', { reviewId })
  //       .getOne();
  //   } catch (e) {
  //     console.log(e);
  //     throw new UnauthorizedException('리뷰 정보 불러오기 실패');
  //   }
  // }
}
