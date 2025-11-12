import { apiFetch } from "./singletonFetch";
import { Country, State, City } from "../interfaces/location";

export const getCountries = (): Promise<Country[]> => {
  return apiFetch("/location/getCountries", "GET");
};

export const getStatesByCountry = (countryId: number): Promise<State[]> => {
  return apiFetch(`/location/getStates?country_id=${countryId}`, "GET");
};

export const getCitiesByState = (stateId: number): Promise<City[]> => {
  return apiFetch(`/location/getCities?state_id=${stateId}`, "GET");
};




