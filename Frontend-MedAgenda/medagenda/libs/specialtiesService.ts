import { SpecialtyDTO } from "../interfaces/specialty";
import { apiFetch } from "./singletonFetch";

export const getSpecialties = (): Promise<SpecialtyDTO[]> => {
    return apiFetch(`/clinics/getAllSpecialties`, "GET")
}

export const addSpecialtiesToClinic = (clinic_id: number, specialty_ids: number[]): Promise<void> => {
    return apiFetch(`/clinics/addSpecialtiesToClinic`, "POST", { clinic_id, specialty_ids });
}

export const createSpecialty = (specialty_name: string): Promise<SpecialtyDTO> => {
    return apiFetch(`/clinics/createSpecialty`, "POST", { specialty_name });
}