"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Clinic } from "../interfaces/clinic";
import { Doctor } from "../interfaces/doctor";
import { getClinicDetails, getClinicDoctors } from "../libs/clinicsService";

export function useClinicDetail(clinicId: number) {
  const [clinic, setClinic] = useState<Clinic | null>(null);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loadingClinic, setLoadingClinic] = useState(false);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [errorClinic, setErrorClinic] = useState<string | null>(null);
  const [errorDoctors, setErrorDoctors] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    if (!Number.isFinite(clinicId)) return;
    let mounted = true;
    setLoadingClinic(true);
    setLoadingDoctors(true);
    setErrorClinic(null);
    setErrorDoctors(null);
    try {
      const [c, ds] = await Promise.all([getClinicDetails(clinicId), getClinicDoctors(clinicId)]);
      if (!mounted) return;
      setClinic(c);
      setDoctors(Array.isArray(ds) ? ds : []);
    } catch (e: any) {
      if (!mounted) return;
      const msg = e?.message || "Error al cargar la clínica";
      setErrorClinic(msg);
      setErrorDoctors(msg);
    } finally {
      if (!mounted) return;
      setLoadingClinic(false);
      setLoadingDoctors(false);
    }
    return () => {
      mounted = false;
    };
  }, [clinicId]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const clinicSpecialties = useMemo(() => {
    const m = new Map<number, { specialty_id: number; specialty_name: string; specialty_description?: string }>();
    doctors.forEach(d => d.specialties?.forEach(s => m.set(s.specialty_id, s)));
    return Array.from(m.values());
  }, [doctors]);

  const refetch = () => fetchAll();

  return { clinic, doctors, clinicSpecialties, loadingClinic, loadingDoctors, errorClinic, errorDoctors, refetch };
}
