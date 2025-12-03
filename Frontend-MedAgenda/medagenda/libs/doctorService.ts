import { DoctorAppointmentView } from "../interfaces/appointment";
import { PatientHistory } from "../interfaces/doctor";
import { Prescription, PrescriptionsDoctorView } from "../interfaces/prescriptions";
import { apiFetch } from "./singletonFetch";

export const isUserDoctor = (): Promise<boolean> => {
    return apiFetch('/doctors/isUserDoctorAnywhere', 'GET');
};

export const getDoctorAppointments = (): Promise<DoctorAppointmentView[]> => {
    return apiFetch('/doctors/getDoctorAppointments', 'GET');
};

export const getDoctorPatientHistories = (): Promise<PatientHistory[]> => {
    return apiFetch('/doctors/getDoctorPatientHistories', 'GET');
};

export const getPrescriptionsAssignedByDoctor = (clinicId: number): Promise<PrescriptionsDoctorView[]> => {
    return apiFetch(`/prescriptions/getPrescriptionsAssignedByDoctor?clinic_id=${clinicId}`,'GET');
};

export const createPrescription = (pres: Prescription): Promise<void> => {
    return apiFetch('/prescriptions/assignPrescription', 'POST', pres);
};

