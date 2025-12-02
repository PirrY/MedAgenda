import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsBoolean, IsOptional, IsEmail } from 'class-validator';

export class UpdateUserRoleDto {
    @ApiProperty({
        description: 'Email of the user to update',
        example: 'user@example.com',
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Whether the user should be a doctor',
        example: true,
    })
    @IsNotEmpty()
    @IsBoolean()
    isDoctor: boolean;

    @ApiProperty({
        description: 'Whether the user should be an admin',
        example: false,
    })
    @IsNotEmpty()
    @IsBoolean()
    isAdmin: boolean;

    @ApiPropertyOptional({
        description: 'Specialty ID to assign to the doctor (required if isDoctor is true)',
        example: 1,
    })
    @IsOptional()
    @IsNumber()
    specialty_id?: number;
}
