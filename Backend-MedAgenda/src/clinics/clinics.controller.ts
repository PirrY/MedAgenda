import { Body, Controller, Get, ParseIntPipe, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ClinicsService } from './clinics.service';
import { Roles } from 'src/auth/role_guard/roles.enum';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { AddMemberToClinicDto, AddSpecialtiesToClinicDto, CreateClinicDto, GetClinicsInCityDto, GetClinicsInStateDto, GetClinicsWithSpecialtyDto } from './dto/clinics.dto';
import { roles } from 'src/auth/role_guard/roles.decorator';
import { Clinic, Specialty } from './repo';
import { Public } from 'src/auth/jwt/public.decorator';

@UseGuards(JwtAuthGuard)
@Controller('clinics')
export class ClinicsController {
    constructor(private readonly clinicService: ClinicsService){}
    
    @Public()
    @Get('getAllSpecialties')
    async getAllSpecialties(): Promise<Specialty[]> {
        return await this.clinicService.getAllSpecialties();
    }

    @Public()
    @Get('getAllClinics')
    async getAllClinics(): Promise<Clinic[]> {
        return await this.clinicService.getAllClinics();
    }

    @Public()
    @Get('getAllClinicsWithSpecialty')
    async getAllClinicsWithSpecialty(@Body() dto: GetClinicsWithSpecialtyDto): Promise<Clinic[]> {
        return await this.clinicService.getAllClinicsWithSpecialties(dto);
    }

    @Public()
    @Get('getAllClinicsInCity')
    async getAllClinicsInCity(@Query('city_id', ParseIntPipe) city_id: number): Promise<Clinic[]> {
        return await this.clinicService.getAllClinicsInCity(city_id);
    }

    @Public()
    @Get('getAllClinicsInState')
    async getAllClinicsInState(@Body() dto: GetClinicsInStateDto): Promise<Clinic[]> {
        return await this.clinicService.getAllClinicsInState(dto);
    }

    @Post('createClinic')
    async createClinic(@Body() dto: CreateClinicDto, @Req() req): Promise<void> {
        return await this.clinicService.createClinic(dto, req.user.id);
    }

    @roles(Roles.Owner, Roles.Admin)
    @Post('addMemberToClinic')
    async addMemberToClinic(@Body() dto: AddMemberToClinicDto, @Req() req): Promise<void> {
        return await this.clinicService.addMemberToClinic(dto, req.user.id);
    }

    @roles(Roles.Owner, Roles.Admin)
    @Post('addSpecialtiesToClinic')
    async addSpecialtiesToClinic(@Body() dto: AddSpecialtiesToClinicDto): Promise<void> {
        return await this.clinicService.addSpecialtiesToClinic(dto);
    }

}
