import { Db } from "src/db/types/types";
import { AddMemberToClinicDto, AddSpecialtiesToClinic, CreateClinicDto } from "../dto/clinics.dto";


export async function insertClinic(db: Db, dto: CreateClinicDto, user_id: number): Promise<void> {
    var desc;
    if(dto.clinic_description != undefined) desc = dto.clinic_description;
    else desc = null;
    await db.execute(
        'INSERT INTO clinics(clinic_name, clinic_phone_number, clinic_city_id, clinic_address, clinic_owner, clinic_description) VALUES (?, ?, ?, ?, ?, ?)',
        [dto.clinic_name,dto.clinic_phone_number,dto.clinic_address,user_id,desc]
    );
}

export async function insertMembership(db: Db, dto: AddMemberToClinicDto): Promise<void> {
    var role_desc;
    if(dto.role_description === undefined) role_desc = null;
    else role_desc = dto.role_description;
    await db.execute(
        'INSERT INTO clinic_members(clinic_id, user_id, role_within_clinic, role_description) VALUES (?, ?, ?, ?)',
        [dto.clinic_id,dto.user_id,dto.role_within_clinic,role_desc]
    );
}

export async function insertClinicSpecialties(db: Db, dto: AddSpecialtiesToClinic): Promise<void> {
    for(const id of dto.specialty_ids) {
        await db.execute(
            'INSERT INTO clinic_specialties(clinic_id, specialty_id) VALUES (?, ?)',
            [dto.clinic_id, id]);
    }
}