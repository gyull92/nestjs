import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserCommand } from './commands/create-user.command';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserCommand } from './commands/update-user.command';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { PasswordChangeDto } from './dto/password-change.dto';
import { PasswordChangeCommand } from './commands/password-change.command';
import { SignInUserCommand } from './commands/sign-in-user.command';
import { GetProfileCommand } from './commands/get-profile.command';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { GetMyOrderCommand } from './commands/get-my-order.command';

@Controller('user')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @ApiTags('user')
  @ApiOperation({ summary: '로그인' })
  @ApiBody({ type: SignInUserDto })
  @Post('/entry')
  async loginUser(@Body() userInfo: SignInUserCommand) {
    return this.commandBus.execute(
      new SignInUserCommand(userInfo.userId, userInfo.password),
    );
  }

  @ApiTags('user')
  @ApiOperation({ summary: '회원가입' })
  @ApiBody({ type: CreateUserDto })
  @Post('/account')
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
  @Patch('/change')
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
