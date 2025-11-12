"use client";

import { useEffect, useState } from "react";
import { getClinicsByCity } from "../libs/clinicsService";
import { Clinic } from "../interfaces/clinics";

export function useClinicsByCity(cityId?: number) {
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!cityId) {
      setClinics([]);
      return;
    }

    let isMounted = true;
    setLoading(true);

    const fetchClinics = async () => {
      try {
        const data = await getClinicsByCity(cityId); // pega a /clinics/getAllClinicsInCity?city_id=...
        if (!isMounted) return;
        setClinics(data);
      } catch (err: any) {
        if (!isMounted) return;
        setError(err?.message ?? "Error al obtener clínicas");
      } finally {
        if (!isMounted) return;
        setLoading(false);
      }
    };

    fetchClinics();
    return () => {
      isMounted = false;
    };
  }, [cityId]);

  return { clinics, loading, error };
}
