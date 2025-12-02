export interface User {
    user_id: number;
    user_email_address: string;
    first_name: string;
    second_name?: string;
    first_last_name: string;
    second_last_name?: string;
    legal_id?: string;
    user_phone_number?: string;
    birth_date?: string;
    gender?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    emergency_contact_name?: string;
    emergency_contact_phone?: string;
}

export interface UpdateUserDTO {
    first_name?: string;
    second_name?: string;
    first_last_name?: string;
    second_last_name?: string;
    user_phone_number?: string;
    birth_date?: string;
    gender?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    emergency_contact_name?: string;
    emergency_contact_phone?: string;
}

export interface ChangePasswordDTO {
    current_password: string;
    new_password: string;
    confirm_password: string;
}
