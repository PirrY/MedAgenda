import { Clinic } from "../interfaces/clinics";
import { apiFetch } from "./singletonFetch";


export const getClinics = (): Promise<Clinic[]> => {
    return apiFetch('/clinics/getAllClinics','GET');
}

export const getClinicsByCity = (cityId: number): Promise<Clinic[]> => {
  return apiFetch(`/clinics/getAllClinicsInCity?city_id=${cityId}`, "GET");
};