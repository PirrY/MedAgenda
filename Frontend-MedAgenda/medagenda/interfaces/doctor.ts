import { SpecialtyDTO } from "./specialty";

export interface Doctor {
    first_name: string,
    second_name?: string,
    first_last_name: string,
    second_last_name: string,
    specialties: SpecialtyDTO[],
}

export interface PatientHistory {
    user_id: number,
    first_name: string,
    second_name?: string,
    first_last_name: string,
    appointment_description?: string,
    appointment_date: string,
}
