import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { CommentService } from './comment.service';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService) { }

    @ApiTags('comment')
    @ApiOperation({ summary: '댓글작성' })
    @ApiParam({ name: 'userId', example: '1' })
    @ApiParam({ name: 'articleId', example: '1' })
    @ApiBody({ schema: { properties: { content: { type: 'string' } } } })
    @Post('/create/:userId/:articleId')
    async createComment(@Param('userId') userId: number, @Param('articleId') articleId: number, @Body() content: string) {
        return await this.commentService.createComment(userId, articleId, content);
    }

    @ApiTags('comment')
    @ApiOperation({ summary: '댓글 수정' })
    @ApiParam({ name: 'userId', example: '1' })
    @ApiParam({ name: 'commentId', example: '1' })
    @ApiBody({ schema: { properties: { content: { type: 'string' } } } })
    @Put('/updated/:userId/:commentId')
    async updateComment(@Param('userId') userId: number, @Param('commentId') commentId: number, @Body() content: string) {
        return await this.commentService.updateComment(userId, commentId, content);
    }

    @ApiTags('comment')
    @ApiOperation({ summary: '댓글 삭제' })
    @ApiParam({ name: 'userId', example: '1' })
    @ApiParam({ name: 'commentId', example: '1' })
    @Delete('delete/:userId/:commentId')
    async deleteComment(@Param('userId') userId: number, @Param('commentId') commentId: number) {
        return await this.commentService.deleteComment(userId, commentId);
    }
}