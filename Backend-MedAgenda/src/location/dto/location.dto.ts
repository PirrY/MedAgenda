import { IsNotEmpty, IsNumber } from "class-validator";
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
