import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateArticleDto {
  @ApiPropertyOptional({ description: '게시글 제목', example: '제목' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({ description: '게시글 내용', example: '내용' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiPropertyOptional({ description: '이미지' })
  @IsString()
  image: string;
}
