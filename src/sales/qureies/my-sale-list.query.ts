import { QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Sales } from 'src/entities/sales.entity';
import { MyProductListCommand } from '../commands/my-product-list.command';
import { Repository } from 'typeorm';
import { UnauthorizedException } from '@nestjs/common';

@QueryHandler(MyProductListCommand)
export class MyProductListHandler {
  constructor(
    @InjectRepository(Sales)
    private readonly saleRepository: Repository<Sales>,
  ) {}

  async execute(command: MyProductListCommand) {
    const userId = command.userId;

    try {
      return await this.saleRepository
        .createQueryBuilder()
        .select('sale')
        .from(Sales, 'sale')
        .where('sale.sellerId = :userId', { userId })
        .getMany();
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException(e);
    }
  }
}
