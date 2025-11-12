import { Roles } from "src/auth/role_guard/roles.enum";
import { Db } from "src/db/types/types";

export type Clinic = {
    clinic_id: number,
    clinic_name: string,
    is_open: boolean,
    clinic_phone_number: string,
    clinic_city_id: number,
    clinic_address: string,
    clinic_description?: string,
}

export type Specialty = {
    specialty_id: number,
    specialty_name: string,
    specialty_description?: string
}

export async function getAllSpecialties(db: Db): Promise<Specialty[]> {
    return await db.query<Specialty>('SELECT * FROM specialties');
}

export async function getRoleByIds(db: Db, clinic_id: number, user_id: number): Promise<{ role_within_clinic: Roles} | null> {
    const ownerverif = await db.query('SELECT 1 FROM clinics WHERE clinic_id = ? AND clinic_owner = ?', [clinic_id, user_id]);
    if(ownerverif.length > 0) return {role_within_clinic: Roles.Owner};
    const role = await db.query<{ role_within_clinic: Roles}>('SELECT role_within_clinic FROM clinic_members WHERE clinic_id = ? AND user_id = ?', [clinic_id, user_id]);
    if(role.length === 0) return null;
    return role[0];
}

export async function getClinics(db: Db): Promise<Clinic[]> {
    return await db.query<Clinic>('SELECT clinic_id, clinic_name, is_open, clinic_phone_number, clinic_city_id, clinic_address, clinic_description FROM clinics');
}

export async function getClinicsWithSpecialty(db: Db, specialty_id: number): Promise<Clinic[]> {
    return await db.query<Clinic>('SELECT clinic_id, clinic_name, is_open, clinic_phone_number, clinic_city_id, clinic_address, clinic_description FROM clinics c JOIN clinic_specialties cs ON c.clinic_id = cs.clinic_id WHERE cs.specialty_id = ?', [specialty_id])
}

export async function getClinicsInCity(db: Db, city_id: number): Promise<Clinic[]> {
    return await db.query<Clinic>('SELECT clinic_id, clinic_name, is_open, clinic_phone_number, clinic_city_id, clinic_address, clinic_description FROM clinics c WHERE clinic_city_id = ?', [city_id]);
}

export async function getClinicsInState(db: Db, state_id: number): Promise<Clinic[]> {
    return await db.query<Clinic>('SELECT clinic_id, clinic_name, is_open, clinic_phone_number, clinic_city_id, clinic_address, clinic_description FROM clinics c JOIN cities ct ON c.clinic_city_id = ct.city_id JOIN states st ON st.state_id = ct.state_id WHERE ct.state_id = ?', [state_id]);
}

