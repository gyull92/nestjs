import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateReviewDto {
  @ApiPropertyOptional({ description: '리뷰내용', example: '내용' })
  @IsString()
  content: string;

  @ApiPropertyOptional({ description: '별점, 0~10', example: '3' })
  @IsNumber()
  star: number;
}
