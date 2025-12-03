"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { DoctorAppointmentView } from "../interfaces/appointment";
import { getPatientAppointments } from "../libs/appointmentService";

type PastAppointment = {
  appointmentId: number;
  clinicName: string;
  startDisplay: string;
  endDisplay: string;
  doctorName: string;
  description?: string;
};

const formatDateTime = (value: string) => {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return new Intl.DateTimeFormat("es-ES", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(d);
};

const formatDoctorName = (a: DoctorAppointmentView) =>
  [a.first_name, a.second_name, a.first_last_name, a.second_last_name].filter(Boolean).join(" ");

export function usePatientDashboard() {
  const [appointments, setAppointments] = useState<DoctorAppointmentView[]>([]);
  const [loadingAppointments, setLoadingAppointments] = useState(true);
  const [appointmentsError, setAppointmentsError] = useState<string | null>(null);

  const refreshAppointments = useCallback(async () => {
    setLoadingAppointments(true);
    setAppointmentsError(null);
    try {
      const data = await getPatientAppointments();
      setAppointments(data ?? []);
    } catch (error: any) {
      setAppointments([]);
      setAppointmentsError(error?.message ?? "No se pudieron cargar tus citas.");
    } finally {
      setLoadingAppointments(false);
    }
  }, []);

  useEffect(() => {
    refreshAppointments();
  }, [refreshAppointments]);

  const upcomingCount = useMemo(
    () => appointments.filter((a) => new Date(a.start_date_time) > new Date()).length,
    [appointments],
  );

  const clinicsVisited = useMemo(
    () => new Set(appointments.map((a) => a.clinic_id)).size,
    [appointments],
  );

  const pastAppointments = useMemo<PastAppointment[]>(() => {
    const now = new Date();
    return appointments
      .map((a) => ({
        appointmentId: a.appointment_id,
        clinicName: a.clinic_name,
        startDisplay: formatDateTime(a.start_date_time),
        endDisplay: formatDateTime(a.end_date_time),
        doctorName: formatDoctorName(a),
        description: a.appointment_description,
        startDate: new Date(a.start_date_time),
      }))
      .filter((a) => a.startDate <= now)
      .sort((a, b) => b.startDate.getTime() - a.startDate.getTime())
      .map(({ startDate, ...rest }) => rest);
  }, [appointments]);

  return {
    appointments,
    loadingAppointments,
    appointmentsError,
    upcomingCount,
    clinicsVisited,
    pastAppointments,
    refreshAppointments,
  };
}
