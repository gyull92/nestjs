import { CommandHandler } from '@nestjs/cqrs';
import { UpdateArticleCommand } from '../commands/update-article.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from 'src/entities/articles.entity';
import { Repository } from 'typeorm';
import { UnauthorizedException } from '@nestjs/common';

@CommandHandler(UpdateArticleCommand)
export class UpdateArticleHandler {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async execute(command: UpdateArticleCommand) {
    const { userId, articleId, title, content, image } = command;

    try {
      return await this.articleRepository
        .createQueryBuilder()
        .update(Article)
        .set({ title: title, content: content, image: image })
        .where({ id: articleId })
        .andWhere({ userId: userId })
        .execute();
    } catch (e) {
      throw new UnauthorizedException('게시글 수정에 실패하였습니다');
    }
  }
}
