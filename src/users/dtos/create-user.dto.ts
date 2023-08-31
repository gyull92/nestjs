import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiPropertyOptional({ description: '아이디', example: 'orange' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiPropertyOptional({ description: '비밀번호', example: '1234' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiPropertyOptional({ description: '이름', example: '홍길동' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ description: '연락처', example: '010-1234-1234' })
  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;

  @ApiPropertyOptional({ description: '주소', example: '부산' })
  @IsString()
  @IsNotEmpty()
  address: string;
}
