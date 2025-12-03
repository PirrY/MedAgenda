import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { searchCities, createClinic } from '../libs/clinicsService';
import { CitySearchResult, CreateClinicDTO } from '../interfaces/clinic';
import { getSpecialties, addSpecialtiesToClinic, createSpecialty } from '../libs/specialtiesService';
import { SpecialtyDTO } from '../interfaces/specialty';
import { searchStates, searchCountries, createCity as createCityService, createState as createStateService, createCountry as createCountryService } from '../libs/locationService';
import { StateSearchResult, CountrySearchResult } from '../interfaces/location';
import { getUserAdminClinics } from '../libs/adminService';
import { useFormGuard } from './useFormGuard';
import { sanitizeString, validateName, validatePhone, INPUT_LIMITS } from '../utils/validation';

export default function useCreateClinicForm() {
  const router = useRouter();
  const { isSubmitting, startSubmission, endSubmission } = useFormGuard(10000);

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

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Load specialties
  useEffect(() => {
    const loadSpecialties = async () => {
      try {
        const data = await getSpecialties();
        setSpecialties(data);
      } catch (err) {
        // Error loading specialties
      } finally {
        setLoadingSpecialties(false);
      }
    };
    loadSpecialties();
  }, []);

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
        setCountryResults([]);
      } finally {
        setIsSearchingCountries(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [countrySearch, selectedCountry]);

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

    // Check form guard
    if (!startSubmission()) {
      setError('Formulario ya está siendo enviado. Por favor espera.');
      return;
    }

    // Sanitize inputs
    const sanitizedName = sanitizeString(formData.clinic_name.trim());
    const sanitizedPhone = sanitizeString(formData.clinic_phone_number.trim());
    const sanitizedAddress = sanitizeString(formData.clinic_address.trim());
    const sanitizedDescription = formData.clinic_description ? sanitizeString(formData.clinic_description.trim()) : '';

    // Validation
    const nameValidation = validateName(sanitizedName);
    if (!nameValidation.valid) {
      setError(nameValidation.error ?? null);
      endSubmission();
      return;
    }

    const phoneValidation = validatePhone(sanitizedPhone);
    if (!phoneValidation.valid) {
      setError(phoneValidation.error ?? null);
      endSubmission();
      return;
    }

    if (!sanitizedAddress) {
      setError('La dirección es requerida');
      endSubmission();
      return;
    }
    if (sanitizedAddress.length > INPUT_LIMITS.ADDRESS) {
      setError(`La dirección no puede exceder ${INPUT_LIMITS.ADDRESS} caracteres`);
      endSubmission();
      return;
    }

    if (!citySearch.trim()) {
      setError('La ciudad es requerida');
      endSubmission();
      return;
    }

    if (showNewCityFields) {
      if (!stateSearch.trim()) {
        setError('El estado es requerido para crear una nueva ciudad');
        endSubmission();
        return;
      }

      if (showNewStateFields) {
        if (!countrySearch.trim()) {
          setError('El país es requerido para crear un nuevo estado');
          endSubmission();
          return;
        }

        if (!selectedCountry && !countrySearch.trim()) {
          setError('Por favor selecciona o escribe un país');
          endSubmission();
          return;
        }
      } else if (!selectedState) {
        setError('Por favor selecciona un estado de la lista');
        endSubmission();
        return;
      }
    } else if (!selectedCity) {
      setError('Por favor selecciona una ciudad de la lista');
      endSubmission();
      return;
    }

    if (selectedSpecialtyIds.length === 0) {
      setError('Debes seleccionar al menos una especialidad');
      endSubmission();
      return;
    }

    try {
      // STEP 1: Create/Get Country ID
      let countryId: number = 0;
      if (showNewStateFields && !selectedCountry) {
        const newCountry = await createCountryService({ country_name: countrySearch.trim() });
        countryId = newCountry.country_id;
      } else if (selectedCountry) {
        countryId = selectedCountry.country_id;
      }

      // STEP 2: Create/Get State ID
      let stateId: number = 0;
      if (showNewCityFields) {
        if (showNewStateFields) {
          const newState = await createStateService({
            state_name: stateSearch.split(',')[0].trim(),
            country_id: countryId!,
          });
          stateId = newState.state_id;
        } else {
          stateId = selectedState!.state_id;
        }
      }

      // STEP 3: Create/Get City ID
      let cityId: number = 0;
      if (showNewCityFields) {
        const newCity = await createCityService({
          city_name: citySearch.trim(),
          state_id: stateId!,
        });
        cityId = newCity.city_id;
      } else {
        cityId = selectedCity!.city_id;
      }

      // STEP 4: Create clinic with sanitized data
      const clinicData: CreateClinicDTO = {
        clinic_name: sanitizedName,
        clinic_phone_number: sanitizedPhone,
        clinic_address: sanitizedAddress,
        clinic_description: sanitizedDescription || undefined,
        clinic_city_id: cityId,
      };

      const createdClinic = await createClinic(clinicData);

      // STEP 5: Add specialties to the created clinic
      if (selectedSpecialtyIds.length > 0) {
        await addSpecialtiesToClinic(createdClinic.clinic_id, selectedSpecialtyIds);
      }

      setSuccess(true);

      // Dar tiempo al backend para procesar el rol, luego verificar
      setTimeout(async () => {
        try {
          const userClinics = await getUserAdminClinics();

          if (userClinics && userClinics.length > 0) {
            Cookies.set('isAdmin', 'true', { expires: 7 });

            const hasDoctorRole = userClinics.some(clinic =>
              clinic.role_within_clinic.toLowerCase() === 'doctor'
            );
            if (hasDoctorRole) {
              Cookies.set('isDoctor', 'true', { expires: 7 });
            }

            router.push('/homeAdmin');
          } else {
            window.location.href = '/homeAdmin';
          }
        } catch (refreshError: any) {
          Cookies.set('isAdmin', 'true', { expires: 7 });
          window.location.href = '/homeAdmin';
        }
      }, 1000);
    } catch (err: any) {
      setError(err?.message || 'Error al crear la clínica');
      endSubmission();
    }
  };

  return {
    formData,
    setFormData,
    citySearch,
    cityResults,
    selectedCity,
    showCityDropdown,
    isSearchingCities,
    showNewCityFields,
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
    specialties,
    selectedSpecialtyIds,
    loadingSpecialties,
    showNewSpecialtyInput,
    newSpecialtyName,
    isCreatingSpecialty,
    isSubmitting,
    error,
    success,
    handleCitySelect,
    handleCityInputChange,
    handleStateSelect,
    handleStateInputChange,
    handleCountrySelect,
    handleCountryInputChange,
    toggleSpecialty,
    handleCreateSpecialty,
    handleSubmit,
    setShowCityDropdown,
    setShowStateDropdown,
    setShowCountryDropdown,
    setNewSpecialtyName,
    setShowNewSpecialtyInput,
    setError,
  };
}
