import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class GetStatesDto {
    @ApiProperty({
        description: 'Country identifier to fetch states for.',
        example: 1,
    })
    @IsNotEmpty()
    @IsNumber()
    country_id: number;
}

export class GetCitiesDto {
    @ApiProperty({
        description: 'State identifier to fetch cities for.',
        example: 5,
    })
    @IsNotEmpty()
    @IsNumber()
    state_id: number;
}

export class CreateCountryDto {
    @ApiProperty({
        description: 'Name of the country.',
        example: 'Colombia',
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    country_name: string;
}

export class CreateStateDto {
    @ApiProperty({
        description: 'Name of the state/department.',
        example: 'Antioquia',
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    state_name: string;

    @ApiProperty({
        description: 'Country identifier where the state belongs.',
        example: 1,
    })
    @IsNotEmpty()
    @IsNumber()
    country_id: number;
}

export class CreateCityDto {
    @ApiProperty({
        description: 'Name of the city.',
        example: 'Medellín',
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    city_name: string;

    @ApiProperty({
        description: 'State identifier where the city belongs.',
        example: 5,
    })
    @IsNotEmpty()
    @IsNumber()
    state_id: number;
}
