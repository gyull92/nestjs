import { CommandHandler } from '@nestjs/cqrs';
import { UpdateReviewCommand } from '../commands/update-review.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from 'src/entities/review.entity';
import { Repository } from 'typeorm';
import { UnauthorizedException } from '@nestjs/common';

@CommandHandler(UpdateReviewCommand)
export class UpdateReviewHandler {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async execute(command: UpdateReviewCommand) {
    const { userId, productId, reviewId, content, star } = command;

    try {
      return await this.reviewRepository
        .createQueryBuilder()
        .update(Review)
        .set({ content: content, star: star })
        .where({ id: reviewId })
        .andWhere({ userId: userId })
        .andWhere({ productId: productId })
        .execute();
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException('리뷰 수정 실패');
    }
  }
}
