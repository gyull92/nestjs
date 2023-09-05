import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConfigService } from 'src/config/jwt.config';
import { Sales } from 'src/entities/sales.entity';
import { SalesController } from './sales.controller';
import { SalesListHandler } from './qureies/sales-list..query';
import { BuyProductHandler } from './handlers/buy-product.handler';
import { Product } from 'src/entities/product.entity';
import { User } from 'src/entities/users.entity';
import { MyProductListHandler } from './qureies/my-sale-list.query';
import { SaleItemDetailHandler } from './qureies/sale-item-detail.query';
import { StarCountHandler } from './qureies/star-count-query';
import { Review } from 'src/entities/review.entity';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([Sales, Product, User, Review]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: jwtConfigService,
      inject: [ConfigService],
    }),
  ],
  controllers: [SalesController],
  providers: [
    SalesListHandler,
    BuyProductHandler,
    MyProductListHandler,
    SaleItemDetailHandler,
    StarCountHandler,
  ],
})
export class SalesModule {}
