import { CommandHandler } from '@nestjs/cqrs';
import { CreateReviewCommand } from '../commands/create-review.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from 'src/entities/review.entity';
import { Connection, Repository } from 'typeorm';
import { UnauthorizedException } from '@nestjs/common';
import { Sales } from 'src/entities/sales.entity';

@CommandHandler(CreateReviewCommand)
export class CreateReviewHandler {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(Sales)
    private readonly salesRepository: Repository<Sales>,
    private readonly connection: Connection,
  ) {}

  async execute(command: CreateReviewCommand) {
    const { userId, productId, salesId, content, star } = command;
    const reviewFind = await this.reviewFind(salesId, userId, productId);

    if (reviewFind.reviewId == null) {
      try {
        return await this.reviewRepository
          .createQueryBuilder()
          .insert()
          .into(Review)
          .values({
            content: content,
            star: star,
            salesId: salesId,
            productId: productId,
            userId: userId,
          })
          .execute();
      } catch (e) {
        console.log(e);
        throw new UnauthorizedException();
      }
    } else {
      throw new UnauthorizedException('이미 리뷰룰 작성하였습니다');
    }

    try {
      return await this.salesRepository
      .createQueryBuilder()
      .update(Sales)
      .set({reviewId: reviewFind})
      .where('id = :saleId',{salesId})
      .andWhere('productId = :productId', {productId})
      .andWhere('consumerId = :userId', {userId})
      .execute()
    }
  }

  async reviewFind(salesId, userId, productId) {
    try {
      return await this.salesRepository
        .createQueryBuilder()
        .select('sale')
        .from(Sales, 'sale')
        .where('sale.id = :salesId', { salesId })
        .andWhere('sale.productId = :productId', { productId })
        .andWhere('sale.consumerId = :userId', { userId })
        .leftJoin('sale.Review', 'review')
        .getOne();
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException();
    }
  }
}
