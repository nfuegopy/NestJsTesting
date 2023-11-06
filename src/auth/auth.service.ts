import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    // en auth.service.ts
    async validateUser(username: string, password?: string): Promise<any> {
        const user = await this.usersService.findOneByUsername(username);
        if (!user) {
            return null;
        }
        if (password) {
            const isPasswordMatching = await bcrypt.compare(password, user.password);
            if (!isPasswordMatching) {
                return null;
            }
        }
        const { password: _, ...result } = user;
        return result;
    }


    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
