export interface ClinicUser {
    user_id: number;
    user_email_address: string;
    first_name: string;
    second_name?: string;
    first_last_name: string;
    second_last_name?: string;
    user_phone_number?: string;
    is_doctor: boolean;
    is_admin: boolean;
    specialty_name?: string; // Si es doctor
    created_at?: string;
}

export interface UpdateUserRoleDTO {
    user_email_address: string;
    is_doctor: boolean;
    is_admin: boolean;
    specialty_id?: number; // Si se convierte en doctor
}

export interface SearchUserDTO {
    email: string;
}

export interface Specialty {
    specialty_id: number;
    specialty_name: string;
}
