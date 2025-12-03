import { ClinicUser, UpdateUserRoleDTO, Specialty, UserClinic, AddMemberToClinicDTO } from "../interfaces/adminUser";
import { apiFetch } from "./singletonFetch";

export const getClinicUsers = (clinicId?: number): Promise<ClinicUser[]> => {
    const endpoint = clinicId
        ? `/admin/clinic-users?clinic_id=${clinicId}`
        : '/admin/clinic-users';
    return apiFetch(endpoint, 'GET');
};

export const searchUserByEmail = (email: string): Promise<ClinicUser> => {
    return apiFetch(`/admin/search-user?email=${encodeURIComponent(email)}`, 'GET');
};

export const updateUserRole = (data: UpdateUserRoleDTO): Promise<ClinicUser> => {
    return apiFetch('/admin/update-user-role', 'PUT', data);
};

export const getSpecialties = (): Promise<Specialty[]> => {
    return apiFetch('/clinics/getAllSpecialties', 'GET');
};

// Obtener las clínicas donde el usuario es admin
export const getUserAdminClinics = (): Promise<UserClinic[]> => {
    return apiFetch('/admin/my-clinics', 'GET');
};

// Agregar un miembro a la clínica
export const addMemberToClinic = (data: AddMemberToClinicDTO): Promise<ClinicUser> => {
    return apiFetch('/clinics/addMemberToClinic', 'POST', data);
};
