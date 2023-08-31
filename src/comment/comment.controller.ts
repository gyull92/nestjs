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
import { CreateCommentCommand } from './commands/create-comment.command';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { UpdateCommentCommand } from './commands/update-comment.command';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { DeleteCommentCommand } from './commands/delete-comment.command';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { GetCommentCommand } from './commands/get-comment.command';

@Controller('comment')
export class CommentController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @ApiTags('comment')
  @ApiOperation({ summary: '댓글 조회' })
  @ApiParam({ name: 'articleId', description: '게시글 id' })
  @Get('/:articleId')
  async getComment(@Param('articleId') articleId) {
    console.log(articleId);
    return await this.queryBus.execute(new GetCommentCommand(articleId));
  }

  @ApiTags('comment')
  @ApiOperation({ summary: '댓글 작성' })
  @ApiParam({ name: 'articleId', description: '게시글 id' })
  @ApiBody({ type: CreateCommentDto })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('/createComment/:articleId')
  async createComment(
    @Req() req,
    @Param('articleId') articleId,
    @Body() commentInfo: CreateCommentCommand,
  ) {
    const userId = req.user.userId;
    return await this.commandBus.execute(
      new CreateCommentCommand(userId, articleId, commentInfo.content),
    );
  }

  @ApiTags('comment')
  @ApiOperation({ summary: '댓글 수정' })
  @ApiParam({ name: 'articleId', description: '게시글 id' })
  @ApiParam({ name: 'commentId', description: '댓글 id' })
  @ApiBody({ type: UpdateCommentDto })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('/updateComment/:articleId/:commentId')
  async updateComment(
    @Req() req,
    @Param('articleId') articleId,
    @Param('commentId') commentId,
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
  @ApiParam({ name: 'articleId', description: '게시글 id' })
  @ApiParam({ name: 'commentId', description: '댓글 id' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('/deleteComment/:articleId/:commentId')
  async DeleteCommentCommand(
    @Req() req,
    @Param('articleId') articleId,
    @Param('commentId') commentId,
  ) {
    const userId = req.user.userId;
    return await this.commandBus.execute(
      new DeleteCommentCommand(userId, articleId, commentId),
    );
  }
}
