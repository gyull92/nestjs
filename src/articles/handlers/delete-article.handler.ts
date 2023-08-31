import { CommandHandler } from '@nestjs/cqrs';
import { DeleteArticleCommand } from '../commands/delete-article.commnad';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from 'src/entities/articles.entity';
import { Repository } from 'typeorm';
import { UnauthorizedException } from '@nestjs/common';

@CommandHandler(DeleteArticleCommand)
export class DeleteArticleHandler {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async execute(command: DeleteArticleCommand) {
    const { userId, articleId } = command;
    try {
      return await this.articleRepository
        .createQueryBuilder()
        .delete()
        .from(Article)
        .where('id = :articleId', { articleId })
        .andWhere('userId = :userId', { userId })
        .execute();
    } catch (e) {
      throw new UnauthorizedException('게시글 삭제에 실패하였습니다');
    }
  }
}
