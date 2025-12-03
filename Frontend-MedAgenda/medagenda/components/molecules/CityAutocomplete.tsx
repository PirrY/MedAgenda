import React, { useRef, useEffect } from 'react';
import { FaCity } from 'react-icons/fa';
import { CitySearchResult } from '../../interfaces/clinic';

interface CityAutocompleteProps {
  citySearch: string;
  cityResults: CitySearchResult[];
  selectedCity: CitySearchResult | null;
  showCityDropdown: boolean;
  isSearchingCities: boolean;
  isSubmitting: boolean;
  onCityInputChange: (value: string) => void;
  onCitySelect: (city: CitySearchResult) => void;
  setShowCityDropdown: (show: boolean) => void;
}

export default function CityAutocomplete({
  citySearch,
  cityResults,
  selectedCity,
  showCityDropdown,
  isSearchingCities,
  isSubmitting,
  onCityInputChange,
  onCitySelect,
  setShowCityDropdown,
}: CityAutocompleteProps) {
  const cityDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cityDropdownRef.current && !cityDropdownRef.current.contains(event.target as Node)) {
        setShowCityDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setShowCityDropdown]);

  return (
    <div>
      <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
        <FaCity className="text-[#4682B4]" />
        Ciudad
      </label>
      <div className="relative" ref={cityDropdownRef}>
        <input
          type="text"
          value={citySearch}
          onChange={(e) => onCityInputChange(e.target.value)}
          onFocus={() => setShowCityDropdown(true)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4682B4]"
          placeholder="Escribe el nombre de la ciudad..."
          disabled={isSubmitting}
          autoComplete="off"
        />

        {showCityDropdown && citySearch && !selectedCity && (
          <div className="absolute z-50 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-y-auto">
            {isSearchingCities ? (
              <div className="px-4 py-3 text-gray-500 text-sm">Buscando ciudades...</div>
            ) : cityResults.length > 0 ? (
              <>
                <div className="px-4 py-2 bg-gray-50 border-b border-gray-200 text-xs text-gray-600 font-semibold">
                  Ciudades encontradas
                </div>
                {cityResults.map((city) => (
                  <button
                    key={city.city_id}
                    type="button"
                    onClick={() => onCitySelect(city)}
                    className="w-full px-4 py-3 text-left hover:bg-blue-50 border-b border-gray-100 last:border-b-0 transition-colors"
                  >
                    <div className="font-semibold text-gray-800">{city.city_name}</div>
                    <div className="text-sm text-gray-600">
                      {city.state_name}, {city.country_name}
                    </div>
                  </button>
                ))}
              </>
            ) : (
              <div className="px-4 py-3 text-gray-500 text-sm">
                No se encontraron coincidencias. Ingresa el estado y país para crear una nueva ciudad.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
