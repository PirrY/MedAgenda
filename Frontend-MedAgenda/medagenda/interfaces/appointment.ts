export interface Appointment {
    appointment_id: number,
    clinic_id: number,
    clinic_name: string,
    first_name: string,
    second_name?: string,
    first_last_name: string,
    second_last_name: string,
    start_date_time: string,
    end_date_time: string,
    appointment_description?: string,
}