import { QueryHandler, UnhandledExceptionBus } from '@nestjs/cqrs';
import { GetMyOrderCommand } from '../commands/get-my-order.command';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@QueryHandler(GetMyOrderCommand)
export class GetMyOrderHandler {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async execute(command: GetMyOrderCommand) {
    const { userId } = command;

    try {
      return await this.userRepository
        .createQueryBuilder()
        .relation(User, 'Product')
        .of({ id: userId })
        .loadOne();
    } catch (e) {
      console.log(e);
      throw new UnhandledExceptionBus();
    }
  }
}
