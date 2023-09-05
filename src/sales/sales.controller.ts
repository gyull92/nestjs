import {
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { SalesListCommand } from './commands/sales-list.command';
import { BuyProductCommand } from './commands/buy-product.command';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { MyProductListCommand } from './commands/my-product-list.command';
import { SaleItemDetailCommand } from './commands/sale-item-detail.command';
import { StarCountCommand } from './commands/star-count-command';
import RoleGuard from 'src/auth/guard/roles.guard';
import Role from 'src/entities/enum/user.role.enum';

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
  @ApiQuery({ name: 'productId', example: 1, description: '상품 id' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('/buyItem')
  async buyItem(@Req() req, @Query('productId') productId: number) {
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
  @ApiQuery({ name: 'saleId', example: 1, description: '판매 id' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/saleItemDetail')
  async saleItemDetail(@Req() req, @Query('saleId') saleId: number) {
    const userId = req.user.userId;
    return await this.queryBus.execute(
      new SaleItemDetailCommand(userId, saleId),
    );
  }

  @ApiTags('sales')
  @ApiOperation({ summary: '상품별 별점 조회' })
  @ApiQuery({ name: 'productId', example: 1, description: '상품 id' })
  @ApiBearerAuth()
  @UseGuards(RoleGuard(Role.Seller))
  @Get('/starCount')
  async starCount(@Req() req, @Query('productId') productId: number) {
    const userId = req.user.userId;
    return await this.queryBus.execute(new StarCountCommand(userId, productId));
  }
}
