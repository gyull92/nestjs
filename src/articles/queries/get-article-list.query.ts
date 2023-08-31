import { UnauthorizedException } from '@nestjs/common';
import { QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from 'src/entities/articles.entity';
import { Repository } from 'typeorm';
import { GetArticleListCommand } from '../commands/get-article-list.command';

@QueryHandler(GetArticleListCommand)
export class GetArticleListHandler {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async execute() {
    try {
      return await this.articleRepository
        .createQueryBuilder()
        .select('articles.title')
        .from(Article, 'articles')
        .getMany();
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException('게시글 목록 불러오기 실패');
    }
  }
}
