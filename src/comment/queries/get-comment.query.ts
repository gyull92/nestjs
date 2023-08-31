import { QueryHandler } from '@nestjs/cqrs';
import { GetCommentCommand } from '../commands/get-comment.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/entities/comment.entity';
import { Repository } from 'typeorm';
import { UnauthorizedException } from '@nestjs/common';

@QueryHandler(GetCommentCommand)
export class GetCommentHandler {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async execute(command: GetCommentCommand) {
    const { articleId } = command;

    try {
      return await this.commentRepository
        .createQueryBuilder()
        .select('comments')
        .from(Comment, 'comments')
        .where('comments.articleId = :articleId', { articleId })
        .getMany();
    } catch (e) {
      throw new UnauthorizedException('댓글 조회에 실패하였습니다');
    }
  }
}
