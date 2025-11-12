import { Injectable } from '@nestjs/common';
import * as LocationReads from './repo/reads'
import { DatabaseService } from 'src/db/database.service';
import { GetCitiesDto, GetStatesDto } from './dto/location.dto';
@Injectable()
export class LocationService {
    constructor(private readonly db: DatabaseService){}

    async getCountries(): Promise<LocationReads.Country[]> {
        return await LocationReads.getCountries(this.db);
    }

    async getStates(country_id: number): Promise<LocationReads.State[]> {
        return await LocationReads.getStateByCountryId(this.db, country_id);
    }

    async getCities(state_id: number): Promise<LocationReads.City[]> {
        return await LocationReads.getCitiesByStateId(this.db, state_id);
    }
    
}
