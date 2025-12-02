export interface Country {
  country_id: number;
  country_name: string;
}

export interface State {
  state_id: number;
  state_name: string;
  country_id: number;
}

export interface City {
  city_id: number;
  city_name: string;
  state_id: number;
}

export interface StateSearchResult {
  state_id: number;
  state_name: string;
  country_name: string;
}

export interface CountrySearchResult {
  country_id: number;
  country_name: string;
}

export interface CreateCityDTO {
  city_name: string;
  state_id: number;
}

export interface CreateStateDTO {
  state_name: string;
  country_id: number;
}

export interface CreateCountryDTO {
  country_name: string;
}
