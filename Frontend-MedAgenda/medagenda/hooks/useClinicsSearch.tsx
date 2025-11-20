"use client";

import { useEffect, useState } from "react";
import { Clinic } from "../interfaces/clinic";
import { getClinicsByCity, getClinicsByCountry, getClinicsByState, getClinicsWithSpecialtiesInCity, getClinicsWithSpecialtiesInCountry } from "../libs/clinicsService";

export type ClinicSearchFilters = {
  countryId: number;
  stateId?: number | null;
  cityId?: number | null;
  specialtyIds?: number[];
};

export const getClinics = (filters: ClinicSearchFilters): Promise<Clinic[]> => {
  const { countryId, stateId, cityId, specialtyIds } = filters;

  if (specialtyIds && specialtyIds.length > 0) {
    if (cityId) {
      return getClinicsWithSpecialtiesInCity(specialtyIds, cityId);
    }
    return getClinicsWithSpecialtiesInCountry(specialtyIds, countryId);
  }

  if (cityId) {
    return getClinicsByCity(cityId);
  }

  if (stateId) {
    return getClinicsByState(stateId);
  }

  return getClinicsByCountry(countryId);
};

export function useClinicsSearch(filters?: ClinicSearchFilters) {
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState<string|null>(null);

  useEffect(() => {
    if (!filters?.countryId) {
      setClinics([]);
      return;
    }
    let mounted = true;
    setLoading(true);
    setError(null);

    (async () => {
      try {
        const data = await getClinics(filters);
        if (!mounted) return;
        setClinics(data);
      } catch (e: any) {
        if (!mounted) return;
        setError(e?.message ?? "Error al obtener clínicas");
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    })();

    return () => { mounted = false; };
  }, [filters?.countryId, filters?.stateId, filters?.cityId, JSON.stringify(filters?.specialtyIds ?? [])]);

  return { clinics, loading, error };
}
