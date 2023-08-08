import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleInfo } from './dto/article.dto';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateArticleDto } from './interface/create-article-dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) { }

    @ApiTags('article')
    @ApiOperation({ summary: '게시글 작성' })
    @ApiOkResponse({ type: CreateArticleDto })
    @ApiBody({ type: CreateArticleDto })
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post('/create')
    async createdArticle(@Req() req, @Body() articleInfo: ArticleInfo) {
        return await this.articleService.createArticle(req, articleInfo);
    }

    @ApiTags('article')
    @ApiOperation({ summary: '게시글 수정' })
    @ApiOkResponse({ type: CreateArticleDto })
    @ApiParam({ name: 'articleId', example: '1' })
    @ApiBody({ type: CreateArticleDto })
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Put('/update/:articleId')
    async updateArtucle(@Req() req, @Param('articleId') articleId: number, @Body() articleInfo: ArticleInfo) {
        return await this.articleService.updateArticle(req, articleId, articleInfo);
    }

    @ApiTags('article')
    @ApiOperation({ summary: '게시글 조회' })
    @ApiOkResponse({ type: CreateArticleDto })
    @ApiParam({ name: 'articleId', example: '1' })
    @Get('get/:articleId')
    async getArticle(@Param('articleId') articleId: number) {
        return await this.articleService.getArticle(articleId);
    }

    @ApiTags('article')
    @ApiOperation({ summary: '게시글 삭제' })
    @ApiParam({ name: 'articleId', example: '1' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Delete('delete/:articleId')
    async deletedArticle(@Req() req, @Param('articleId') articleId: number) {
        return await this.articleService.deleteArticle(req, articleId);
    }
}
