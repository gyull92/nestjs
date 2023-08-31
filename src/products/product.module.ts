import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConfigService } from 'src/config/jwt.config';
import { Product } from 'src/entities/product.entity';
import { GetProductHandler } from './queries/get-product.query';
import { PostProductHandler } from './handlers/post-product.handler';
import { UpdateProductHandler } from './handlers/update-product.handler';
import { DeleteProductHandler } from './handlers/delete-product.handler';
import { ProductController } from './product.controller';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([Product]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: jwtConfigService,
      inject: [ConfigService],
    }),
  ],
  controllers: [ProductController],
  providers: [
    GetProductHandler,
    PostProductHandler,
    UpdateProductHandler,
    DeleteProductHandler,
  ],
})
export class ProductModule {}
