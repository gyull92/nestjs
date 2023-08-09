import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmConfigService } from './config/typeorm.config.service';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigService } from './config/jwt.config';
import { ArticleModule } from './article/article.module';
import { CommentModule } from './comment/comment.module';
import { JwtStrategy } from './auth/strategy/jwt.strategy';
import { ProfileModule } from './profile/profile.module';
import { TermsofuseController } from './termsofuse/termsofuse.controller';
import { TermsofuseModule } from './termsofuse/termsofuse.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
      inject: [ConfigService]
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: JwtConfigService,
      inject: [ConfigService]
    }),
    UserModule,
    AuthModule,
    ArticleModule,
    CommentModule,
    ProfileModule,
    TermsofuseModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule { }
