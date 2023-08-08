import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBadRequestResponse, ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dto/signIn-dto';
import { AuthGuard } from './guard/auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @ApiTags('user')
    @ApiOperation({ summary: '로그인' })
    @ApiBody({ type: SignInDto })
    @ApiOkResponse({ description: '로그인 성공' })
    @ApiBadRequestResponse({ description: '로그인 실패' })
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>) {
        return this.authService.signIn(signInDto.email, signInDto.password);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
