import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class InfoChanege {

    @ApiPropertyOptional({ description: '이름', example: '김아무개' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiPropertyOptional({ description: '연락처', example: '010-1234-4321' })
    @IsNotEmpty()
    @IsPhoneNumber()
    phone: string;

    @ApiPropertyOptional({ description: '주소', example: '서울특별시 강남구' })
    @IsNotEmpty()
    @IsString()
    address: string;

    @ApiPropertyOptional({ description: '이메일', example: 'asd@naver.com' })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiPropertyOptional({ description: '닉네임', example: '닉네임!' })
    @IsNotEmpty()
    @IsString()
    nickname: string;
}