import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConfigService } from 'src/config/jwt.config';
import { Comment } from 'src/entities/comment.entity';
import { CommentController } from './comment.controller';
import { GetCommentHandler } from './queries/get-comment.query';
import { CreateCommentHandler } from './handlers/create-comment.handler';
import { UpdateCommentHandler } from './handlers/update-comment.handler';
import { DeleteCommentHandler } from './handlers/delete-comment';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([Comment]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: jwtConfigService,
      inject: [ConfigService],
    }),
  ],
  controllers: [CommentController],
  providers: [
    GetCommentHandler,
    CreateCommentHandler,
    UpdateCommentHandler,
    DeleteCommentHandler,
  ],
})
export class CommentModule {}
