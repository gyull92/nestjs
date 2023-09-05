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
import { GetArticleCommand } from './commands/get-article.command';
import { CreateArticleDto } from './dto/create-article.dto';
import { CreateArticleCommand } from './commands/create-article.command';
import { UpdateArticleDto } from './dto/update-article.dto';
import { UpdateArticleCommand } from './commands/update-article.command';
import { DeleteArticleCommand } from './commands/delete-article.command';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { GetArticleListCommand } from './commands/get-article-list.command';

@Controller('article')
export class ArticleController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @ApiTags('article')
  @ApiOperation({ summary: '게시글 전체 목록 불러오기' })
  @Get('/articles')
  async getAllArticle() {
    return await this.queryBus.execute(new GetArticleListCommand());
  }

  @ApiTags('article')
  @ApiOperation({ summary: '게시글 조회' })
  @ApiQuery({ name: 'articleId', example: 1, description: '조회할 게시글 id' })
  @Get('/articleDetail')
  async getArticle(@Query('articleId') articleId: number) {
    return await this.queryBus.execute(new GetArticleCommand(articleId));
  }

  @ApiTags('article')
  @ApiOperation({ summary: '게시글 작성' })
  @ApiBody({ type: CreateArticleDto })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async createArticle(@Req() req, @Body() articleInfo: CreateArticleCommand) {
    const userId = req.user.userId;
    return await this.commandBus.execute(
      new CreateArticleCommand(
        userId,
        articleInfo.title,
        articleInfo.content,
        articleInfo.image,
      ),
    );
  }

  @ApiTags('article')
  @ApiOperation({ summary: '게시글 수정' })
  @ApiQuery({ name: 'articleId', example: 1, description: '수정할 게시글 id' })
  @ApiBody({ type: UpdateArticleDto })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('/update')
  async updateArticle(
    @Req() req,
    @Query('articleId') articleId: number,
    @Body() articleInfo: UpdateArticleCommand,
  ) {
    const userId = req.user.userId;
    return await this.commandBus.execute(
      new UpdateArticleCommand(
        userId,
        articleId,
        articleInfo.title,
        articleInfo.content,
        articleInfo.image,
      ),
    );
  }

  @ApiTags('article')
  @ApiOperation({ summary: '게시글 삭제' })
  @ApiQuery({ name: 'articleId', example: 1, description: '삭제할 게시글 id' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteArticle(@Req() req, @Query('articleId') articleId: number) {
    const userId = req.user.userId;
    return await this.commandBus.execute(
      new DeleteArticleCommand(userId, articleId),
    );
  }
}
