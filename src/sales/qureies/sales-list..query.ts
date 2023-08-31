import { QueryHandler } from '@nestjs/cqrs';
import { SalesListCommand } from '../commands/sales-list.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UnauthorizedException } from '@nestjs/common';
import { Sales } from 'src/entities/sales.entity';

@QueryHandler(SalesListCommand)
export class SalesListHandler {
  constructor(
    @InjectRepository(Sales)
    private readonly salesRepository: Repository<Sales>,
  ) {}

  async execute(command: SalesListCommand) {
    const { userId } = command;

    try {
      return await this.salesRepository
        .createQueryBuilder()
        .select('sale')
        .from(Sales, 'sale')
        .where('sale.sellerId = :userId', { userId })
        .getMany();
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException('판매목록 조회 실패');
    }
  }
}
