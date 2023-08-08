import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserRegisterPayload {
    @ApiPropertyOptional({ example: '홍길동' })
    @IsNotEmpty()
    @IsString()
    name: number;

    @ApiPropertyOptional({ example: 'qwe123' })
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiPropertyOptional({ example: '010-1234-1234' })
    @IsString()
    phone: string;

    @ApiPropertyOptional({ example: '부산광역시 사하구 신평동' })
    @IsString()
    address: string;

    @ApiPropertyOptional({ example: 'qwe@naver.com' })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiPropertyOptional({ example: '닉네임' })
    @IsNotEmpty()
    @IsString()
    nickname: string;
}