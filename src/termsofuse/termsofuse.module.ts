import { Module } from '@nestjs/common';
import { TermsofuseController } from './termsofuse.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TermsOfUse } from 'src/entites/termsofuse.entity';
import { TermsOfUseService } from './termsofuse.service';

@Module({
  imports: [TypeOrmModule.forFeature([TermsOfUse])],
  controllers: [TermsofuseController],
  providers: [TermsOfUseService],
})
export class TermsofuseModule { }
