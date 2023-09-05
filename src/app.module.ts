import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/typeorm.config.service';
import { UserModule } from './users/user.module';
import { ArticleModule } from './articles/article.module';
import { CommentModule } from './comment/comment.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfigService } from './config/jwt.config';
import { JwtStrategy } from './auth/strategy/jwt.strategy';
import { ProductModule } from './products/product.module';
import { ReviewModule } from './reviews/review.module';
import { SalesModule } from './sales/sales.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: jwtConfigService,
      inject: [ConfigService],
    }),
    UserModule,
    ArticleModule,
    CommentModule,
    ProductModule,
    ReviewModule,
    SalesModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
