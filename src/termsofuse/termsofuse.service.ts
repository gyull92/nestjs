import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TermsOfUse } from 'src/entites/termsofuse.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TermsOfUseService {
    constructor(@InjectRepository(TermsOfUse) private readonly termsOfUseRepository: Repository<TermsOfUse>) { }

    async insertTerms(req, agreeInfo) {
        const userId = req.user.userId;
        const { terms, location, accept } = agreeInfo;

        try {
            return await this.termsOfUseRepository
                .createQueryBuilder()
                .insert()
                .into('TermsOfUse')
                .values([
                    {
                        terms: terms,
                        location: location,
                        accept: accept,
                        User: userId,
                    }
                ])
                .execute();
        } catch (e) {
            console.log(e);
            throw new UnauthorizedException();
        }
    }

    async getTerms(req) {
        const userId = req.user.userId;

        try {
            return await this.termsOfUseRepository
                .createQueryBuilder()
                .select('termsofuses')
                .from(TermsOfUse, 'termsofuses')
                .where('termsofuses.userId= :userId', { userId: userId })
                .getOne();
        } catch (e) {
            console.log(e);
            throw new UnauthorizedException();
        }
    }

    async updateTerms(req, agreeInfo) {
        const userId = req.user.userId;
        const { terms, location, accept } = agreeInfo;

        try {
            return await this.termsOfUseRepository
                .createQueryBuilder()
                .update(TermsOfUse)
                .set({ terms: terms, location: location, accept: accept })
                .where('User= :userId', { userId: userId })
                .execute();
        } catch (e) {
            console.log(e);
            throw new UnauthorizedException();
        }
    }
}
