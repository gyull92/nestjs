import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { DeleteProductCommand } from './commands/delete-product.command';
import { UpdateProductCommand } from './commands/update-product.command';
import { PostProductCommand } from './commands/post-product.command';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { PostProductDto } from './dto/post-product.dto';
import { UpdateProductDto } from './dto/update-product.ts';
import { GetProductCommand } from './commands/get-product.command';
import RoleGuard from 'src/auth/guard/roles.guard';
import Role from 'src/entities/enum/user.role.enum';

@Controller('product')
export class ProductController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @ApiTags('product')
  @ApiOperation({ summary: '상품조회' })
  @ApiQuery({ name: 'productId', example: 1, description: '상품 id' })
  @Get('/item')
  async getProduct(@Query('productId') productId: number) {
    return await this.queryBus.execute(new GetProductCommand(productId));
  }

  @ApiTags('product')
  @ApiOperation({ summary: '상품등록' })
  @ApiBody({ type: PostProductDto })
  @ApiBearerAuth()
  @UseGuards(RoleGuard(Role.Seller))
  @Post('/newProduct')
  async postProduct(@Req() req, @Body() productInfo: PostProductCommand) {
    const userId = req.user.userId;
    return await this.commandBus.execute(
      new PostProductCommand(
        userId,
        productInfo.name,
        productInfo.content,
        productInfo.price,
      ),
    );
  }

  @ApiTags('product')
  @ApiOperation({ summary: '상품 수정' })
  @ApiQuery({ name: 'productId', example: 1, description: '수정할 상품 id' })
  @ApiBody({ type: UpdateProductDto })
  @ApiBearerAuth()
  @UseGuards(RoleGuard(Role.Seller))
  @Patch()
  async updateProduct(
    @Req() req,
    @Query('productId') productId: number,
    @Body() productInfo: UpdateProductCommand,
  ) {
    const userId = req.user.userId;
    return await this.commandBus.execute(
      new UpdateProductCommand(
        userId,
        productId,
        productInfo.name,
        productInfo.content,
        productInfo.price,
      ),
    );
  }

  @ApiTags('product')
  @ApiOperation({ summary: '상품삭제' })
  @ApiQuery({ name: 'productId', example: 1, description: '삭제할 상품 id' })
  @ApiBearerAuth()
  @UseGuards(RoleGuard(Role.Seller))
  @Delete()
  async deleteProduct(@Req() req, @Query('productId') productId: number) {
    const userId = req.user.userId;
    return await this.commandBus.execute(
      new DeleteProductCommand(userId, productId),
    );
  }
}
