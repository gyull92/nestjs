import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from 'src/entites/article.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtConfigService } from 'src/config/jwt.config';

@Module({
  imports: [TypeOrmModule.forFeature([Article]),
  JwtModule.registerAsync({
    imports: [ConfigModule],
    useClass: JwtConfigService,
    inject: [ConfigService],
  }),
  ],
  controllers: [ArticleController],
  providers: [ArticleService]
})
export class ArticleModule { }
