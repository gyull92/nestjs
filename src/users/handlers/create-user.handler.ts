import { CommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../commands/create-user.command';
import { User } from 'src/entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async execute(command: CreateUserCommand) {
    const { userId, password, name, phone, address } = command;
    const salt = await bcrypt.genSalt();
    const hashedPaaword = await bcrypt.hash(password, salt);
    try {
      return this.userRepository
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          userId: userId,
          password: hashedPaaword,
          name: name,
          phone: phone,
          address: address,
        })
        .execute();
    } catch (e) {
      throw new UnauthorizedException('회원가입에 실패하였습니다');
    }
  }
}
