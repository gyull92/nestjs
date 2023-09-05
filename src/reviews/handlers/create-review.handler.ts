import { CommandHandler } from '@nestjs/cqrs';
import { CreateReviewCommand } from '../commands/create-review.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from 'src/entities/review.entity';
import { Repository } from 'typeorm';
import { UnauthorizedException } from '@nestjs/common';
import { Sales } from 'src/entities/sales.entity';

@CommandHandler(CreateReviewCommand)
export class CreateReviewHandler {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(Sales)
    private readonly saleRepository: Repository<Sales>,
  ) {}

  async execute(command: CreateReviewCommand) {
    const { userId, productId, salesId, content, star } = command;

    const reviewInsert = this.reviewInsert(
      userId,
      productId,
      salesId,
      content,
      star,
    );

    const reviewId = (await reviewInsert).raw.insertId;

    try {
      return await this.saleRepository
        .createQueryBuilder()
        .update(Sales)
        .set({ reviewId: reviewId })
        .where('id = :salesId', { salesId })
        .andWhere('consumerId = :userId', { userId })
        .andWhere('productId = :productId', { productId })
        .execute();
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException();
    }

    // try {
    //   return await this.reviewRepository
    //     .createQueryBuilder()
    //     .insert()
    //     .into(Review)
    //     .values({
    //       content: content,
    //       star: star,
    //       salesId: salesId,
    //       productId: productId,
    //       userId: userId,
    //     })
    //     .execute();
    // } catch (e) {
    //   console.log(e);
    //   throw new UnauthorizedException('이미 리뷰를 작성하였습니다');
    // }
    // }
  }

  async reviewInsert(userId, productId, saleId, content, star) {
    try {
      return await this.reviewRepository
        .createQueryBuilder()
        .insert()
        .into(Review)
        .values({
          content: content,
          star: star,
          salesId: saleId,
          productId: productId,
          userId: userId,
        })
        .execute();
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException('이미 리뷰작성을 완료하였습니다');
    }
  }
}
