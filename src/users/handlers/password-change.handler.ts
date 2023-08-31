import { CommandHandler } from '@nestjs/cqrs';
import { PasswordChangeCommand } from '../commands/password-change.command';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';

@CommandHandler(PasswordChangeCommand)
export class PasswordChangeHandler {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async execute(userInfo: PasswordChangeCommand) {
    const { userId, password } = userInfo;
    const salt = await bcrypt.genSalt();
    const hashedPaaword = await bcrypt.hash(password, salt);

    try {
      return this.userRepository
        .createQueryBuilder()
        .update(User)
        .set({ password: hashedPaaword })
        .where('id = :userId', { userId: userId })
        .execute();
    } catch (e) {
      throw new UnauthorizedException('비밀번호 변경 실패');
    }
  }
}
