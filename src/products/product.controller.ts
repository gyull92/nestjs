import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
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
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { PostProductDto } from './dto/post-product.dto';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { UpdateProductDto } from './dto/update-product.ts';
import { GetProductCommand } from './commands/get-product.command';

@Controller('product')
export class ProductController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @ApiTags('product')
  @ApiOperation({ summary: '상품조회' })
  @ApiParam({ name: 'productId', example: '1', description: '상품 id' })
  @Get('/:productId')
  async getProduct(@Param('productId') productId) {
    return await this.queryBus.execute(new GetProductCommand(productId));
  }

  @ApiTags('product')
  @ApiOperation({ summary: '상품등록' })
  @ApiBody({ type: PostProductDto })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('/postProduct')
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
  @ApiParam({ name: 'productId', example: '1' })
  @ApiBody({ type: UpdateProductDto })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('/update/:productId')
  async updateProduct(
    @Req() req,
    @Param('productId') productId,
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
  @ApiParam({ name: 'productId', example: '1' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('/delete/:productId')
  async deleteProduct(@Req() req, @Param('productId') productId) {
    const userId = req.user.userId;
    return await this.commandBus.execute(
      new DeleteProductCommand(userId, productId),
    );
  }
}
