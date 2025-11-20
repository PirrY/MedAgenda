import { Body, Controller, Get, ParseArrayPipe, ParseIntPipe, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ClinicsService } from './clinics.service';
import { Roles } from 'src/auth/role_guard/roles.enum';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { AddMemberToClinicDto, AddSpecialtiesToClinicDto, CreateClinicDto, GetClinicDto } from './dto/clinics.dto';
import { roles } from 'src/auth/role_guard/roles.decorator';
import { Clinic, Specialty } from './repo';
import { Public } from 'src/auth/jwt/public.decorator';
import { PublicDoctor } from 'src/doctors/repo';

@UseGuards(JwtAuthGuard)
@Controller('clinics')
export class ClinicsController {
  constructor(private readonly clinicService: ClinicsService){}

  @Public()
  @Get('getAllSpecialties')
  async getAllSpecialties(): Promise<Specialty[]> {
    return this.clinicService.getAllSpecialties();
  }

  @Public()
  @Get('getAllClinics')
  async getAllClinics(): Promise<Clinic[]> {
    return this.clinicService.getAllClinics();
  }

  @Public()
  @Get('getAllClinicsWithSpecialty')
  async getAllClinicsWithSpecialty(
    @Query('specialty_ids', new ParseArrayPipe({ items: Number, separator: ',' })) specialty_ids: number[],
  ): Promise<Clinic[]> {
    return this.clinicService.getAllClinicsWithSpecialties({ specialty_ids });
  }

  @Public()
  @Get('getAllClinicsInCity')
  async getAllClinicsInCity(
    @Query('city_id', ParseIntPipe) city_id: number
  ): Promise<Clinic[]> {
    return this.clinicService.getAllClinicsInCity(city_id);
  }

  @Public()
  @Get('getAllClinicsWithSpecialtiesInCity')
  async getAllClinicsWithSpecialtiesInCity(
    @Query('specialty_ids') specialty_ids_raw: string[] | string,
    @Query('city_id', ParseIntPipe) city_id: number,
  ): Promise<Clinic[]> {
    const list = Array.isArray(specialty_ids_raw) ? specialty_ids_raw : (specialty_ids_raw ?? '').split(',');
    const specialty_ids = list.map(n => Number(n)).filter(n => Number.isFinite(n));
    return this.clinicService.getAllClinicsWithSpecialtiesInCity({ specialty_ids, city_id });
  }

  @Public()
  @Get('getAllClinicsWithSpecialtiesInCountry')
  async getAllClinicsWithSpecialtiesInCountry(
    @Query('specialty_ids') specialty_ids_raw: string[] | string,
    @Query('country_id', ParseIntPipe) country_id: number,
  ): Promise<Clinic[]> {
    const list = Array.isArray(specialty_ids_raw) ? specialty_ids_raw : (specialty_ids_raw ?? '').split(',');
    const specialty_ids = list.map(n => Number(n)).filter(n => Number.isFinite(n));
    return this.clinicService.getAllClinicsWithSpecialtiesInCountry({ specialty_ids, country_id });
  }

  @Public()
  @Get('getAllClinicsInState')
  async getAllClinicsInState(
    @Query('state_id', ParseIntPipe) state_id: number
  ): Promise<Clinic[]> {
    return this.clinicService.getAllClinicsInState(state_id);
  }

  @Public()
  @Get('getAllClinicsInCountry')
  async getAllClinicsInCountry(
    @Query('country_id', ParseIntPipe) country_id: number
  ): Promise<Clinic[]> {
    return this.clinicService.getAllClinicsInCountry(country_id);
  }

  @Public()
  @Get('getClinicDetails')
  async getClinicDetails(@Query() dto: GetClinicDto): Promise<Clinic> {
    return await this.clinicService.getClinicDetails(dto);
  }

  @Public()
  @Get('getClinicDoctors')
  async getClinicDoctors(@Query() dto: GetClinicDto): Promise<PublicDoctor[]> {
    return await this.clinicService.getAllClinicDoctors(dto);
  }

  @Post('createClinic')
  async createClinic(@Body() dto: CreateClinicDto, @Req() req): Promise<void> {
    return this.clinicService.createClinic(dto, req.user.id);
  }

  @roles(Roles.Owner, Roles.Admin)
  @Post('addMemberToClinic')
  async addMemberToClinic(@Body() dto: AddMemberToClinicDto, @Req() req): Promise<void> {
    return this.clinicService.addMemberToClinic(dto, req.user.id);
  }

  @roles(Roles.Owner, Roles.Admin)
  @Post('addSpecialtiesToClinic')
  async addSpecialtiesToClinic(@Body() dto: AddSpecialtiesToClinicDto): Promise<void> {
    return this.clinicService.addSpecialtiesToClinic(dto);
  }
}
