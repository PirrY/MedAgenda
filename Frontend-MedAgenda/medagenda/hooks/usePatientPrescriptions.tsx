"use client";

import { useEffect, useMemo, useState } from "react";
import { PrescriptionsPatientView } from "../interfaces/prescriptions";
import { getUserPrescriptions } from "../libs/userService";

export type PrescriptionGroup = {
  clinicId: number;
  clinicName: string;
  items: {
    dateRaw: string;
    displayDate: string;
    description: string;
    doctorName: string;
  }[];
};

const formatDoctorName = (p: PrescriptionsPatientView) =>
  [p.doctor_first_name, p.doctor_second_name, p.doctor_last_name].filter(Boolean).join(" ");

const formatDate = (value: string) => {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return new Intl.DateTimeFormat("es-ES", { dateStyle: "medium", timeStyle: "short" }).format(d);
};

export function usePatientPrescriptions() {
  const [prescriptions, setPrescriptions] = useState<PrescriptionsPatientView[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getUserPrescriptions();
        setPrescriptions(data ?? []);
      } catch (err: any) {
        setError(err?.message ?? "No se pudieron cargar tus formulas.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const groups = useMemo<PrescriptionGroup[]>(() => {
    const grouped: Record<number, PrescriptionGroup> = {};
    prescriptions.forEach((p) => {
      const clinicId = Number(p.clinic_id);
      if (!grouped[clinicId]) {
        grouped[clinicId] = {
          clinicId,
          clinicName: p.clinic_name || `Clinica ${clinicId}`,
          items: [],
        };
      }
      grouped[clinicId].items.push({
        dateRaw: p.date_emitted,
        displayDate: formatDate(p.date_emitted),
        description: p.prescription_description,
        doctorName: formatDoctorName(p),
      });
    });

    return Object.values(grouped)
      .map((g) => ({
        ...g,
        items: g.items.sort(
          (a, b) => (new Date(b.dateRaw).getTime() || 0) - (new Date(a.dateRaw).getTime() || 0),
        ),
      }))
      .sort((a, b) => a.clinicName.localeCompare(b.clinicName, "es"));
  }, [prescriptions]);

  return { loading, error, groups, hasData: prescriptions.length > 0 };
}
