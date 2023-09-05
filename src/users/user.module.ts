import { Module } from '@nestjs/common';
import { User } from 'src/entities/users.entity';
import { UserController } from './user.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { jwtConfigService } from 'src/config/jwt.config';
import { CreateUserHandler } from './handlers/create-user.handler';
import { PasswordChangeHandler } from './handlers/password-change.handler';
import { UpdateUserHandler } from './handlers/update-user.handler';
import { SignInUserHandler } from './handlers/sign-in-user.query';
import { GetProfileHandler } from './queries/get-profile.query';
import { GetMyOrderHandler } from './queries/get-my-order.query';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: jwtConfigService,
      inject: [ConfigService],
    }),
  ],
  controllers: [UserController],
  providers: [
    CreateUserHandler,
    SignInUserHandler,
    PasswordChangeHandler,
    UpdateUserHandler,
    GetProfileHandler,
    GetMyOrderHandler,
  ],
})
export class UserModule {}
