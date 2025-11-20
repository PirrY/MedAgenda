import { Transform, Type } from "class-transformer";
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, MaxLength } from "class-validator";
import { Roles } from "src/auth/role_guard/roles.enum";


export class CreateClinicDto {

    @IsNotEmpty()
    @IsString()
    @MaxLength(25)
    clinic_name: string;

    @IsNotEmpty()
    @IsPhoneNumber()
    clinic_phone_number: string;

    @IsNotEmpty()
    @IsNumber()
    clinic_city_id: number;

    @IsNotEmpty()
    @IsString()
    @MaxLength(30)
    clinic_address: string;

    @IsOptional()
    @IsString()
    clinic_description?: string;
    
}

export class AddMemberToClinicDto {
    @IsNotEmpty()
    @IsNumber()
    clinic_id: number;

    @IsNotEmpty()
    @IsNumber()
    user_id: number;

    @IsNotEmpty()
    @IsEnum(Roles)
    role_within_clinic: Roles;

    @IsOptional()
    @IsString()
    role_description?: string;

}

export class AddSpecialtiesToClinicDto {

    @IsNotEmpty()
    @IsArray()
    @IsNumber({}, {each: true})
    specialty_ids: number[];
    
    @IsNotEmpty()
    @IsNumber()
    clinic_id: number;

}

export class GetClinicsWithSpecialtyDto {
    @IsNotEmpty()
    @IsArray()
    specialty_ids: number[];
}

export class GetClinicsInCityDto {
    @IsNotEmpty()
    @IsNumber()
    city_id: number;
}

export class GetClinicsInStateDto {
    @IsNotEmpty()
    @IsNumber()
    state_id: number;
}

export class GetClinicsInCountryDto {
    @IsNotEmpty()
    @IsNumber()
    country_id: number;
}

export class GetClinicsWithSpecialtyInCityDto {
  @IsNotEmpty()
  @IsArray()
  @Transform(({ value }) =>
    Array.isArray(value) ? value.map(Number) : [Number(value)]
  )
  specialty_ids: number[];

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  city_id: number;
}

export class GetClinicsWithSpecialtyInCountryDto {
  @IsNotEmpty()
  @IsArray()
  @Transform(({ value }) =>
    Array.isArray(value) ? value.map(Number) : [Number(value)]
  )
  specialty_ids: number[];

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  country_id: number;
}

export class GetClinicDto {
  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  clinic_id: number;
}


