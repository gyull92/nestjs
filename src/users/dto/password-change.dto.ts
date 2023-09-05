import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PasswordChangeDto {
  @ApiPropertyOptional({ description: '변경할 비밀번호', example: '12345' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
