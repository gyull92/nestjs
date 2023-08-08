import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class PasswordchangeDto {

    @ApiPropertyOptional({
        description: '변경할 비밀번호',
        example: 'qwe123'
    })
    @IsNotEmpty()
    @IsString()
    password: string;
}