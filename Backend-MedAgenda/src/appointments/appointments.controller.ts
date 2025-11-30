import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/appointments.dto';

@ApiTags('Appointments')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('bearer')
@Controller('appointments')
export class AppointmentsController {
    constructor(private readonly appointmentService: AppointmentsService){}

    @Post('scheduleAppointment')
    @ApiOperation({ summary: 'Schedule a new appointment for the authenticated patient.' })
    @ApiBody({ type: CreateAppointmentDto })
    @ApiCreatedResponse({ description: 'Appointment scheduled successfully.' })
    @ApiBadRequestResponse({ description: 'Validation failed or missing required data.' })
    @ApiConflictResponse({ description: 'Doctor or clinic is not available for the specified time range.' })
    @ApiUnauthorizedResponse({ description: 'Invalid or missing authentication token.' })
    async scheduleAppointment(@Body() dto: CreateAppointmentDto, @Req() req): Promise<void> {
        return await this.appointmentService.createAppointment(dto, req.user.id);
    }
    

}
