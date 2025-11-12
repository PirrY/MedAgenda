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
