import { SpecialtyDTO } from "./specialty";

export interface Doctor {
    first_name: string,
    second_name?: string,
    first_last_name: string,
    second_last_name: string,
    specialties: SpecialtyDTO[],
}