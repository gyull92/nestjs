import { QueryHandler } from '@nestjs/cqrs';
import { GetReviewCommand } from '../commands/get-review.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from 'src/entities/review.entity';
import { Repository } from 'typeorm';
import { UnauthorizedException } from '@nestjs/common';

@QueryHandler(GetReviewCommand)
export class GetReviewHandler {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async execute(command: GetReviewCommand) {
    const productId = command.productId;

    try {
      return await this.reviewRepository
        .createQueryBuilder()
        .select('reviews')
        .from(Review, 'reviews')
        .where('reviews.productId = :productId', { productId })
        .getMany();
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException('리뷰 조회 실패');
    }
  }
}
