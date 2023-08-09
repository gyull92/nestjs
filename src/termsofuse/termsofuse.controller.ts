import { Body, Controller, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { TermsOfUseService } from './termsofuse.service';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { TermsOfUseDto } from './dto/terms-of-use-dto';

@Controller('termsofuse')
export class TermsofuseController {
    constructor(private readonly termsOfUseService: TermsOfUseService) { }

    @ApiTags('Terms Of Use')
    @ApiOperation({ summary: '이용약관 동의 정보 불러오기' })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get()
    async getTerms(@Req() req) {
        return await this.termsOfUseService.getTerms(req);
    }

    @ApiTags('Terms Of Use')
    @ApiOperation({ summary: '이용약관 동의하기' })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiBody({ type: TermsOfUseDto })
    @ApiOkResponse({ type: TermsOfUseDto })
    @Post('/insert')
    async insertTerms(@Req() req, @Body() agreeInfo: TermsOfUseDto) {
        return await this.termsOfUseService.insertTerms(req, agreeInfo);
    }

    @ApiTags('Terms Of Use')
    @ApiOperation({ summary: '이용약관 동의사항 변경하기' })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiBody({ type: TermsOfUseDto })
    @ApiOkResponse({ type: TermsOfUseDto })
    @Put('/update')
    async updateTerms(@Req() req, @Body() agreeInfo: TermsOfUseDto) {
        return await this.termsOfUseService.updateTerms(req, agreeInfo);
    }
}
