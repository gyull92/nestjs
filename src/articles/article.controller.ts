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
import { GetArticleCommand } from './commands/get-article.commnad';
import { CreateArticleDto } from './dto/create-article.dto';
import { CreateArticleCommand } from './commands/create-article.command';
import { UpdateArticleDto } from './dto/update-article.dto';
import { UpdateArticleCommand } from './commands/update-article.command';
import { DeleteArticleCommand } from './commands/delete-article.commnad';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
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
  @ApiParam({ name: 'articleId', description: '게시글 id' })
  @Get('/:articleId')
  async getArticle(@Param('articleId') articleId) {
    return await this.queryBus.execute(new GetArticleCommand(articleId));
  }

  @ApiTags('article')
  @ApiOperation({ summary: '게시글 작성' })
  @ApiBody({ type: CreateArticleDto })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('/createArticle')
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
  @ApiParam({ name: 'articleId', description: '게시글 id' })
  @ApiBody({ type: UpdateArticleDto })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('/updateArticle/:articleId')
  async updateArticle(
    @Req() req,
    @Param('articleId') articleId,
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
  @ApiParam({ name: 'articleId', description: '게시글 id' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('/deleteArticle/:articleId')
  async deleteArticle(@Req() req, @Param('articleId') articleId) {
    const userId = req.user.userId;
    return await this.commandBus.execute(
      new DeleteArticleCommand(userId, articleId),
    );
  }
}
