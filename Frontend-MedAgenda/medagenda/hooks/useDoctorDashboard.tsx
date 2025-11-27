"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Appointment } from "../interfaces/appointment";
import { PatientHistory } from "../interfaces/doctor";
import { getDoctorAppointments, getDoctorPatientHistories } from "../libs/doctorService";

type TimeRange = { from: string; to: string };

export type AppointmentCard = {
  appointmentId: number;
  patientName: string;
  description?: string;
  startRaw: string;
  endRaw: string;
  displayStart: string;
  displayEnd: string;
};

export type ClinicAppointmentsView = {
  clinicId: number;
  clinicName: string;
  appointments: AppointmentCard[];
};

export type PatientHistoryGroup = {
  patientName: string;
  records: {
    appointmentDate: string;
    displayDate: string;
    description?: string;
  }[];
};

const toLocalInputValue = (date: Date) => {
  const pad = (num: number) => num.toString().padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

const buildDefaultRange = (): TimeRange => {
  const start = new Date();
  const end = new Date();
  end.setDate(end.getDate() + 14);
  return { from: toLocalInputValue(start), to: toLocalInputValue(end) };
};

const parseTimestamp = (value: string): Date | null => {
  if (!value) return null;
  const normalized = value.includes("T") ? value : value.replace(" ", "T");
  const parsed = new Date(normalized);
  return isNaN(parsed.getTime()) ? null : parsed;
};

const formatDateTime = (value: string) => {
  const date = parseTimestamp(value);
  if (!date) return value;
  return new Intl.DateTimeFormat("es-ES", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};

const formatAppointmentPatient = (appointment: Appointment) =>
  [appointment.first_name, appointment.second_name, appointment.first_last_name, appointment.second_last_name]
    .filter(Boolean)
    .join(" ")
    .trim();

const formatHistoryPatient = (history: PatientHistory) =>
  [history.first_name, history.second_name, history.first_last_name]
    .filter(Boolean)
    .join(" ")
    .trim();

export function useDoctorDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patientHistories, setPatientHistories] = useState<PatientHistory[]>([]);
  const [timeRange, setTimeRange] = useState<TimeRange>(() => buildDefaultRange());
  const [patientQuery, setPatientQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [appointmentsData, historiesData] = await Promise.all([
        getDoctorAppointments(),
        getDoctorPatientHistories(),
      ]);
      setAppointments(appointmentsData ?? []);
      setPatientHistories(historiesData ?? []);
    } catch (err: any) {
      setError(err?.message ?? "Error al obtener la información del doctor");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const rangeDates = useMemo(() => {
    const from = timeRange.from ? new Date(timeRange.from) : null;
    const to = timeRange.to ? new Date(timeRange.to) : null;
    return {
      from: from && !isNaN(from.getTime()) ? from : null,
      to: to && !isNaN(to.getTime()) ? to : null,
    };
  }, [timeRange]);

  const isRangeValid = useMemo(() => {
    if (!rangeDates.from || !rangeDates.to) return false;
    return rangeDates.from <= rangeDates.to;
  }, [rangeDates]);

  const rangeError = useMemo(() => {
    if (!timeRange.from || !timeRange.to) return "Selecciona el inicio y fin del rango.";
    if (!isRangeValid) return "La fecha inicial debe ser anterior o igual a la final.";
    return null;
  }, [timeRange, isRangeValid]);

  const rangeLabel = useMemo(() => {
    if (!rangeDates.from || !rangeDates.to) return "";
    const formatter = new Intl.DateTimeFormat("es-ES", { dateStyle: "medium", timeStyle: "short" });
    return `${formatter.format(rangeDates.from)} - ${formatter.format(rangeDates.to)}`;
  }, [rangeDates]);

  const setRangeValue = (key: keyof TimeRange, value: string) => {
    setTimeRange((prev) => ({ ...prev, [key]: value }));
  };

  const applyQuickRange = (daysAhead: number) => {
    const start = new Date();
    const end = new Date();
    end.setDate(end.getDate() + daysAhead);
    setTimeRange({ from: toLocalInputValue(start), to: toLocalInputValue(end) });
  };

  const upcomingAppointments = useMemo(() => {
    if (!isRangeValid) return [];
    const now = new Date();

    return appointments
      .map((appt) => {
        const startDate = parseTimestamp(appt.start_date_time);
        const endDate = parseTimestamp(appt.end_date_time);
        if (!startDate) return null;
        return { ...appt, startDate, endDate };
      })
      .filter((appt): appt is Appointment & { startDate: Date; endDate: Date | null } => {
        if (!appt) return false;
        if (appt.startDate < now) return false;
        if (rangeDates.from && appt.startDate < rangeDates.from) return false;
        if (rangeDates.to && appt.startDate > rangeDates.to) return false;
        return true;
      })
      .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
  }, [appointments, rangeDates, isRangeValid]);

  const appointmentsByClinic = useMemo<ClinicAppointmentsView[]>(() => {
    const grouped: Record<number, ClinicAppointmentsView> = {};

    upcomingAppointments.forEach((appt) => {
      const clinicId = appt.clinic_id;
      if (!grouped[clinicId]) {
        grouped[clinicId] = {
          clinicId,
          clinicName: appt.clinic_name,
          appointments: [],
        };
      }

      grouped[clinicId].appointments.push({
        appointmentId: appt.appointment_id,
        patientName: formatAppointmentPatient(appt),
        description: appt.appointment_description,
        startRaw: appt.start_date_time,
        endRaw: appt.end_date_time,
        displayStart: formatDateTime(appt.start_date_time),
        displayEnd: formatDateTime(appt.end_date_time),
      });
    });

    return Object.values(grouped).sort((a, b) => a.clinicName.localeCompare(b.clinicName, "es"));
  }, [upcomingAppointments]);

  const patientHistoryGroups = useMemo<PatientHistoryGroup[]>(() => {
    const normalizedQuery = patientQuery.trim().toLowerCase();
    const grouped: Record<string, PatientHistoryGroup> = {};

    patientHistories.forEach((history) => {
      const patientName = formatHistoryPatient(history) || "Paciente sin nombre";
      const key = patientName.toLowerCase();

      if (!grouped[key]) {
        grouped[key] = { patientName, records: [] };
      }

      grouped[key].records.push({
        appointmentDate: history.appointment_date,
        displayDate: formatDateTime(history.appointment_date),
        description: history.appointment_description,
      });
    });

    let groups = Object.values(grouped).map((group) => ({
      ...group,
      records: [...group.records].sort((a, b) => {
        const dateA = parseTimestamp(a.appointmentDate)?.getTime() ?? 0;
        const dateB = parseTimestamp(b.appointmentDate)?.getTime() ?? 0;
        return dateB - dateA;
      }),
    }));

    if (normalizedQuery) {
      groups = groups.filter((g) => g.patientName.toLowerCase().includes(normalizedQuery));
    }

    return groups.sort((a, b) => a.patientName.localeCompare(b.patientName, "es"));
  }, [patientHistories, patientQuery]);

  const stats = useMemo(() => ({
    totalUpcoming: appointmentsByClinic.reduce((acc, clinic) => acc + clinic.appointments.length, 0),
    totalPatients: patientHistoryGroups.length,
  }), [appointmentsByClinic, patientHistoryGroups]);

  return {
    loading,
    error,
    refresh,
    timeRange,
    rangeError,
    rangeLabel,
    isRangeValid,
    setRangeValue,
    applyQuickRange,
    appointmentsByClinic,
    patientHistoryGroups,
    patientQuery,
    setPatientQuery,
    stats,
  };
}
