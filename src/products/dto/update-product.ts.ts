import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateProductDto {
  @ApiPropertyOptional({ description: '상품명', example: '핫바' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: '상품 설명', example: '짱맛' })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiPropertyOptional({ description: '상품 가격', example: '1000' })
  @IsNumber()
  price: number;
}
