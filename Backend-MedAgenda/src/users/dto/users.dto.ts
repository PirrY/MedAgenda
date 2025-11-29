import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, Length, MaxLength, MinLength } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({
        description: 'First name of the user.',
        example: 'Jane',
    })
    @IsNotEmpty()
    @IsString()
    first_name: string;

    @ApiPropertyOptional({
        description: 'Optional middle name of the user.',
        example: 'Alexandra',
        nullable: true,
    })
    @IsOptional()
    @IsString()
    second_name?: string | null;

    @ApiProperty({
        description: 'First last name / surname of the user.',
        example: 'Doe',
    })
    @IsNotEmpty()
    @IsString()
    first_last_name: string;

    @ApiProperty({
        description: 'Second last name / surname of the user.',
        example: 'Smith',
    })
    @IsNotEmpty()
    @IsString()
    second_last_name: string;

    @ApiProperty({
        description: 'Legal identification number (10 characters).',
        example: '1234567890',
        minLength: 10,
        maxLength: 10,
    })
    @IsNotEmpty()
    @IsString()
    @Length(10,10)
    legal_id: string;

    @ApiProperty({
        description: 'Contact phone number with country code.',
        example: '+50371001234',
    })
    @IsNotEmpty()
    @IsPhoneNumber()
    user_phone_number: string;

    @ApiProperty({
        description: 'Email address that will be used to sign in.',
        example: 'jane.doe@example.com',
    })
    @IsNotEmpty()
    @IsEmail()
    user_email_address: string;

    @ApiProperty({
        description: 'Account password (minimum 6 characters).',
        example: 'P@ssw0rd!',
        minLength: 6,
    })
    @IsNotEmpty()
    @MinLength(6)
    password: string;
    
}
