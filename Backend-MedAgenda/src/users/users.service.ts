import { ConflictException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/db/database.service';
import * as AuthHelpers from 'src/auth/repo/helpers';
import * as UserReads from './repo/reads';
import * as UserWrites from './repo/writes';
import { CreateUserDto } from './dto/users.dto';

@Injectable()
export class UsersService {
    constructor(private readonly db: DatabaseService){}

    async createUser(dto: CreateUserDto): Promise<void> {
        if(await UserReads.existsByEmail(this.db,dto.user_email_address)) throw new ConflictException('User already exists');
        dto.password = await AuthHelpers.hashPassword(dto.password);
        if(dto.second_name === undefined) dto.second_name = null;
        await UserWrites.insertUser(this.db, dto);
    }

}
