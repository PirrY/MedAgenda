"use client";

import { useMemo, useState } from "react";
import { useCountries } from "./useCountries";
import { useStates } from "./useStates";
import { useCities } from "./useCities";
import { useSpecialties } from "./useSpecialties";
import { useClinicsSearch, ClinicSearchFilters } from "./useClinicsSearch";

export function useClinicSearchController() {
  const [countryId, setCountryId] = useState<number | null>(null);
  const [stateId, setStateId] = useState<number | null>(null);
  const [cityId, setCityId] = useState<number | null>(null);
  const [selectedSpecialtyIds, setSelectedSpecialtyIds] = useState<number[]>([]);
  const [specialtyOpen, setSpecialtyOpen] = useState(false);
  const [submittedFilters, setSubmittedFilters] = useState<ClinicSearchFilters | undefined>(undefined);

  const { countries, loading: loadingCountries, error: errorCountries } = useCountries();
  const { states, loading: loadingStates, error: errorStates } = useStates(countryId ?? undefined);
  const { cities, loading: loadingCities, error: errorCities } = useCities(stateId);
  const { specialties, loading: loadingSpecialties, error: errorSpecialties } = useSpecialties();
  const { clinics, loading: loadingClinics, error: errorClinics } = useClinicsSearch(submittedFilters);

  const selectedCount = selectedSpecialtyIds.length;
  const selectedLabel = useMemo(() => {
    if (loadingSpecialties) return "Cargando especialidades...";
    if (selectedCount === 0) return "Cualquiera";
    if (selectedCount === 1) {
      const s = specialties.find(x => x.specialty_id === selectedSpecialtyIds[0]);
      return s ? s.specialty_name : "1 seleccionada";
    }
    return `${selectedCount} seleccionadas`;
  }, [loadingSpecialties, selectedCount, specialties, selectedSpecialtyIds]);

  const onCountryChange = (val: number | null) => {
    setCountryId(val);
    setStateId(null);
    setCityId(null);
    setSubmittedFilters(undefined);
  };

  const onStateChange = (val: number | null) => {
    setStateId(val);
    setCityId(null);
    setSubmittedFilters(undefined);
  };

  const toggleSpecialty = (id: number) => {
    setSelectedSpecialtyIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const clearSpecialties = () => setSelectedSpecialtyIds([]);

  const openCloseSpecialty = () => setSpecialtyOpen(o => !o);
  const closeSpecialty = () => setSpecialtyOpen(false);

  const canSearch = !!countryId;

  const handleSearch = () => {
    if (!countryId) return;
    setSubmittedFilters({
      countryId,
      stateId: stateId ?? undefined,
      cityId: cityId ?? undefined,
      specialtyIds: selectedSpecialtyIds.length ? selectedSpecialtyIds : undefined,
    });
    setSpecialtyOpen(false);
  };

  const hasErrors = errorCountries || errorStates || errorCities || errorClinics || errorSpecialties;

  return {
    countries, loadingCountries, errorCountries,
    states, loadingStates, errorStates,
    cities, loadingCities, errorCities,
    specialties, loadingSpecialties, errorSpecialties,
    clinics, loadingClinics, errorClinics,
    hasErrors,
    countryId, stateId, cityId,
    selectedSpecialtyIds, specialtyOpen, selectedLabel, submittedFilters,
    onCountryChange, onStateChange,
    setCityId,
    toggleSpecialty, clearSpecialties,
    openCloseSpecialty, closeSpecialty,
    canSearch, handleSearch,
  };
}
