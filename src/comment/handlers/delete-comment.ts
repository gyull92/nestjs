import { CommandHandler } from '@nestjs/cqrs';
import { DeleteCommentCommand } from '../commands/delete-comment.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/entities/comment.entity';
import { Repository } from 'typeorm';
import { UnauthorizedException } from '@nestjs/common';

@CommandHandler(DeleteCommentCommand)
export class DeleteCommentHandler {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
  ) {}

  async execute(command: DeleteCommentCommand) {
    const { userId, articleId, commentId } = command;
    try {
      return await this.commentRepository
        .createQueryBuilder()
        .delete()
        .from(Comment)
        .where('id = :commentId', { commentId })
        .andWhere('articleId = :articleId', { articleId })
        .andWhere('userId = :userId', { userId })
        .execute();
    } catch (e) {
      throw new UnauthorizedException('댓글 삭제에 실패하였습니다');
    }
  }
}
