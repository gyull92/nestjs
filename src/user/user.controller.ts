import { Body, Controller, Delete, Param, Post, Put, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserRegisterPayload } from './interface/user.register.payload';
import { PasswordchangeDto } from './interface/user.password.change';
import { InfoChanege } from './interface/user.info.change';

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
    @ApiParam({ name: 'userId', example: '1' })
    @ApiBody({ type: InfoChanege })
    @ApiBearerAuth()
    @Put('/update/:userId')
    async updateUser(@Req() req, @Param('userId') userId: number, @Body() userinfo: UserRegisterPayload) {
        return await this.userService.updateUser(req, userId, userinfo);
    }

    @ApiTags('user')
    @ApiOperation({ summary: '비밀번호 변경' })
    @ApiParam({ name: 'userId', example: '1' })
    @ApiBody({ type: PasswordchangeDto })
    @Put('/changePass/:userId')
    async changePassword(@Param('userId') userId: number, @Body() password: string) {
        return await this.userService.changePassword(userId, password);
    }

    @ApiTags('user')
    @ApiOperation({ summary: '회원탈퇴' })
    @ApiParam({ name: 'userId', example: '1' })
    @Delete('/withdrawal/:userId')
    async withdrawal(@Param('userId') userId: number) {
        return await this.userService.withdrawal(userId);
    }
}
