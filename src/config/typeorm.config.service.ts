import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config/dist"
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { User } from '../entites/user.entity'
import { Article } from "src/entites/article.entity";
import { Comment } from "src/entites/comment.entity";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor(private readonly configService: ConfigService) { }
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            host: this.configService.get<string>('DB_HOST'),
            port: this.configService.get<number>('DB_PORT'),
            username: this.configService.get<string>('DB_USERNAME'),
            password: this.configService.get<string>('DB_PASSWORD'),
            database: this.configService.get<string>('DB_DATABASE'),
            entities: [User, Article, Comment],
            synchronize: true,
        }
    }
}