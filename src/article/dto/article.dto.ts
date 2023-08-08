import { IsString } from "class-validator";

export class ArticleInfo {

    @IsString()
    title: string;

    @IsString()
    content: string;
}