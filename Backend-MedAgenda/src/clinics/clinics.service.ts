import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as ClinicReads from './repo/reads';
import { DatabaseService } from 'src/db/database.service';
import { Roles } from 'src/auth/role_guard/roles.enum';
import { AddMemberToClinicDto, AddSpecialtiesToClinicDto, CreateClinicDto, GetClinicsInCityDto, GetClinicsInStateDto, GetClinicsWithSpecialtyDto } from './dto/clinics.dto';
import * as ClinicWrites from './repo/writes'



@Injectable()
export class ClinicsService {

    constructor(private readonly db: DatabaseService){}
    
    async getAllSpecialties(): Promise<ClinicReads.Specialty[]> {
        return await ClinicReads.getAllSpecialties(this.db);
    }

    async getAllClinics(): Promise<ClinicReads.Clinic[]> {
        return await ClinicReads.getClinics(this.db);
    }

    async getAllClinicsWithSpecialties(dto: GetClinicsWithSpecialtyDto): Promise<ClinicReads.Clinic[]> {
        return await ClinicReads.getClinicsWithSpecialty(this.db, dto.specialty_id);
    }

    async getAllClinicsInCity(dto: GetClinicsInCityDto): Promise<ClinicReads.Clinic[]> {
        return await ClinicReads.getClinicsInCity(this.db, dto.city_id);
    } 

    async getAllClinicsInState(dto: GetClinicsInStateDto): Promise<ClinicReads.Clinic[]> {
        return await ClinicReads.getClinicsInState(this.db, dto.state_id);
    } 

    async createClinic(dto: CreateClinicDto, requester_id: number): Promise<void> {
        await ClinicWrites.insertClinic(this.db, dto, requester_id);
    }

    async addMemberToClinic(dto: AddMemberToClinicDto, requester_id: number): Promise<void> {
        const requester_role = await ClinicReads.getRoleByIds(this.db, dto.clinic_id, requester_id);
        if(requester_role === null) throw new UnauthorizedException();
        if(this.rankRole(requester_role.role_within_clinic) <= this.rankRole(dto.role_within_clinic)) throw new ForbiddenException(`You can't add members with roles that are higher or the same level as yours.`);
        await ClinicWrites.insertMembership(this.db, dto);
    }

    async addSpecialtiesToClinic(dto: AddSpecialtiesToClinicDto): Promise<void> {
        await ClinicWrites.insertClinicSpecialties(this.db, dto);
    }

    rankRole(role: Roles): number {
        switch(role) {
            case Roles.Owner:
                return 4;
            case Roles.Admin:
                return 3;
            case Roles.Doctor:
                return 2;
            case Roles.Employee:
                return 1;
            default:
                return 0;
        }
    }

}
