import { SpecialtyDTO } from "../interfaces/specialty";
import { apiFetch } from "./singletonFetch";

export const getSpecialties = (): Promise<SpecialtyDTO[]> => {
    return apiFetch(`/clinics/getAllSpecialties`, "GET")
}