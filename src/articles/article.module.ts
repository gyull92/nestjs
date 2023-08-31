import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConfigService } from 'src/config/jwt.config';
import { Article } from 'src/entities/articles.entity';
import { ArticleController } from './article.controller';
import { GetArticleHandler } from './queries/get-article.query';
import { CreateArticleHandler } from './handlers/create-article.handler';
import { UpdateArticleHandler } from './handlers/update-article.handler';
import { DeleteArticleHandler } from './handlers/delete-article.handler';
import { GetArticleListHandler } from './queries/get-article-list.query';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([Article]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: jwtConfigService,
      inject: [ConfigService],
    }),
  ],
  controllers: [ArticleController],
  providers: [
    GetArticleHandler,
    CreateArticleHandler,
    UpdateArticleHandler,
    DeleteArticleHandler,
    GetArticleListHandler,
  ],
})
export class ArticleModule {}
