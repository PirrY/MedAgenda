import React from 'react';
import { FaMapPin, FaGlobe } from 'react-icons/fa';
import { StateSearchResult, CountrySearchResult } from '../../interfaces/location';
import AutocompleteInput from '../atoms/AutocompleteInput';

interface StateCountryFieldsProps {
  citySearch: string;
  stateSearch: string;
  stateResults: StateSearchResult[];
  selectedState: StateSearchResult | null;
  showStateDropdown: boolean;
  isSearchingStates: boolean;
  showNewStateFields: boolean;
  countrySearch: string;
  countryResults: CountrySearchResult[];
  selectedCountry: CountrySearchResult | null;
  showCountryDropdown: boolean;
  isSearchingCountries: boolean;
  isSubmitting: boolean;
  onStateInputChange: (value: string) => void;
  onStateSelect: (state: StateSearchResult) => void;
  onCountryInputChange: (value: string) => void;
  onCountrySelect: (country: CountrySearchResult) => void;
  setShowStateDropdown: (show: boolean) => void;
  setShowCountryDropdown: (show: boolean) => void;
}

export default function StateCountryFields({
  citySearch,
  stateSearch,
  stateResults,
  selectedState,
  showStateDropdown,
  isSearchingStates,
  showNewStateFields,
  countrySearch,
  countryResults,
  selectedCountry,
  showCountryDropdown,
  isSearchingCountries,
  isSubmitting,
  onStateInputChange,
  onStateSelect,
  onCountryInputChange,
  onCountrySelect,
  setShowStateDropdown,
  setShowCountryDropdown,
}: StateCountryFieldsProps) {
  // Transform state results to autocomplete options
  const stateOptions = stateResults.map((state) => ({
    id: state.state_id,
    label: state.state_name,
    subtitle: state.country_name,
    original: state,
  }));

  // Transform country results to autocomplete options
  const countryOptions = countryResults.map((country) => ({
    id: country.country_id,
    label: country.country_name,
    original: country,
  }));

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-4">
      <div className="flex items-center gap-2 text-blue-800 font-semibold mb-2">
        <FaMapPin className="text-blue-600" />
        Nueva Ciudad - Información Adicional
      </div>
      <p className="text-sm text-blue-700 mb-4">
        La ciudad &quot;{citySearch}&quot; no existe en la base de datos. Completa la siguiente información para crearla.
      </p>

      {/* State Field */}
      <AutocompleteInput
        label="Estado/Departamento"
        icon={<FaMapPin />}
        value={stateSearch}
        onChange={onStateInputChange}
        onSelect={(option) => onStateSelect(option.original)}
        options={selectedState ? [] : stateOptions}
        isSearching={isSearchingStates}
        showDropdown={showStateDropdown}
        setShowDropdown={setShowStateDropdown}
        placeholder="Escribe el nombre del estado..."
        disabled={isSubmitting}
        dropdownHeader="Estados encontrados"
        noResultsMessage="No se encontraron coincidencias. Ingresa el país para crear un nuevo estado."
      />

      {/* Country Field (shown when no state matches) */}
      {showNewStateFields && stateSearch && (
        <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4 space-y-4">
          <p className="text-sm text-cyan-700 mb-2">
            El estado &quot;{stateSearch.split(',')[0].trim()}&quot; no existe. Ingresa el país para crearlo.
          </p>

          <AutocompleteInput
            label="País"
            icon={<FaGlobe />}
            value={countrySearch}
            onChange={onCountryInputChange}
            onSelect={(option) => onCountrySelect(option.original)}
            options={selectedCountry ? [] : countryOptions}
            isSearching={isSearchingCountries}
            showDropdown={showCountryDropdown}
            setShowDropdown={setShowCountryDropdown}
            placeholder="Escribe el nombre del país..."
            disabled={isSubmitting}
            dropdownHeader="Países encontrados"
            noResultsMessage={`No se encontraron coincidencias. El país "${countrySearch}" se creará automáticamente.`}
          />
        </div>
      )}
    </div>
  );
}
