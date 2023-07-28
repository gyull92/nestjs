import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
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
        console.log(name, hashedPassword, phone, address, email, nickname)
        try {
            await this.userRepository.insert({ name, password: hashedPassword, phone, address, email, nickname });
        } catch (e) {
            throw new ConflictException('이미 가입된 번호이거나 email입니다.');
            console.log(e)
        }
    }

    async signIn(email) {
        const userData = await this.userRepository.findOne({ where: { email: email } });
        return userData
    }
}
