import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { Appointment } from 'src/appointments/repo/reads';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { PatientHistoryRow } from './repo';


@Controller('doctors')
@UseGuards(JwtAuthGuard)
export class DoctorsController {
    constructor(private readonly doctorService: DoctorsService){}

    @Get('getDoctorAppointments')
    async getDoctorAppointments(@Req() req): Promise<Appointment[]> {
        return await this.doctorService.getDoctorAppointments(req.user.id);
    }

    @Get('getDoctorPatientHistories')
    async getDoctorPatientHistories(@Req() req): Promise<PatientHistoryRow[]> {
        return await this.doctorService.getDoctorsPatientHistory(req.user.id);
    }

    @Get('isUserDoctorAnywhere')
    async isUserDoctorAnywhere(@Req() req): Promise<boolean> {
        return await this.doctorService.isUserDoctorAnywhere(req.user.id);
    }

}
