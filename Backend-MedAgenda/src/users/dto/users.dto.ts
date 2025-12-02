import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, Length, MaxLength, MinLength, IsDateString, IsEnum, IsIn } from "class-validator";
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
        description: 'Legal identification number (5-15 characters).',
        example: '1234567890',
        minLength: 5,
        maxLength: 15,
    })
    @IsNotEmpty()
    @IsString()
    @Length(5,15)
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

    @ApiPropertyOptional({
        description: 'Birth date of the user.',
        example: '1990-05-15',
    })
    @IsOptional()
    @IsDateString()
    birth_date?: string;

    @ApiPropertyOptional({
        description: 'Gender of the user.',
        example: 'M',
        enum: ['M', 'F', 'O'],
    })
    @IsOptional()
    @IsIn(['M', 'F', 'O'])
    gender?: 'M' | 'F' | 'O';

    @ApiPropertyOptional({
        description: 'Address of the user.',
        example: 'Calle 123 #45-67',
    })
    @IsOptional()
    @IsString()
    address?: string;

    @ApiPropertyOptional({
        description: 'City of the user.',
        example: 'Bogotá',
    })
    @IsOptional()
    @IsString()
    city?: string;

    @ApiPropertyOptional({
        description: 'State/Department of the user.',
        example: 'Cundinamarca',
    })
    @IsOptional()
    @IsString()
    state?: string;

    @ApiPropertyOptional({
        description: 'Country of the user.',
        example: 'Colombia',
    })
    @IsOptional()
    @IsString()
    country?: string;

    @ApiPropertyOptional({
        description: 'Emergency contact name.',
        example: 'María Pérez',
    })
    @IsOptional()
    @IsString()
    emergency_contact_name?: string;

    @ApiPropertyOptional({
        description: 'Emergency contact phone number.',
        example: '+57 310 987 6543',
    })
    @IsOptional()
    @IsString()
    emergency_contact_phone?: string;

}

export class UpdateProfileDto {
    @ApiPropertyOptional({
        description: 'First name of the user.',
        example: 'Jane',
    })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    first_name?: string;

    @ApiPropertyOptional({
        description: 'Optional middle name of the user.',
        example: 'Alexandra',
        nullable: true,
    })
    @IsOptional()
    @IsString()
    second_name?: string | null;

    @ApiPropertyOptional({
        description: 'First last name / surname of the user.',
        example: 'Doe',
    })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    first_last_name?: string;

    @ApiPropertyOptional({
        description: 'Second last name / surname of the user.',
        example: 'Smith',
    })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    second_last_name?: string;

    @ApiPropertyOptional({
        description: 'Contact phone number with country code.',
        example: '+50371001234',
    })
    @IsOptional()
    @IsPhoneNumber()
    user_phone_number?: string;

    @ApiPropertyOptional({
        description: 'Birth date of the user.',
        example: '1990-05-15',
    })
    @IsOptional()
    @IsDateString()
    birth_date?: string;

    @ApiPropertyOptional({
        description: 'Gender of the user.',
        example: 'M',
        enum: ['M', 'F', 'O'],
    })
    @IsOptional()
    @IsIn(['M', 'F', 'O'])
    gender?: 'M' | 'F' | 'O';

    @ApiPropertyOptional({
        description: 'Address of the user.',
        example: 'Calle 123 #45-67',
    })
    @IsOptional()
    @IsString()
    address?: string;

    @ApiPropertyOptional({
        description: 'City of the user.',
        example: 'Bogotá',
    })
    @IsOptional()
    @IsString()
    city?: string;

    @ApiPropertyOptional({
        description: 'State/Department of the user.',
        example: 'Cundinamarca',
    })
    @IsOptional()
    @IsString()
    state?: string;

    @ApiPropertyOptional({
        description: 'Country of the user.',
        example: 'Colombia',
    })
    @IsOptional()
    @IsString()
    country?: string;

    @ApiPropertyOptional({
        description: 'Emergency contact name.',
        example: 'María Pérez',
    })
    @IsOptional()
    @IsString()
    emergency_contact_name?: string;

    @ApiPropertyOptional({
        description: 'Emergency contact phone number.',
        example: '+57 310 987 6543',
    })
    @IsOptional()
    @IsString()
    emergency_contact_phone?: string;
}

export class ChangePasswordDto {
    @ApiProperty({
        description: 'Current password of the user.',
        example: 'OldP@ssw0rd!',
    })
    @IsNotEmpty()
    @IsString()
    current_password: string;

    @ApiProperty({
        description: 'New password (minimum 6 characters).',
        example: 'NewP@ssw0rd!',
        minLength: 6,
    })
    @IsNotEmpty()
    @MinLength(6)
    new_password: string;

    @ApiProperty({
        description: 'Confirmation of new password (must match new_password).',
        example: 'NewP@ssw0rd!',
        minLength: 6,
    })
    @IsNotEmpty()
    @MinLength(6)
    confirm_password: string;
}
