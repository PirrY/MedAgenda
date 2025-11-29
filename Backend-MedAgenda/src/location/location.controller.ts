import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { City, Country, State } from './repo/reads';
import { GetCitiesDto, GetStatesDto } from './dto/location.dto';
import { LocationService } from './location.service';
import { CityEntity, CountryEntity, StateEntity } from 'src/swagger/entities';

@ApiTags('Location')
@Controller('location')
export class LocationController {
    constructor(private readonly locationService: LocationService){}

    @ApiOperation({ summary: 'Retrieve all countries.' })
    @ApiOkResponse({ description: 'List of countries.', type: CountryEntity, isArray: true })
    @Get('getCountries')
    async getCountries(): Promise<Country[]> {
        return await this.locationService.getCountries();
    }

    @ApiOperation({ summary: 'Retrieve states belonging to a country.' })
    @ApiOkResponse({ description: 'List of states for the provided country.', type: StateEntity, isArray: true })
    @Get('getStates')
    async getStates(@Query('country_id', ParseIntPipe) country_id: number): Promise<State[]> {
        return await this.locationService.getStates(country_id)
    }

    @ApiOperation({ summary: 'Retrieve cities belonging to a state.' })
    @ApiOkResponse({ description: 'List of cities for the provided state.', type: CityEntity, isArray: true })
    @Get('getCities')
    async getCities(@Query('state_id', ParseIntPipe) state_id: number): Promise<City[]> {
        return await this.locationService.getCities(state_id);
    }
    
}
