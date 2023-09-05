import { CommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInUserCommand } from '../commands/sign-in-user.command';

@CommandHandler(SignInUserCommand)
export class SignInUserHandler {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async execute(userInfo: SignInUserCommand) {
    const { userId, password } = userInfo;
    const userData = await this.userData(userId);
    const isMatch = await bcrypt.compare(password, userData.password);

    if (!isMatch) {
      throw new UnauthorizedException('ID 혹은 비밀번호가 틀립니다.');
    }

    const payload = { userId: userData.id, role: userData.role };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async userData(userId) {
    try {
      return await this.userRepository
        .createQueryBuilder()
        .select('users')
        .from(User, 'users')
        .where('users.userId = :userId', { userId })
        .getOne();
    } catch (e) {
      throw new UnauthorizedException('로그인 실패');
    }
  }
}
