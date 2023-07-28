import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) { }

    async signIn(email, pass) {
        const userData = await this.userService.signIn(email);
        const isMatch = await bcrypt.compare(userData.password, pass);
        if (!isMatch) {
            throw new UnauthorizedException('email 혹은 비밀번호가 틀립니다');
        }
        console.log(654654)
        const payload = { sub: userData.id, username: userData.name };
        console.log(payload,"paylo")
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
