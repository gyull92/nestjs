import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean } from "class-validator";

export class TermsOfUseDto {

    @ApiPropertyOptional({
        description: '0: 동의 1: 미동의',
        example: '1'
    })
    @IsBoolean()
    terms: boolean;

    @ApiPropertyOptional({
        description: '0: 동의 1: 미동의',
        example: '1'
    })
    @IsBoolean()
    address: boolean;

    @ApiPropertyOptional({
        description: '0: 동의 1: 미동의',
        example: '1'
    })
    @IsBoolean()
    accept: boolean;
}