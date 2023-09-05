import { QueryHandler } from '@nestjs/cqrs';
import { StarCountCommand } from '../commands/star-count-command';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from 'src/entities/review.entity';
import { Repository } from 'typeorm';
import { UnauthorizedException } from '@nestjs/common';

@QueryHandler(StarCountCommand)
export class StarCountHandler {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async execute(command: StarCountCommand) {
    const { userId, productId } = command;

    try {
      const reviews = await this.reviewRepository
        .createQueryBuilder()
        .select('reviews.star')
        .from(Review, 'reviews')
        .where('reviews.userId = :userId', { userId })
        .andWhere('reviews.productId = :productId', { productId })
        .getMany();

      const starValues = reviews.map((review) => review.star);

      const averageStar =
        starValues.reduce((sum, star) => sum + star, 0) / starValues.length;
      return averageStar;
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException();
    }
  }
}
