import { CommandHandler } from '@nestjs/cqrs';
import { CreateArticleCommand } from '../commands/create-article.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from 'src/entities/articles.entity';
import { Repository } from 'typeorm';
import { UnauthorizedException } from '@nestjs/common';

@CommandHandler(CreateArticleCommand)
export class CreateArticleHandler {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async execute(command: CreateArticleCommand) {
    const { userId, title, content, image } = command;

    try {
      return await this.articleRepository
        .createQueryBuilder()
        .insert()
        .into(Article)
        .values({
          title: title,
          content: content,
          image: image,
          userId: userId,
        })
        .execute();
    } catch (e) {
      throw new UnauthorizedException('게시물 생성에 실패하였습니다');
    }
  }
}
