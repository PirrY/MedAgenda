"use client";

import { useEffect, useState } from "react";
import { getCountries } from "../libs/locationService";

export interface Country {
  country_id: number;
  country_name: string;
}

export function useCountries() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await getCountries();
        if (!mounted) return;
        setCountries(data as Country[]);
      } catch (e: any) {
        if (!mounted) return;
        setError(e?.message ?? "Error al obtener países");
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return { countries, loading, error };
}
