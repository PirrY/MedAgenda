import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateAppointmentDto {
    @IsNotEmpty()
    @IsNumber()
    clinic_id: number;

    @IsNotEmpty()
    @IsNumber()
    doctor_id: number;

    @IsNotEmpty()
    @IsDate()
    start_date_time: Date;

    @IsNotEmpty()
    @IsDate()
    end_date_time: Date;

    @IsOptional()
    @IsString()
    appointment_description?: string;
}