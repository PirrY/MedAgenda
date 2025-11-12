"use client";

import { useEffect, useState } from "react";
import { getStatesByCountry } from "../libs/locationService";
import { State } from "../interfaces/location";

export function useStates(countryId?: number) {
  const [states, setStates] = useState<State[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!countryId) {
      setStates([]);
      return;
    }

    let isMounted = true;
    setLoading(true);

    const fetchStates = async () => {
      try {
        const data = await getStatesByCountry(countryId); 
        if (!isMounted) return;
        setStates(data);
      } catch (err: any) {
        if (!isMounted) return;
        setError(err?.message ?? "Error al obtener estados");
      } finally {
        if (!isMounted) return;
        setLoading(false);
      }
    };

    fetchStates();
    return () => {
      isMounted = false;
    };
  }, [countryId]);

  return { states, loading, error };
}
