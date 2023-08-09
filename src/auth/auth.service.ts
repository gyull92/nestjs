import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) { }

    async signIn(email, pass) {
        const userData = await this.userService.signIn(email);
        const isMatch = await bcrypt.compare(pass, userData.password);

        if (!isMatch) {
            throw new UnauthorizedException('email 혹은 비밀번호가 틀립니다');
        }
        const payload = { userId: userData.id, username: userData.name };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
