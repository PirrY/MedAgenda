import { Appointment } from "src/appointments/repo/reads";
import { Specialty } from "src/clinics/repo"
import { Db } from "src/db/types/types";

export type PublicDoctor = {
    first_name: string,
    second_name?: string,
    first_last_name: string,
    second_last_name: string,
    specialties: Specialty[]
};

export type DoctorRow = {
  user_id: number,
  first_name: string,
  second_name?: string,
  first_last_name: string,
  second_last_name: string,
  specialty_id: number,
  specialty_name: string,
  specialty_description?: string
};

export type PatientHistoryRow = {
  user_id: number,
  first_name: string,
  second_name?: string,
  first_last_name: string,
  appointment_description?: string,
  appointment_date: string,
};

export async function getAllDoctorAppointments(db: Db, doctor_id: number): Promise<Appointment[]> {
  return await db.query<Appointment>(
    `
    SELECT a.appointment_id, c.clinic_id, c.clinic_name, p.first_name, p.second_name, p.first_last_name, p.second_last_name, a.start_date_time, a.end_date_time, a.appointment_description
    FROM appointments a 
    JOIN users p ON a.patient_id = p.user_id
    JOIN clinics c ON a.clinic_id = c.clinic_id
    WHERE a.doctor_id = ?
    `, [doctor_id]);
};

export async function getDoctorPatientHistory(db: Db, doctor_id: number): Promise<PatientHistoryRow[]> {
  return await db.query<PatientHistoryRow>(
    `
    SELECT u.user_id, u.first_name, u.second_name, u.first_last_name, a.appointment_description, a.start_date_time AS appointment_date 
    FROM users u JOIN appointments a 
    ON u.user_id = a.patient_id 
    WHERE a.doctor_id = ?
    `, [doctor_id]);
}

export async function isUserDoctorAnywhere(db: Db, doctor_id: number): Promise<boolean> {
  const q = await db.query(`SELECT 1 FROM clinic_members WHERE user_id = ? AND role_within_clinic = 'Doctor'`, [doctor_id]);
  return q.length > 0;
}
