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
    console.log(command);
    const { userId, productId, commentId } = command;

    try {
      return await this.reviewRepository
        .createQueryBuilder()
        .delete()
        .from(Review)
        .where({ id: commentId })
        .andWhere({ userId: userId })
        .andWhere({ productId: productId })
        .execute();
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException('리뷰 삭제 실패');
    }
  }
}
