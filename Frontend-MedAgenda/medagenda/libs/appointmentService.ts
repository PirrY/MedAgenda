import { CreateAppointment, DoctorAppointmentView } from "../interfaces/appointment";
import { apiFetch } from "./singletonFetch";

export const scheduleAppointment = (obj: CreateAppointment): Promise<void> => {
    return apiFetch(`/appointments/scheduleAppointment`,'POST', obj);
};

export const getPatientAppointments = (): Promise<DoctorAppointmentView[]> => {
    return apiFetch(`/appointments/patient`, 'GET');
};
