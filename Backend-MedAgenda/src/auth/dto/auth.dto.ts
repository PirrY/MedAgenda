import { IsEmail, IsLowercase, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginUserDto {
    @IsNotEmpty()
    @IsEmail()
    @IsLowercase()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;
}