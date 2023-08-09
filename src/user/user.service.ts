import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/entites/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) { }

    async userRegister(userInfo) {
        const { name, password, phone, address, email, nickname } = userInfo;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        try {
            return await this.userRepository
                .createQueryBuilder()
                .insert()
                .into(User)
                .values({ name: name, password: hashedPassword, phone: phone, address: address, email: email, nickname: nickname })
                .execute();
        } catch (e) {
            console.log(e);
            throw new UnauthorizedException('이미 가입된 번호이거나 email입니다.');
        }
    }

    async updateUser(req, userInfo) {
        const userId = req.user.userId;
        const { name, phone, address, email, nickname } = userInfo;

        try {
            return await this.userRepository
                .createQueryBuilder()
                .update(User)
                .set({ name: name, phone: phone, address: address, email: email, nickname: nickname })
                .where('id = :userId', { userId: userId })
                .execute();
        } catch (e) {
            console.log(e);
            throw new UnauthorizedException();
        }
    }

    async changePassword(req, password) {
        const userId = req.user.userId
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        try {
            return await this.userRepository
                .createQueryBuilder()
                .update(User)
                .set({ password: hashedPassword })
                .where('id = :userId', { userId: userId })
                .execute();
        } catch (e) {
            console.log(e);
            throw new UnauthorizedException();
        }
    }

    async withdrawal(req) {
        const userId = req.user.userId;

        try {
            return await this.userRepository
                .createQueryBuilder()
                .delete()
                .from(User)
                .where('id = :userId', { userId: userId })
                .execute();
        } catch (e) {
            console.log(e);
            throw new UnauthorizedException();
        }
    }

    async signIn(email) {
        const userData = await this.userRepository.findOne({ where: { email: email } });

        return userData;
    }
}
