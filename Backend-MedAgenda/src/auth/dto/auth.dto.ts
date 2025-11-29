import { IsEmail, IsLowercase, IsNotEmpty, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto {
    @ApiProperty({
        description: 'User email address used to log in. Must match a registered account.',
        example: 'jane.doe@example.com',
    })
    @IsNotEmpty()
    @IsEmail()
    @IsLowercase()
    email: string;

    @ApiProperty({
        description: 'User password associated with the account.',
        example: 'P@ssw0rd!',
        minLength: 6,
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;
}

export class LoginResponseDto {
    @ApiProperty({
        description: 'JWT bearer token to authenticate subsequent requests.',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    })
    token: string;

    @ApiProperty({
        description: 'Indicates if the authenticated user is an admin in any clinic.',
        example: true,
    })
    isAdmin: boolean;

    @ApiProperty({
        description: 'Indicates if the authenticated user is a doctor in any clinic.',
        example: false,
    })
    isDoctor: boolean;
}
