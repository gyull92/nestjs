import { CommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { UpdateUserCommand } from '../commands/update-user.command';
import { UnauthorizedException } from '@nestjs/common';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async execute(userInfo: UpdateUserCommand) {
    const { userId, name, phone, address } = userInfo;

    try {
      return this.userRepository
        .createQueryBuilder()
        .update(User)
        .set({ name: name, phone: phone, address: address })
        .where('id = :userId', { userId: userId })
        .execute();
    } catch (e) {
      throw new UnauthorizedException('회원 정보 수정 실패');
    }
  }
}
