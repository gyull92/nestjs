import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { SalesListCommand } from './commands/sales-list.command';
import { BuyProductCommand } from './commands/buy-product.command';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { MyProductListCommand } from './commands/my-product-list.command';
import { SaleItemDetailCommand } from './commands/sale-item-detail.command';

@Controller('sales')
export class SalesController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @ApiTags('sales')
  @ApiOperation({ summary: '상품 구매 목록 조회' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/mySales')
  async salesList(@Req() req) {
    const userId = req.user.userId;
    return await this.queryBus.execute(new SalesListCommand(userId));
  }

  @ApiTags('sales')
  @ApiOperation({ summary: '상품구매' })
  @ApiParam({ name: 'productId', description: '상품 id', example: '1' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('/buyItem/:productId')
  async buyItem(@Req() req, @Param('productId') productId) {
    const userId = req.user.userId;
    return await this.commandBus.execute(
      new BuyProductCommand(userId, productId),
    );
  }

  @ApiTags('sales')
  @ApiOperation({ summary: '나의 판매 목록' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/mySaleItem')
  async mySaleList(@Req() req) {
    const userId = req.user.userId;
    return await this.queryBus.execute(new MyProductListCommand(userId));
  }

  @ApiTags('sales')
  @ApiOperation({ summary: '판매 상세 정보' })
  @ApiParam({ name: 'saleId', example: '1', description: '판매 번호' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/saleItemDetail/:saleId')
  async saleItemDetail(@Req() req, @Param('saleId') saleId) {
    const userId = req.user.userId;
    return await this.queryBus.execute(
      new SaleItemDetailCommand(userId, saleId),
    );
  }
}
