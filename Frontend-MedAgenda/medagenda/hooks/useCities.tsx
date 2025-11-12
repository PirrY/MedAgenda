"use client";

import { useEffect, useState } from "react";
import { getCitiesByState } from "../libs/locationService";

export interface City {
  city_id: number;
  city_name: string;
  state_id: number;
}

export function useCities(stateId?: number | null) {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!stateId) {
      setCities([]);
      return;
    }

    let mounted = true;
    setLoading(true);

    (async () => {
      try {
        const data = await getCitiesByState(stateId);
        if (!mounted) return;
        setCities(data as City[]);
      } catch (e: any) {
        if (!mounted) return;
        setError(e?.message ?? "Error al obtener ciudades");
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [stateId]);

  return { cities, loading, error };
}
