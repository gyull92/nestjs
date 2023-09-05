import { CommandHandler } from '@nestjs/cqrs';
import { DeleteReviewCommand } from '../commands/delete-review.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from 'src/entities/review.entity';
import { Repository } from 'typeorm';
import { UnauthorizedException } from '@nestjs/common';

@CommandHandler(DeleteReviewCommand)
export class DeleteReviewHandler {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async execute(command: DeleteReviewCommand) {
    const { userId, productId, reviewId } = command;

    try {
      return await this.reviewRepository
        .createQueryBuilder()
        .softDelete()
        .from(Review)
        .where('id = :reviewId', { reviewId })
        .andWhere('userId = :userId', { userId })
        .andWhere('productId = :productId', { productId })
        .execute();
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException('리뷰 삭제 실패');
    }
  }
}
