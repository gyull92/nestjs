import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserDto } from './dtos/create-user.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserCommand } from './commands/create-user.command';
import { LoginedUserDto } from './dtos/login-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UpdateUserCommand } from './commands/update-user.command';
import { AuthGuard } from 'src/guard/auth.guard';
import { PasswordChangeDto } from './dtos/password-change.dto';
import { PasswordChangeCommand } from './commands/password-change.command';
import { LoginedUserCommand } from './commands/login-user.command';
import { GetProfileCommand } from './commands/get-profile.command';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { GetMyOrderCommand } from './commands/get-my-order.command';

@Controller('user')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @ApiTags('user')
  @ApiOperation({ summary: '로그인' })
  @ApiBody({ type: LoginedUserDto })
  @Post('/isLogin')
  async loginUser(@Body() userInfo: LoginedUserCommand) {
    return this.commandBus.execute(
      new LoginedUserCommand(userInfo.userId, userInfo.password),
    );
  }

  @ApiTags('user')
  @ApiOperation({ summary: '회원가입' })
  @ApiBody({ type: CreateUserDto })
  @Post('/create')
  async createUser(@Body() createUserDto: CreateUserCommand) {
    return this.commandBus.execute(
      new CreateUserCommand(
        createUserDto.userId,
        createUserDto.password,
        createUserDto.name,
        createUserDto.phone,
        createUserDto.address,
      ),
    );
  }

  @ApiTags('user')
  @ApiOperation({ summary: '유저정보 수정' })
  @ApiBody({ type: UpdateUserDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Put('/update')
  async updateUser(@Req() req, @Body() updateUserDto: UpdateUserCommand) {
    const userId = req.user.userId;

    return this.commandBus.execute(
      new UpdateUserCommand(
        userId,
        updateUserDto.name,
        updateUserDto.phone,
        updateUserDto.address,
      ),
    );
  }

  @ApiTags('user')
  @ApiOperation({ summary: '비밀번호 변경' })
  @ApiBody({ type: PasswordChangeDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Put('/passwordChange')
  async passwordChange(
    @Req() req,
    @Body() passwordChangeDto: PasswordChangeDto,
  ) {
    const userId = req.user.userId;

    return this.commandBus.execute(
      new PasswordChangeCommand(userId, passwordChangeDto.password),
    );
  }

  @ApiTags('user')
  @ApiOperation({ summary: '프로필 조회' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('/myProfile')
  async getProfile(@Req() req) {
    const userId = req.user.userId;
    return this.queryBus.execute(new GetProfileCommand(userId));
  }

  @ApiTags('user')
  @ApiOperation({ summary: '구매내역 조회' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/myOrderList')
  async getMyOrderList(@Req() req) {
    const userId = req.user.userId;
    return this.queryBus.execute(new GetMyOrderCommand(userId));
  }
}
