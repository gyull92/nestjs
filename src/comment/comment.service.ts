import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/entites/comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
    constructor(@InjectRepository(Comment) private readonly commentRepository: Repository<Comment>) { }

    async createComment(req, articleId, content) {
        const userId = req.user.userId;
        console.log(req.user)
        try {
            return await this.commentRepository
                .createQueryBuilder()
                .insert()
                .into(Comment)
                .values({ content: content.content, User: userId, Article: articleId })
                .execute();
        } catch (e) {
            console.log(e);
            throw new UnauthorizedException();
        }
    }

    async updateComment(req, commentId, content) {
        const userId = req.user.userId;

        try {
            return await this.commentRepository
                .createQueryBuilder()
                .update(Comment)
                .set({ content: content.content })
                .where('id = :commentId', { commentId: commentId })
                .andWhere('User = :userId', { userId: userId })
                .execute();
        } catch (e) {
            console.log(e);
            throw new UnauthorizedException();
        }
    }

    async deleteComment(req, commentId) {
        const userId = req.user.userId;

        try {
            return await this.commentRepository
                .createQueryBuilder()
                .delete()
                .from(Comment)
                .where('id = :commentId', { commentId: commentId })
                .andWhere('User = :userId', { userId: userId })
                .execute();
        } catch (e) {
            console.log(e);
            throw new UnauthorizedException();
        }
    }
}
