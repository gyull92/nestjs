import { QueryHandler } from '@nestjs/cqrs';
import { GetProfileCommand } from '../commands/get-profile.command';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { UnauthorizedException } from '@nestjs/common';

@QueryHandler(GetProfileCommand)
export class GetProfileHandler {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async execute(command: GetProfileCommand) {
    const { userId } = command;

    try {
      return this.userRepository
        .createQueryBuilder()
        .select('users.userId, users.name, users.phone, users.address')
        .from(User, 'users')
        .where('users.id = :userId', { userId })
        .getRawOne();
    } catch (e) {
      throw new UnauthorizedException('프로필 조회 실패');
    }
  }
}
