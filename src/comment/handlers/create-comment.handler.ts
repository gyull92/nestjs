import { CommandHandler } from '@nestjs/cqrs';
import { CreateCommentCommand } from '../commands/create-comment.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/entities/comment.entity';
import { Repository } from 'typeorm';
import { UnauthorizedException } from '@nestjs/common';

@CommandHandler(CreateCommentCommand)
export class CreateCommentHandler {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async execute(command: CreateCommentCommand) {
    const { userId, articleId, content } = command;
    try {
      return await this.commentRepository
        .createQueryBuilder()
        .insert()
        .into(Comment)
        .values({
          articleId: articleId,
          content: content,
          userId: userId,
        })
        .execute();
    } catch (e) {
      throw new UnauthorizedException('댓글 생성에 실패하였습니다');
    }
  }
}
