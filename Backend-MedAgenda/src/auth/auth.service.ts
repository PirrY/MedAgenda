import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from 'src/db/database.service';
import { LoginUserDto } from './dto/auth.dto';
import * as UserReads from 'src/users/repo/reads';
import * as AuthHelpers from './repo/helpers';

@Injectable()
export class AuthService {
    constructor(private readonly db: DatabaseService, private readonly jwtService: JwtService){}

    async login(dto: LoginUserDto): Promise<{token: string}> {
        if(!await UserReads.existsByEmail(this.db, dto.email)) throw new NotFoundException(`User doesn't exist. Please register first.`);
        const usr = await this.db.query<{password_hash: string, user_id: number}>('SELECT password_hash, user_id FROM users WHERE user_email_address = ?',[dto.email.toLowerCase()]);
        if(!await AuthHelpers.comparePasswords(dto.password, usr[0]!.password_hash)) throw new UnauthorizedException('Passwords do not match.');
        const token = (this.signToken({sub: usr[0]!.user_id, email: dto.email}));
        return {token: token};
    }

    signToken(payload: { sub: number; email: string }): string {
        return this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET,
            expiresIn: '7d',
        });
    }
    
}
