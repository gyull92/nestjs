import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ProfileUpdateDto {

    @ApiPropertyOptional({ example: null })
    @IsString()
    image: string;

    @ApiPropertyOptional({ example: '자기소개' })
    @IsString()
    myself: string;
}