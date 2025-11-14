import { ClinicSearchFilters } from "../hooks/useClinicsSearch";
import { Clinic } from "../interfaces/clinics";
import { apiFetch } from "./singletonFetch";


/*export const getClinics = (filters: ClinicSearchFilters): Promise<Clinic[]> => {
    return apiFetch('/clinics/getAllClinics','GET');
}*/

export const getClinicsByCountry = (countryId: number): Promise<Clinic[]> => {
  return apiFetch(`/clinics/getAllClinicsInCountry?country_id=${countryId}`, 'GET');
}

export const getClinicsByCity = (cityId: number): Promise<Clinic[]> => {
  return apiFetch(`/clinics/getAllClinicsInCity?city_id=${cityId}`, 'GET');
};

export const getClinicsByState = (stateId: number): Promise<Clinic[]> => {
  return apiFetch(`/clinics/getAllClinicsInState?state_id=${stateId}`,'GET');
}

export const getClinicsWithSpecialtiesInCountry = (
  specialty_ids: number[],
  country_id: number
): Promise<Clinic[]> => {
  const params = new URLSearchParams();

  specialty_ids.forEach(id => params.append('specialty_ids', id.toString()));

  params.append('country_id', country_id.toString());

  return apiFetch(`/clinics/getAllClinicsWithSpecialtiesInCountry?${params.toString()}`, 'GET');
};

export const getClinicsWithSpecialtiesInCity = (
  specialty_ids: number[],
  city_id: number
): Promise<Clinic[]> => {
  const params = new URLSearchParams();

  specialty_ids.forEach(id => params.append('specialty_ids', id.toString()));

  params.append('city_id', city_id.toString());

  return apiFetch(`/clinics/getAllClinicsWithSpecialtiesInCity?${params.toString()}`, 'GET');
};



