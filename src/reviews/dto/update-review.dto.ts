import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdateReviewDto {
  @ApiPropertyOptional({
    description: '수정할 리뷰 내용',
    example: '수정본입니다',
  })
  @IsString()
  content: string;

  @ApiPropertyOptional({ description: '수정할 별점', example: '6' })
  @IsNumber()
  star: number;
}
