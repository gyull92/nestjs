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
    const insertResult = await this.reviewInsert(
      userId,
      productId,
      salesId,
      content,
      star,
    );
    const reviewId = insertResult.identifiers[0].id;

    try {
      return await this.salesRepository
        .createQueryBuilder()
        .update(Sales)
        .set({ reviewId: reviewId })
        .where({ id: salesId })
        .execute();
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException('리뷰 id 업데이트 실패');
    }
  }

  async reviewInsert(userId, productId, salesId, content, star) {
    try {
      return await this.reviewRepository
        .createQueryBuilder()
        .insert()
        .into(Review)
        .values({
          userId: userId,
          productId: productId,
          salesId: salesId,
          content: content,
          star: star,
        })
        .execute();
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException('리뷰 등록 실패');
    }
  }
}
