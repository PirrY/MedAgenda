export interface Clinic {
    clinic_id: number,
    clinic_name: string,
    is_open: boolean,
    clinic_phone_number: string,
    clinic_city_id: number,
    clinic_address: string,
    clinic_description?: string
}

export interface CreateClinicDTO {
    clinic_name: string;
    clinic_phone_number: string;
    clinic_address: string;
    clinic_description?: string;
    clinic_city_id?: number;
}

export interface CitySearchResult {
    city_id: number;
    city_name: string;
    state_name: string;
    country_name: string;
}