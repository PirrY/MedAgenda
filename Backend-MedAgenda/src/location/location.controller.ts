import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { LocationService } from './location.service';
import { City, Country, State } from './repo/reads';
import { GetCitiesDto, GetStatesDto } from './dto/location.dto';

@Controller('location')
export class LocationController {
    constructor(private readonly locationService: LocationService){}

    @Get('getCountries')
    async getCountries(): Promise<Country[]> {
        return await this.locationService.getCountries();
    }

    @Get('getStates')
    async getStates(@Query('country_id', ParseIntPipe) country_id: number): Promise<State[]> {
        return await this.locationService.getStates(country_id)
    }

    @Get('getCities')
    async getCities(@Query('state_id', ParseIntPipe) state_id: number): Promise<City[]> {
        return await this.locationService.getCities(state_id);
    }
    
}
