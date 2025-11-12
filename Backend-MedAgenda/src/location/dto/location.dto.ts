import { IsNotEmpty, IsNumber } from "class-validator";

export class GetStatesDto {
    @IsNotEmpty()
    @IsNumber()
    country_id: number;
}

export class GetCitiesDto {
    @IsNotEmpty()
    @IsNumber()
    state_id: number;
}