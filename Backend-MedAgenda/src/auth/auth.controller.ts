import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginResponseDto, LoginUserDto } from './dto/auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @ApiOperation({ summary: 'Authenticate a user and return a JWT.' })
    @ApiBody({ type: LoginUserDto })
    @ApiOkResponse({ description: 'Login succeeded.', type: LoginResponseDto })
    @Post('login')
    async login(@Body() dto: LoginUserDto): Promise<LoginResponseDto> {
        return await this.authService.login(dto);
    }
    
}
