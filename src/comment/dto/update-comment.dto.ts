import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCommentDto {
  @ApiPropertyOptional({description:'댓글 내용', example: '댓글'})
  @IsString()
  @IsNotEmpty()
  content: string;
}
