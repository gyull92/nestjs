import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/entites/profile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {
    constructor(@InjectRepository(Profile) private readonly profileRepository: Repository<Profile>) { }

    async profileUpdate(req, profileInfo) {
        const userId = req.user.userId;
        const { image, myself } = profileInfo;

        try {
            return await this.profileRepository
                .createQueryBuilder()
                .update(Profile)
                .set({ image: image, myself: myself })
                .where('User = :id', { id: userId })
                .execute();
        } catch (e) {
            console.log(e);
            throw new UnauthorizedException();
        }
    }

    async getProfile(req) {
        const userId = req.user.userId;

        try {
            return await this.profileRepository
                .createQueryBuilder()
                .select('Profiles')
                .from(Profile, 'Profiles')
                .where('User = :id', { id: userId })
                .getOne();
        } catch (e) {
            throw new UnauthorizedException();
        }
    }

//     async getSubscripber(req) {
//         const userId = req.user.userId;

//         try {
//             return await this.profileRepository
//                 .createQueryBuilder()
//                 .select('profiles')
//                 .from(Profile, 'profiles')
//                 .where('User = :id', { id: userId })
//                 .getOne();
//         } catch (e) {
//             console.log(e);
//             throw new UnauthorizedException();
//         }
//     }
}
