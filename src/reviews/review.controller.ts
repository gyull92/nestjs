import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateReviewCommand } from './commands/create-review.command';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewCommand } from './commands/update-review.command';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { UpdateReviewDto } from './dto/update-review.dto';
import { DeleteReviewCommand } from './commands/delete-review.command';
import { GetReviewCommand } from './commands/get-review.command';
import { MyReviewListCommand } from './commands/my-review.list.command';
import { jwtConfigService } from 'src/config/jwt.config';

@Controller('review')
export class ReviewController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @ApiTags('review')
  @ApiOperation({ summary: '리뷰조회' })
  @ApiParam({ name: 'productId', example: '1' })
  @Get('/getReview/:productId')
  async getReview(@Param('productId') productId) {
    return await this.queryBus.execute(new GetReviewCommand(productId));
  }

  @ApiTags('review')
  @ApiOperation({ summary: '리뷰작성' })
  @ApiParam({ name: 'productId', example: '1', description: '상품 id' })
  @ApiParam({ name: 'salesId', example: '1', description: '판매 id' })
  @ApiBody({ type: CreateReviewDto })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('/createReview/:productId/:salesId')
  async createReview(
    @Req() req,
    @Param('productId') productId,
    @Param('salesId') salesId,
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
  @ApiParam({ name: 'productId', example: '1', description: '상품 id' })
  @ApiParam({ name: 'reviewId', example: '1', description: '리뷰 id' })
  @ApiBody({ type: UpdateReviewDto })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('/updateReview/:productId/:reviewId')
  async updateReview(
    @Req() req,
    @Param('productId') productId,
    @Param('reviewId') reviewId,
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
  @ApiParam({ name: 'productId', example: '1', description: '상품 id' })
  @ApiParam({ name: 'commentId', example: '1', description: '댓글 id' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('/deleteReview/:productId/:commentId')
  async deleteReview(
    @Req() req,
    @Param('productId') productId,
    @Param('commentId') commentId,
  ) {
    const userId = req.user.userId;
    return await this.commandBus.execute(
      new DeleteReviewCommand(userId, productId, commentId),
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
