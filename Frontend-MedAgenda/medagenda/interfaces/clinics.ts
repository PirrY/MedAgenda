export interface Clinic {
    clinic_id: number,
    clinic_name: string,
    is_open: boolean,
    clinic_phone_number: string,
    clinic_city_id: number,
    clinic_address: string,
    clinic_description?: string
}