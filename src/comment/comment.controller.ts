import { Body, Controller, Delete, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService) { }

    @ApiTags('comment')
    @ApiOperation({ summary: '댓글작성' })
    @ApiParam({ name: 'articleId', example: '1' })
    @ApiBody({ schema: { properties: { content: { type: 'string' } } } })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post('/create/:articleId')
    async createComment(@Req() req, @Param('articleId') articleId: number, @Body() content: string) {
        return await this.commentService.createComment(req, articleId, content);
    }

    @ApiTags('comment')
    @ApiOperation({ summary: '댓글 수정' })
    @ApiParam({ name: 'commentId', example: '1' })
    @ApiBody({ schema: { properties: { content: { type: 'string' } } } })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Put('/updated/:commentId')
    async updateComment(@Req() req, @Param('commentId') commentId: number, @Body() content: string) {
        return await this.commentService.updateComment(req, commentId, content);
    }

    @ApiTags('comment')
    @ApiOperation({ summary: '댓글 삭제' })
    @ApiParam({ name: 'commentId', example: '1' })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Delete('delete/:commentId')
    async deleteComment(@Req() req, @Param('commentId') commentId: number) {
        return await this.commentService.deleteComment(req, commentId);
    }
}