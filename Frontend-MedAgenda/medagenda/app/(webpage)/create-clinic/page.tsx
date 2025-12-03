"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '../../../hooks/useAuth';
import { searchCities, createClinic } from '../../../libs/clinicsService';
import { CitySearchResult, CreateClinicDTO } from '../../../interfaces/clinic';
import { getSpecialties, addSpecialtiesToClinic, createSpecialty } from '../../../libs/specialtiesService';
import { SpecialtyDTO } from '../../../interfaces/specialty';
import { searchStates, searchCountries, createCity as createCityService, createState as createStateService, createCountry as createCountryService } from '../../../libs/locationService';
import { StateSearchResult, CountrySearchResult } from '../../../interfaces/location';
import { getUserAdminClinics } from '../../../libs/adminService';
import Cookies from 'js-cookie';
import { FaBuilding, FaPhone, FaMapMarkerAlt, FaCity, FaStethoscope, FaPlus, FaMapPin, FaGlobe } from 'react-icons/fa';

export default function CreateClinicPage() {
  const { user, isLoading, isAdmin } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    clinic_name: '',
    clinic_phone_number: '',
    clinic_address: '',
    clinic_description: '',
  });

  // City autocomplete state
  const [citySearch, setCitySearch] = useState('');
  const [cityResults, setCityResults] = useState<CitySearchResult[]>([]);
  const [selectedCity, setSelectedCity] = useState<CitySearchResult | null>(null);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [isSearchingCities, setIsSearchingCities] = useState(false);
  const [showNewCityFields, setShowNewCityFields] = useState(false);

  // State autocomplete state
  const [stateSearch, setStateSearch] = useState('');
  const [stateResults, setStateResults] = useState<StateSearchResult[]>([]);
  const [selectedState, setSelectedState] = useState<StateSearchResult | null>(null);
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [isSearchingStates, setIsSearchingStates] = useState(false);
  const [showNewStateFields, setShowNewStateFields] = useState(false);

  // Country autocomplete state
  const [countrySearch, setCountrySearch] = useState('');
  const [countryResults, setCountryResults] = useState<CountrySearchResult[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<CountrySearchResult | null>(null);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [isSearchingCountries, setIsSearchingCountries] = useState(false);

  // Specialties state
  const [specialties, setSpecialties] = useState<SpecialtyDTO[]>([]);
  const [selectedSpecialtyIds, setSelectedSpecialtyIds] = useState<number[]>([]);
  const [loadingSpecialties, setLoadingSpecialties] = useState(true);
  const [showNewSpecialtyInput, setShowNewSpecialtyInput] = useState(false);
  const [newSpecialtyName, setNewSpecialtyName] = useState('');
  const [isCreatingSpecialty, setIsCreatingSpecialty] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const cityDropdownRef = useRef<HTMLDivElement>(null);
  const stateDropdownRef = useRef<HTMLDivElement>(null);
  const countryDropdownRef = useRef<HTMLDivElement>(null);

  // Load specialties
  useEffect(() => {
    const loadSpecialties = async () => {
      try {
        const data = await getSpecialties();
        setSpecialties(data);
      } catch (err) {
        console.error('Error loading specialties:', err);
      } finally {
        setLoadingSpecialties(false);
      }
    };
    loadSpecialties();
  }, []);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  // Handle city search with debounce
  useEffect(() => {
    if (!citySearch.trim() || selectedCity) {
      setCityResults([]);
      setShowNewCityFields(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setIsSearchingCities(true);
        const results = await searchCities(citySearch);
        setCityResults(results);

        if (results.length === 0) {
          setShowNewCityFields(true);
        } else {
          setShowNewCityFields(false);
        }
      } catch (err) {
        console.error('Error searching cities:', err);
        setCityResults([]);
      } finally {
        setIsSearchingCities(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [citySearch, selectedCity]);

  // Handle state search with debounce
  useEffect(() => {
    if (!stateSearch.trim() || selectedState) {
      setStateResults([]);
      setShowNewStateFields(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setIsSearchingStates(true);
        const results = await searchStates(stateSearch);
        setStateResults(results);

        if (results.length === 0) {
          setShowNewStateFields(true);
        } else {
          setShowNewStateFields(false);
        }
      } catch (err) {
        console.error('Error searching states:', err);
        setStateResults([]);
      } finally {
        setIsSearchingStates(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [stateSearch, selectedState]);

  // Handle country search with debounce
  useEffect(() => {
    if (!countrySearch.trim() || selectedCountry) {
      setCountryResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setIsSearchingCountries(true);
        const results = await searchCountries(countrySearch);
        setCountryResults(results);
      } catch (err) {
        console.error('Error searching countries:', err);
        setCountryResults([]);
      } finally {
        setIsSearchingCountries(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [countrySearch, selectedCountry]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cityDropdownRef.current && !cityDropdownRef.current.contains(event.target as Node)) {
        setShowCityDropdown(false);
      }
      if (stateDropdownRef.current && !stateDropdownRef.current.contains(event.target as Node)) {
        setShowStateDropdown(false);
      }
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setShowCountryDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCitySelect = (city: CitySearchResult) => {
    setSelectedCity(city);
    setCitySearch(`${city.city_name}, ${city.state_name}, ${city.country_name}`);
    setShowCityDropdown(false);
  };

  const handleCityInputChange = (value: string) => {
    setCitySearch(value);
    setSelectedCity(null);
    setShowCityDropdown(true);
  };

  const handleStateSelect = (state: StateSearchResult) => {
    setSelectedState(state);
    setStateSearch(`${state.state_name}, ${state.country_name}`);
    setShowStateDropdown(false);
    setShowNewStateFields(false);
  };

  const handleStateInputChange = (value: string) => {
    setStateSearch(value);
    setSelectedState(null);
    setShowStateDropdown(true);
  };

  const handleCountrySelect = (country: CountrySearchResult) => {
    setSelectedCountry(country);
    setCountrySearch(country.country_name);
    setShowCountryDropdown(false);
  };

  const handleCountryInputChange = (value: string) => {
    setCountrySearch(value);
    setSelectedCountry(null);
    setShowCountryDropdown(true);
  };

  const toggleSpecialty = (specialtyId: number) => {
    setSelectedSpecialtyIds(prev =>
      prev.includes(specialtyId)
        ? prev.filter(id => id !== specialtyId)
        : [...prev, specialtyId]
    );
  };

  const handleCreateSpecialty = async () => {
    if (!newSpecialtyName.trim()) {
      setError('El nombre de la especialidad es requerido');
      return;
    }

    try {
      setIsCreatingSpecialty(true);
      setError(null);
      const newSpecialty = await createSpecialty(newSpecialtyName.trim());
      setSpecialties(prev => [...prev, newSpecialty]);
      setSelectedSpecialtyIds(prev => [...prev, newSpecialty.specialty_id]);
      setNewSpecialtyName('');
      setShowNewSpecialtyInput(false);
    } catch (err: any) {
      setError(err?.message || 'Error al crear la especialidad');
    } finally {
      setIsCreatingSpecialty(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!formData.clinic_name.trim()) {
      setError('El nombre de la clínica es requerido');
      return;
    }
    if (!formData.clinic_phone_number.trim()) {
      setError('El teléfono es requerido');
      return;
    }
    if (!formData.clinic_address.trim()) {
      setError('La dirección es requerida');
      return;
    }
    // City validation
    if (!citySearch.trim()) {
      setError('La ciudad es requerida');
      return;
    }

    if (showNewCityFields) {
      // Creating new city - validate state
      if (!stateSearch.trim()) {
        setError('El estado es requerido para crear una nueva ciudad');
        return;
      }

      if (showNewStateFields) {
        // Creating new state - validate country
        if (!countrySearch.trim()) {
          setError('El país es requerido para crear un nuevo estado');
          return;
        }

        if (!selectedCountry && !countrySearch.trim()) {
          setError('Por favor selecciona o escribe un país');
          return;
        }
      } else if (!selectedState) {
        setError('Por favor selecciona un estado de la lista');
        return;
      }
    } else if (!selectedCity) {
      setError('Por favor selecciona una ciudad de la lista');
      return;
    }

    if (selectedSpecialtyIds.length === 0) {
      setError('Debes seleccionar al menos una especialidad');
      return;
    }

    try {
      setIsSubmitting(true);
      console.log('🏥 Starting clinic creation process...');

      // STEP 1: Create/Get Country ID
      let countryId: number = 0;
      if (showNewStateFields && !selectedCountry) {
        // Need to create country
        console.log('🌍 Creating new country:', countrySearch.trim());
        const newCountry = await createCountryService({ country_name: countrySearch.trim() });
        countryId = newCountry.country_id;
        console.log('✅ Country created with ID:', countryId);
      } else if (selectedCountry) {
        countryId = selectedCountry.country_id;
        console.log('✅ Using existing country ID:', countryId);
      }

      // STEP 2: Create/Get State ID
      let stateId: number = 0;
      if (showNewCityFields) {
        if (showNewStateFields) {
          // Need to create state
          console.log('🗺️ Creating new state:', {
            state_name: stateSearch.split(',')[0].trim(),
            country_id: countryId,
          });
          const newState = await createStateService({
            state_name: stateSearch.split(',')[0].trim(),
            country_id: countryId!,
          });
          stateId = newState.state_id;
          console.log('✅ State created with ID:', stateId);
        } else {
          // Using existing state
          stateId = selectedState!.state_id;
          console.log('✅ Using existing state ID:', stateId);
        }
      }

      // STEP 3: Create/Get City ID
      let cityId: number = 0;
      if (showNewCityFields) {
        // Need to create city
        console.log('🏙️ Creating new city:', {
          city_name: citySearch.trim(),
          state_id: stateId,
        });
        const newCity = await createCityService({
          city_name: citySearch.trim(),
          state_id: stateId!,
        });
        cityId = newCity.city_id;
        console.log('✅ City created with ID:', cityId);
      } else {
        // Using existing city
        cityId = selectedCity!.city_id;
        console.log('✅ Using existing city ID:', cityId);
      }

      // STEP 4: Create clinic
      const clinicData: CreateClinicDTO = {
        clinic_name: formData.clinic_name,
        clinic_phone_number: formData.clinic_phone_number,
        clinic_address: formData.clinic_address,
        clinic_description: formData.clinic_description || undefined,
        clinic_city_id: cityId,
      };

      console.log('🏥 Creating clinic with data:', clinicData);
      const createdClinic = await createClinic(clinicData);
      console.log('✅ Clinic created:', createdClinic);

      // STEP 5: Add specialties to the created clinic
      if (selectedSpecialtyIds.length > 0) {
        console.log('💉 Adding specialties to clinic:', {
          clinic_id: createdClinic.clinic_id,
          specialty_ids: selectedSpecialtyIds,
        });
        await addSpecialtiesToClinic(createdClinic.clinic_id, selectedSpecialtyIds);
        console.log('✅ Specialties added successfully');
      }

      console.log('🎉 Clinic creation process completed!');
      setSuccess(true);

      // Dar tiempo al backend para procesar el rol, luego verificar
      console.log('⏳ Esperando que el backend procese el rol de owner...');

      setTimeout(async () => {
        try {
          console.log('🔄 Verificando roles del usuario (obteniendo clínicas)...');
          const userClinics = await getUserAdminClinics();
          console.log('✅ Clínicas del usuario:', userClinics);

          // Si tiene al menos una clínica, es admin
          if (userClinics && userClinics.length > 0) {
            console.log('✅ Usuario ahora es Admin/Owner. Actualizando cookie...');
            Cookies.set('isAdmin', 'true', { expires: 7 });

            // Verificar si alguna clínica lo tiene como doctor también
            const hasDoctorRole = userClinics.some(clinic =>
              clinic.role_within_clinic.toLowerCase() === 'doctor'
            );
            if (hasDoctorRole) {
              console.log('✅ Usuario también tiene rol de Doctor');
              Cookies.set('isDoctor', 'true', { expires: 7 });
            }

            console.log('✅ Cookies actualizadas. Redirigiendo a dashboard admin...');
            router.push('/homeAdmin');
          } else {
            // Si no hay clínicas, algo salió mal, pero igual redirigir con recarga
            console.warn('⚠️ No se encontraron clínicas. Forzando recarga completa...');
            window.location.href = '/homeAdmin';
          }
        } catch (refreshError: any) {
          console.error('⚠️ Error al verificar clínicas:', refreshError);
          console.log('📍 Asumiendo que es admin y forzando recarga de página...');

          // Como la clínica se creó exitosamente, asumimos que es admin
          Cookies.set('isAdmin', 'true', { expires: 7 });

          // Recargar la página completa para que el backend devuelva las cookies correctas
          window.location.href = '/homeAdmin';
        }
      }, 1000); // Esperar 1 segundo antes de verificar
    } catch (err: any) {
      setError(err?.message || 'Error al crear la clínica');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="text-gray-600">Cargando...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-12 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#4682B4] to-[#5C95FF] text-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <FaBuilding className="text-5xl" />
            <div>
              <h1 className="text-4xl font-bold">Crear Nueva Clínica</h1>
              <p className="text-blue-100 mt-2">Completa la información para registrar tu clínica</p>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6">
            ¡Clínica creada exitosamente! Redirigiendo...
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
          <div className="space-y-6">
            {/* Clinic Name */}
            <div>
              <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                <FaBuilding className="text-[#4682B4]" />
                Nombre de la Clínica
              </label>
              <input
                type="text"
                value={formData.clinic_name}
                onChange={(e) => setFormData({ ...formData, clinic_name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4682B4]"
                placeholder="Ej: Clínica Santa María"
                disabled={isSubmitting}
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                <FaPhone className="text-[#4682B4]" />
                Teléfono
              </label>
              <input
                type="tel"
                value={formData.clinic_phone_number}
                onChange={(e) => setFormData({ ...formData, clinic_phone_number: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4682B4]"
                placeholder="Ej: +57 300 1234567"
                disabled={isSubmitting}
              />
            </div>

            {/* Address */}
            <div>
              <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                <FaMapMarkerAlt className="text-[#4682B4]" />
                Dirección
              </label>
              <input
                type="text"
                value={formData.clinic_address}
                onChange={(e) => setFormData({ ...formData, clinic_address: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4682B4]"
                placeholder="Ej: Calle 50 #45-30"
                disabled={isSubmitting}
              />
            </div>

            {/* City Autocomplete */}
            <div>
              <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                <FaCity className="text-[#4682B4]" />
                Ciudad
              </label>
              <div className="relative" ref={cityDropdownRef}>
                <input
                  type="text"
                  value={citySearch}
                  onChange={(e) => handleCityInputChange(e.target.value)}
                  onFocus={() => setShowCityDropdown(true)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4682B4]"
                  placeholder="Escribe el nombre de la ciudad..."
                  disabled={isSubmitting}
                  autoComplete="off"
                />

                {/* Dropdown with results */}
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
                            onClick={() => handleCitySelect(city)}
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

            {/* State Autocomplete (shown when no city matches) */}
            {showNewCityFields && citySearch && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-4">
                <div className="flex items-center gap-2 text-blue-800 font-semibold mb-2">
                  <FaMapPin className="text-blue-600" />
                  Nueva Ciudad - Información Adicional
                </div>
                <p className="text-sm text-blue-700 mb-4">
                  La ciudad &quot;{citySearch}&quot; no existe en la base de datos. Completa la siguiente información para crearla.
                </p>

                {/* State Field */}
                <div>
                  <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                    <FaMapPin className="text-[#4682B4]" />
                    Estado/Departamento
                  </label>
                  <div className="relative" ref={stateDropdownRef}>
                    <input
                      type="text"
                      value={stateSearch}
                      onChange={(e) => handleStateInputChange(e.target.value)}
                      onFocus={() => setShowStateDropdown(true)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4682B4]"
                      placeholder="Escribe el nombre del estado..."
                      disabled={isSubmitting}
                      autoComplete="off"
                    />

                    {/* State Dropdown */}
                    {showStateDropdown && stateSearch && !selectedState && (
                      <div className="absolute z-50 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-y-auto">
                        {isSearchingStates ? (
                          <div className="px-4 py-3 text-gray-500 text-sm">Buscando estados...</div>
                        ) : stateResults.length > 0 ? (
                          <>
                            <div className="px-4 py-2 bg-gray-50 border-b border-gray-200 text-xs text-gray-600 font-semibold">
                              Estados encontrados
                            </div>
                            {stateResults.map((state) => (
                              <button
                                key={state.state_id}
                                type="button"
                                onClick={() => handleStateSelect(state)}
                                className="w-full px-4 py-3 text-left hover:bg-blue-50 border-b border-gray-100 last:border-b-0 transition-colors"
                              >
                                <div className="font-semibold text-gray-800">{state.state_name}</div>
                                <div className="text-sm text-gray-600">{state.country_name}</div>
                              </button>
                            ))}
                          </>
                        ) : (
                          <div className="px-4 py-3 text-gray-500 text-sm">
                            No se encontraron coincidencias. Ingresa el país para crear un nuevo estado.
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Country Field (shown when no state matches) */}
                {showNewStateFields && stateSearch && (
                  <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4 space-y-4">
                    <p className="text-sm text-cyan-700 mb-2">
                      El estado &quot;{stateSearch.split(',')[0].trim()}&quot; no existe. Ingresa el país para crearlo.
                    </p>

                    <div>
                      <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                        <FaGlobe className="text-[#4682B4]" />
                        País
                      </label>
                      <div className="relative" ref={countryDropdownRef}>
                        <input
                          type="text"
                          value={countrySearch}
                          onChange={(e) => handleCountryInputChange(e.target.value)}
                          onFocus={() => setShowCountryDropdown(true)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4682B4]"
                          placeholder="Escribe el nombre del país..."
                          disabled={isSubmitting}
                          autoComplete="off"
                        />

                        {/* Country Dropdown */}
                        {showCountryDropdown && countrySearch && !selectedCountry && (
                          <div className="absolute z-50 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-y-auto">
                            {isSearchingCountries ? (
                              <div className="px-4 py-3 text-gray-500 text-sm">Buscando países...</div>
                            ) : countryResults.length > 0 ? (
                              <>
                                <div className="px-4 py-2 bg-gray-50 border-b border-gray-200 text-xs text-gray-600 font-semibold">
                                  Países encontrados
                                </div>
                                {countryResults.map((country) => (
                                  <button
                                    key={country.country_id}
                                    type="button"
                                    onClick={() => handleCountrySelect(country)}
                                    className="w-full px-4 py-3 text-left hover:bg-blue-50 border-b border-gray-100 last:border-b-0 transition-colors"
                                  >
                                    <div className="font-semibold text-gray-800">{country.country_name}</div>
                                  </button>
                                ))}
                              </>
                            ) : (
                              <div className="px-4 py-3 text-gray-500 text-sm">
                                No se encontraron coincidencias. El país &quot;{countrySearch}&quot; se creará automáticamente.
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Specialties Selection */}
            <div>
              <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                <FaStethoscope className="text-[#4682B4]" />
                Especialidades de la Clínica
              </label>
              <p className="text-sm text-gray-600 mb-3">
                Selecciona las especialidades médicas que ofrece tu clínica
              </p>

              {loadingSpecialties ? (
                <div className="text-gray-500 text-sm">Cargando especialidades...</div>
              ) : (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-h-64 overflow-y-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {specialties.map((specialty) => (
                      <label
                        key={specialty.specialty_id}
                        className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-[#4682B4] hover:bg-blue-50 cursor-pointer transition-all"
                      >
                        <input
                          type="checkbox"
                          checked={selectedSpecialtyIds.includes(specialty.specialty_id)}
                          onChange={() => toggleSpecialty(specialty.specialty_id)}
                          className="w-5 h-5 accent-[#4682B4]"
                          disabled={isSubmitting}
                        />
                        <span className="text-gray-800 font-medium">{specialty.specialty_name}</span>
                      </label>
                    ))}
                  </div>

                  {/* Selected count */}
                  {selectedSpecialtyIds.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-200 text-sm text-gray-600">
                      <span className="font-semibold text-[#4682B4]">{selectedSpecialtyIds.length}</span> especialidad(es) seleccionada(s)
                    </div>
                  )}
                </div>
              )}

              {/* Create New Specialty */}
              <div className="mt-4">
                {!showNewSpecialtyInput ? (
                  <button
                    type="button"
                    onClick={() => setShowNewSpecialtyInput(true)}
                    className="flex items-center gap-2 text-[#4682B4] hover:text-[#3b6a93] font-semibold text-sm transition-colors"
                    disabled={isSubmitting}
                  >
                    <FaPlus />
                    ¿No encuentras la especialidad? Crear nueva
                  </button>
                ) : (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <label className="text-gray-700 font-semibold mb-2 block">
                      Nombre de la nueva especialidad
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newSpecialtyName}
                        onChange={(e) => setNewSpecialtyName(e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4682B4]"
                        placeholder="Ej: Oftalmología"
                        disabled={isCreatingSpecialty || isSubmitting}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleCreateSpecialty();
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={handleCreateSpecialty}
                        disabled={isCreatingSpecialty || isSubmitting || !newSpecialtyName.trim()}
                        className="px-4 py-2 bg-[#4682B4] text-white rounded-lg font-semibold hover:bg-[#3b6a93] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {isCreatingSpecialty ? 'Creando...' : 'Crear'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowNewSpecialtyInput(false);
                          setNewSpecialtyName('');
                        }}
                        disabled={isCreatingSpecialty || isSubmitting}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                Descripción (Opcional)
              </label>
              <textarea
                value={formData.clinic_description}
                onChange={(e) => setFormData({ ...formData, clinic_description: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4682B4] resize-none"
                placeholder="Describe brevemente tu clínica..."
                rows={4}
                disabled={isSubmitting}
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#4682B4] to-[#5C95FF] text-white py-4 rounded-lg font-bold text-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Creando Clínica...' : 'Crear Clínica'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
