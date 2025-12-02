import { apiFetch } from "./singletonFetch";
import { Country, State, City, StateSearchResult, CountrySearchResult, CreateCityDTO, CreateStateDTO, CreateCountryDTO } from "../interfaces/location";

export const getCountries = (): Promise<Country[]> => {
  return apiFetch("/location/getCountries", "GET");
};

export const getStatesByCountry = (countryId: number): Promise<State[]> => {
  return apiFetch(`/location/getStates?country_id=${countryId}`, "GET");
};

export const getCitiesByState = (stateId: number): Promise<City[]> => {
  return apiFetch(`/location/getCities?state_id=${stateId}`, "GET");
};

export const searchStates = (searchTerm: string): Promise<StateSearchResult[]> => {
  return apiFetch(`/location/searchStates?search=${encodeURIComponent(searchTerm)}`, "GET");
};

export const searchCountries = (searchTerm: string): Promise<CountrySearchResult[]> => {
  return apiFetch(`/location/searchCountries?search=${encodeURIComponent(searchTerm)}`, "GET");
};

export const createCountry = (data: CreateCountryDTO): Promise<Country> => {
  return apiFetch("/location/createCountry", "POST", data);
};

export const createState = (data: CreateStateDTO): Promise<State> => {
  return apiFetch("/location/createState", "POST", data);
};

export const createCity = (data: CreateCityDTO): Promise<City> => {
  return apiFetch("/location/createCity", "POST", data);
};




