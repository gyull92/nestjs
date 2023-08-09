import { Body, Controller, Delete, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserRegisterPayload } from './interface/user.register.payload';
import { PasswordchangeDto } from './interface/user.password.change';
import { InfoChanege } from './interface/user.info.change';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @ApiTags('user')
    @ApiOperation({ summary: '회원가입' })
    @ApiOkResponse({ type: UserRegisterPayload, description: '회원가입' })
    @ApiBody({ type: UserRegisterPayload })
    @Post('/register')
    async userRegister(@Body() userInfo: String) {
        return await this.userService.userRegister(userInfo)
    }

    @ApiTags('user')
    @ApiOperation({ summary: '회원정보 수정' })
    @ApiBody({ type: InfoChanege })
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Put('/update')
    async updateUser(@Req() req, @Body() userinfo: UserRegisterPayload) {
        return await this.userService.updateUser(req, userinfo);
    }

    @ApiTags('user')
    @ApiOperation({ summary: '비밀번호 변경' })
    @ApiBody({ type: PasswordchangeDto })
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Put('/changePass')
    async changePassword(@Req() req, @Body() password: string) {
        return await this.userService.changePassword(req, password);
    }

    @ApiTags('user')
    @ApiOperation({ summary: '회원탈퇴' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Delete('/withdrawal')
    async withdrawal(@Req() req) {
        return await this.userService.withdrawal(req);
    }
}
