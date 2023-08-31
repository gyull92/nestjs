import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginedUserDto {
  @ApiPropertyOptional({ description: '아이디', example: 'orange' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiPropertyOptional({ description: '비밀번호', example: '1234' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
