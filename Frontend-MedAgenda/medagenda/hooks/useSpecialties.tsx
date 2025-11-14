"use client";

import { useEffect, useState } from "react";
import { SpecialtyDTO } from "../interfaces/specialty";
import { getSpecialties } from "../libs/specialtiesService";

export function useSpecialties() {
  const [specialties, setSpecialties] = useState<SpecialtyDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string|null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await getSpecialties();
        if (!mounted) return;
        setSpecialties(data as SpecialtyDTO[]);
      } catch (e: any) {
        if (!mounted) return;
        setError(e?.message ?? "Error al obtener especialidades");
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return { specialties, loading, error };
}
