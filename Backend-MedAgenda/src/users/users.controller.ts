import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/users.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService){}

    @ApiOperation({ summary: 'Register a new user account.' })
    @ApiBody({ type: CreateUserDto })
    @ApiCreatedResponse({ description: 'User successfully registered.' })
    @Post('register')
    async register(@Body() dto: CreateUserDto): Promise<void> {
        return await this.userService.createUser(dto);
    }
    
}
