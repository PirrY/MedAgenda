import { Db } from "src/db/types/types"

export type Country = {
    country_id: number,
    country_name: string
}

export type State = {
    state_id: number,
    state_name: string,
    country_id: number
}

export type City = {
    city_id: number,
    state_id: number,
    city_name: string
}

export async function getCountries(db: Db): Promise<Country[]> {
    return await db.query<Country>('SELECT * FROM countries');
}

export async function getStateByCountryId(db: Db, country_id: number): Promise<State[]> {
    return await db.query<State>('SELECT * FROM states');
}

export async function getCitiesByStateId(db: Db, state_id: number): Promise<City[]> {
    return await db.query<City>('SELECT * FROM cities');
}