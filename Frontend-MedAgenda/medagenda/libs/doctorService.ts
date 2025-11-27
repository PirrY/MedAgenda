import { Appointment } from "../interfaces/appointment";
import { PatientHistory } from "../interfaces/doctor";
import { apiFetch } from "./singletonFetch";

export const isUserDoctor = (): Promise<boolean> => {
    return apiFetch('/doctors/isUserDoctorAnywhere', 'GET');
};

export const getDoctorAppointments = (): Promise<Appointment[]> => {
    return apiFetch('/doctors/getDoctorAppointments', 'GET');
};

export const getDoctorPatientHistories = (): Promise<PatientHistory[]> => {
    return apiFetch('/doctors/getDoctorPatientHistories', 'GET');
};

