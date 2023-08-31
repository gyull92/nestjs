import { InjectRepository } from '@nestjs/typeorm';
import { UpdateCommentCommand } from '../commands/update-comment.command';
import { Comment } from 'src/entities/comment.entity';
import { Repository } from 'typeorm';
import { CommandHandler } from '@nestjs/cqrs';
import { UnauthorizedException } from '@nestjs/common';

@CommandHandler(UpdateCommentCommand)
export class UpdateCommentHandler {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async execute(command: UpdateCommentCommand) {
    const { userId, articleId, commentId, content } = command;

    try {
      return await this.commentRepository
        .createQueryBuilder()
        .update(Comment)
        .set({ content: content })
        .where('userId = :userId', { userId })
        .andWhere('articleId = :articleId', { articleId })
        .andWhere('id = :commentId', { commentId })
        .execute();
    } catch (e) {
      throw new UnauthorizedException('댓글 수정에 실패하였습니다');
    }
  }
}
