import { QueryHandler } from '@nestjs/cqrs';
import { GetArticleCommand } from '../commands/get-article.commnad';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from 'src/entities/articles.entity';
import { Repository } from 'typeorm';
import { UnauthorizedException } from '@nestjs/common';

@QueryHandler(GetArticleCommand)
export class GetArticleHandler {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async execute(command: GetArticleCommand) {
    const { articleId } = command;

    try {
      return await this.articleRepository
        .createQueryBuilder()
        .select('articles.title, articles.content, articles.image')
        .from(Article, 'articles')
        .where('articles.id = :articleId', { articleId: articleId })
        .getRawOne();
    } catch (e) {
      throw new UnauthorizedException('게시글 조회에 실패하였습니다');
    }
  }
}
