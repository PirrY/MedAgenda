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
    email: string;  // Backend espera "email" no "user_email_address"
    isDoctor: boolean;  // Backend espera camelCase
    isAdmin: boolean;  // Backend espera camelCase
    specialty_id?: number; // Si se convierte en doctor
}

export interface SearchUserDTO {
    email: string;
}

export interface Specialty {
    specialty_id: number;
    specialty_name: string;
}

export interface UserClinic {
    clinic_id: number;
    clinic_name: string;
    role_within_clinic: string; // 'Admin', 'Doctor', 'Owner', etc.
    role_description?: string;
}

export interface AddMemberToClinicDTO {
    clinic_id: number;
    user_id: number;
    role_within_clinic: string; // 'Admin' o 'Doctor'
    role_description?: string;
}
