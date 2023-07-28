import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UserRegisterPayload {
    @ApiPropertyOptional({ example: '홍길동' })
    @IsNotEmpty()
    @IsString()
    name: Number;

    @ApiPropertyOptional({ example: 'qwe123' })
    @IsNotEmpty()
    @IsString()
    password: String;

    @ApiPropertyOptional({ example: '010-1234-1234' })
    @IsNumber()
    phone: number;

    @ApiPropertyOptional({ example: '부산광역시 사하구 신평동' })
    @IsString()
    address: string;

    @ApiPropertyOptional({ example: 'qwe@naver.com' })
    @IsString()
    email: string;

    @ApiPropertyOptional({ example: '닉네임' })
    @IsNotEmpty()
    @IsString()
    nickname: string;
}