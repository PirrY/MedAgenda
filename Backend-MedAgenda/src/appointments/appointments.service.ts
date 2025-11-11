import { ConflictException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/db/database.service';
import { CreateAppointmentDto } from './dto/appointments.dto';
import * as AppointmentWrites from './repo/writes';

@Injectable()
export class AppointmentsService {
    constructor(private readonly db: DatabaseService){}

    async createAppointment(dto: CreateAppointmentDto, requester_id: number): Promise<void> {
        if(!await this.isDoctorAvailable(dto.doctor_id, dto.start_date_time, dto.end_date_time)) throw new ConflictException('This doctor is not available at the specified time range.');
        if(!await this.isClinicAvailable(dto.clinic_id, dto.start_date_time, dto.end_date_time)) throw new ConflictException('This clinic is not available at the specified time range.');
        await AppointmentWrites.insertAppointment(this.db, dto, requester_id);
    }

    //Helpers below
    async isDoctorAvailable(dr_id: number, start: Date, end: Date): Promise<boolean> {
        const sqlstart = start.toISOString().slice(0,19).replace('T',' ');
        const sqlfinish = end.toISOString().slice(0,19).replace('T',' ');
        var q = await this.db.query('SELECT 1 FROM appointments WHERE doctor_id = ? AND start_date_time <= ? AND end_date_time >= ?',[dr_id, sqlstart, sqlfinish]);
        if(q.length > 0) return false;
        q = await this.db.query('SELECT 1 FROM absences WHERE doctor_id = ? AND start_date_time <= ?  AND end_date_time >= ?',[dr_id, sqlstart, sqlfinish]);
        if(q.length > 0) return false;
        return true;
    }

    async isClinicAvailable(clinic_id: number, start: Date, end: Date): Promise<boolean> {
        const sqlstart = start.toISOString().slice(0,19).replace('T',' ');
        const sqlfinish = end.toISOString().slice(0,19).replace('T',' ');
        const q = await this.db.query('SELECT 1 FROM clinics WHERE clinic_id = ? AND is_open = FALSE');
        if(q.length > 0) return false;
        const start_day = start.getDay();
        if(start_day === 6 || start_day == 7) return false;
        return true;  
    }

}
