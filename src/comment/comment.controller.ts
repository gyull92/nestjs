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
import { CreateCommentCommand } from './commands/create-comment.command';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { UpdateCommentCommand } from './commands/update-comment.command';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { DeleteCommentCommand } from './commands/delete-comment.command';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { GetCommentCommand } from './commands/get-comment.command';

@Controller('comment')
export class CommentController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @ApiTags('comment')
  @ApiOperation({ summary: '댓글 조회' })
  @ApiQuery({ name: 'articleId', example: 1, description: '조회할 게시글 id' })
  @Get()
  async getComment(@Query('articleId') articleId: number) {
    return await this.queryBus.execute(new GetCommentCommand(articleId));
  }

  @ApiTags('comment')
  @ApiOperation({ summary: '댓글 작성' })
  @ApiQuery({ name: 'articleId', example: 1, description: '원문 게시글 id' })
  @ApiBody({ type: CreateCommentDto })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async createComment(
    @Req() req,
    @Query('articleId') articleId: number,
    @Body() commentInfo: CreateCommentCommand,
  ) {
    const userId = req.user.userId;
    return await this.commandBus.execute(
      new CreateCommentCommand(userId, articleId, commentInfo.content),
    );
  }

  @ApiTags('comment')
  @ApiOperation({ summary: '댓글 수정' })
  @ApiQuery({ name: 'articleId', example: 1, description: '원문 게시글 id' })
  @ApiQuery({ name: 'commentId', example: 1, description: '수정할 댓글 id' })
  @ApiBody({ type: UpdateCommentDto })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('/update')
  async updateComment(
    @Req() req,
    @Query('articleId') articleId: number,
    @Query('commentId') commentId: number,
    @Body() commentInfo: UpdateCommentCommand,
  ) {
    const userId = req.user.userId;
    return await this.commandBus.execute(
      new UpdateCommentCommand(
        userId,
        articleId,
        commentId,
        commentInfo.content,
      ),
    );
  }

  @ApiTags('comment')
  @ApiOperation({ summary: '댓글삭제' })
  @ApiQuery({ name: 'articleId', example: 1, description: '원문 게시글 id' })
  @ApiQuery({ name: 'commentId', example: 1, description: '삭제할 댓글 id' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete()
  async DeleteCommentCommand(
    @Req() req,
    @Query('articleId') articleId: number,
    @Query('commentId') commentId: number,
  ) {
    const userId = req.user.userId;
    return await this.commandBus.execute(
      new DeleteCommentCommand(userId, articleId, commentId),
    );
  }
}
