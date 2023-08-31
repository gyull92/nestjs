import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConfigService } from 'src/config/jwt.config';
import { Review } from 'src/entities/review.entity';
import { GetReviewHandler } from './queries/get-review.query';
import { CreateReviewHandler } from './handlers/create-review.handler';
import { UpdateReviewHandler } from './handlers/update-review.handler';
import { DeleteReviewHandler } from './handlers/delete-review.handler';
import { ReviewController } from './review.controller';
import { Sales } from 'src/entities/sales.entity';
import { MyReviewListHandler } from './queries/my-review.list.query';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([Review, Sales]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: jwtConfigService,
      inject: [ConfigService],
    }),
  ],
  controllers: [ReviewController],
  providers: [
    GetReviewHandler,
    CreateReviewHandler,
    UpdateReviewHandler,
    DeleteReviewHandler,
    MyReviewListHandler,
  ],
})
export class ReviewModule {}
