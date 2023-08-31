import { QueryHandler } from '@nestjs/cqrs';
import { MyReviewListCommand } from '../commands/my-review.list.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from 'src/entities/review.entity';
import { Repository } from 'typeorm';
import { UnauthorizedException } from '@nestjs/common';

@QueryHandler(MyReviewListCommand)
export class MyReviewListHandler {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async execute(command: MyReviewListCommand) {
    const { userId } = command;

    try {
      return await this.reviewRepository
        .createQueryBuilder()
        .select('reviews')
        .from(Review, 'reviews')
        .where('reviews.userId = :userId', { userId })
        .leftJoinAndSelect('reviews.Product', 'product')
        .getMany();
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException('나의 리뷰 목록 불러오기 실패');
    }
  }
}
