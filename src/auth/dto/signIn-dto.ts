import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class SignInDto {

    @ApiPropertyOptional({
        example: 'qwe@naver.com',
    })
    @IsNotEmpty()
    @IsString()
    email: string;

    @ApiPropertyOptional({
        example: 'qwe123'
    })
    @IsNotEmpty()
    @IsString()
    password: string;
}