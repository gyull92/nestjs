import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Article } from 'src/entities/articles.entity';
import { Comment } from 'src/entities/comment.entity';
import { Product } from 'src/entities/product.entity';
import { Review } from 'src/entities/review.entity';
import { Sales } from 'src/entities/sales.entity';
import { User } from 'src/entities/users.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_DATABASE'),
      entities: [User, Article, Comment, Product, Review, Sales],
      synchronize: true,
      logging: true,
    };
  }
}
