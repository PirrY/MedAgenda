import { PrescriptionsDoctorView, PrescriptionsPatientView } from "../interfaces/prescriptions";
import { User, UpdateUserDTO, ChangePasswordDTO } from "../interfaces/user";
import { apiFetch } from "./singletonFetch";

export const getUserProfile = (): Promise<User> => {
    return apiFetch('/users/profile', 'GET');
};

export const updateUserProfile = (data: UpdateUserDTO): Promise<User> => {
    return apiFetch('/users/profile', 'PUT', data);
};

export const changePassword = (data: ChangePasswordDTO): Promise<void> => {
    return apiFetch('/users/change-password', 'PUT', data);
};

export const getUserPrescriptions = (): Promise<PrescriptionsPatientView[]> => {
    return apiFetch('/prescriptions/getUserPrescriptions', 'GET')
};
