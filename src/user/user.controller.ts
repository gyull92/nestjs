import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserRegisterPayload } from './interface/user.register.payload';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @ApiTags('user')
    @ApiOperation({ summary: '회원가입' })
    @ApiOkResponse({ type: UserRegisterPayload, description: '회원가입' })
    @ApiBody({ type: UserRegisterPayload })
    @Post('user/register')
    async userRegister(@Body() userInfo: String) {
        return await this.userService.userRegister(userInfo)
    }
}
