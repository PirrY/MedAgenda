import { Specialty } from "src/clinics/repo"

export type PublicDoctor = {
    first_name: string,
    second_name?: string,
    first_last_name: string,
    second_last_name: string,
    specialties: Specialty[]
}

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
