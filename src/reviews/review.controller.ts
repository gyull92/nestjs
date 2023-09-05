import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CreateReviewCommand } from './commands/create-review.command';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewCommand } from './commands/update-review.command';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { UpdateReviewDto } from './dto/update-review.dto';
import { DeleteReviewCommand } from './commands/delete-review.command';
import { GetReviewCommand } from './commands/get-review.command';
import { MyReviewListCommand } from './commands/my-review.list.command';

@Controller('review')
export class ReviewController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @ApiTags('review')
  @ApiOperation({ summary: '리뷰조회' })
  @ApiQuery({ name: 'productId', example: 1, description: '상품 id' })
  @Get()
  async getReview(@Query('productId') productId: number) {
    return await this.queryBus.execute(new GetReviewCommand(productId));
  }

  @ApiTags('review')
  @ApiOperation({ summary: '리뷰작성' })
  @ApiQuery({ name: 'productId', example: 1, description: '상품 id' })
  @ApiQuery({ name: 'salesId', example: 1, description: '판매 id' })
  @ApiBody({ type: CreateReviewDto })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async createReview(
    @Req() req,
    @Query('productId') productId: number,
    @Query('salesId') salesId: number,
    @Body() reviewInfo: CreateReviewCommand,
  ) {
    const userId = req.user.userId;
    return await this.commandBus.execute(
      new CreateReviewCommand(
        userId,
        productId,
        salesId,
        reviewInfo.content,
        reviewInfo.star,
      ),
    );
  }

  @ApiTags('review')
  @ApiOperation({ summary: '리뷰수정' })
  @ApiQuery({ name: 'productId', example: 1, description: '상품 id' })
  @ApiQuery({ name: 'reviewId', example: 1, description: '리뷰 id' })
  @ApiBody({ type: UpdateReviewDto })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('/update')
  async updateReview(
    @Req() req,
    @Query('productId') productId: number,
    @Query('reviewId') reviewId: number,
    @Body() reviewInfo: UpdateReviewCommand,
  ) {
    const userId = req.user.userId;
    return await this.commandBus.execute(
      new UpdateReviewCommand(
        userId,
        productId,
        reviewId,
        reviewInfo.content,
        reviewInfo.star,
      ),
    );
  }

  @ApiTags('review')
  @ApiOperation({ summary: '리뷰 삭제' })
  @ApiQuery({ name: 'productId', example: 1, description: '상품 id' })
  @ApiQuery({ name: 'reviewId', example: 1, description: '리뷰 id' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteReview(
    @Req() req,
    @Query('productId') productId: number,
    @Query('reviewId') reviewId: number,
  ) {
    const userId = req.user.userId;
    return await this.commandBus.execute(
      new DeleteReviewCommand(userId, productId, reviewId),
    );
  }

  @ApiTags('review')
  @ApiOperation({ summary: '나의 리뷰 목록 보기' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/myReviewList')
  async myReviewList(@Req() req) {
    const userId = req.user.userId;
    return await this.queryBus.execute(new MyReviewListCommand(userId));
  }
}
