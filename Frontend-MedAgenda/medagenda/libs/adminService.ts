import { ClinicUser, UpdateUserRoleDTO, Specialty } from "../interfaces/adminUser";
import { apiFetch } from "./singletonFetch";

export const getClinicUsers = (): Promise<ClinicUser[]> => {
    return apiFetch('/admin/clinic-users', 'GET');
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
