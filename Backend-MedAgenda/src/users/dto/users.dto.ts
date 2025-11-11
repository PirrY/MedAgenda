import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, Length, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    first_name: string;

    @IsOptional()
    @IsString()
    second_name?: string | null;

    @IsNotEmpty()
    @IsString()
    first_last_name: string;

    @IsNotEmpty()
    @IsString()
    second_last_name: string;

    @IsNotEmpty()
    @IsString()
    @Length(10,10)
    legal_id: string;

    @IsNotEmpty()
    @IsPhoneNumber()
    user_phone_number: string;

    @IsNotEmpty()
    @IsEmail()
    user_email_address: string;

    @IsNotEmpty()
    @MinLength(6)
    password: string;
    
}