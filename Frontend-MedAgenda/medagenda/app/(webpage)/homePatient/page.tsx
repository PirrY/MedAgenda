"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FaCalendarCheck, FaFileMedical } from "react-icons/fa";
import CalendarComponent from "../../../components/organisms/Calendar";
import useAuth from "../../../hooks/useAuth";
import { getPatientAppointments } from "../../../libs/appointmentService";
import { DoctorAppointmentView } from "../../../interfaces/appointment";
import { usePatientPrescriptions } from "../../../hooks/usePatientPrescriptions";

const formatDateTime = (value: string) => {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return new Intl.DateTimeFormat("es-ES", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(d);
};

export default function PHome() {
  const router = useRouter();
  const { getFirstName, isLoading: authLoading } = useAuth();
  const [appointments, setAppointments] = useState<DoctorAppointmentView[]>([]);
  const [isLoadingAppointments, setIsLoadingAppointments] = useState(true);
  const prescriptions = usePatientPrescriptions();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getPatientAppointments();
        setAppointments(data ?? []);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setAppointments([]);
      } finally {
        setIsLoadingAppointments(false);
      }
    };

    fetchAppointments();
  }, []);

  const firstName = getFirstName();

  const upcomingCount = appointments.filter((a) => new Date(a.start_date_time) > new Date()).length;
  const clinicsVisited = new Set(appointments.map((a) => a.clinic_id)).size;

  const pastAppointments = useMemo(
    () =>
      appointments
        .map((a) => ({
          ...a,
          startDate: new Date(a.start_date_time),
        }))
        .filter((a) => a.startDate <= new Date())
        .sort((a, b) => b.startDate.getTime() - a.startDate.getTime()),
    [appointments],
  );

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <main className="flex-grow flex flex-col items-center px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
            {authLoading ? (
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                Bienvenido
              </span>
            ) : (
              <>
                Hola,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                  {firstName || "Paciente"}
                </span>
              </>
            )}
          </h1>
          <p className="text-gray-600 text-lg">Gestiona tu salud de manera facil y rapida</p>
        </div>

        <div className="w-full max-w-7xl mb-12">
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <FaCalendarCheck className="text-blue-600 text-3xl" />
              <h2 className="text-2xl font-bold text-gray-800">Tus Proximas Citas</h2>
            </div>
            <CalendarComponent appointments={appointments} isLoading={isLoadingAppointments} />
          </div>
        </div>

        {!isLoadingAppointments && (
          <div className="w-full max-w-7xl mt-12">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-8 text-white shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-4xl font-bold mb-2">{appointments.length}</p>
                  <p className="text-blue-100">
                    {appointments.length === 1 ? "Cita Agendada" : "Citas Agendadas"}
                  </p>
                </div>
                <div>
                  <p className="text-4xl font-bold mb-2">{clinicsVisited}</p>
                  <p className="text-blue-100">
                    {clinicsVisited === 1 ? "Clinica Visitada" : "Clinicas Visitadas"}
                  </p>
                </div>
                <div>
                  <p className="text-4xl font-bold mb-2">{upcomingCount}</p>
                  <p className="text-blue-100">
                    {upcomingCount === 1 ? "Cita Proxima" : "Citas Proximas"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div id="formulas" className="w-full max-w-7xl mt-12">
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <FaFileMedical className="text-blue-600 text-3xl" />
              <h2 className="text-2xl font-bold text-gray-800">Mis Formulas</h2>
            </div>

            {prescriptions.loading ? (
              <p className="text-sm text-gray-600">Cargando formulas...</p>
            ) : prescriptions.error ? (
              <p className="text-sm text-red-600">{prescriptions.error}</p>
            ) : prescriptions.groups.length === 0 ? (
              <p className="text-sm text-gray-600">Aun no tienes formulas registradas.</p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {prescriptions.groups.map((group) => (
                  <article key={group.clinicId} className="rounded-xl border border-gray-200 p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs uppercase text-gray-500">Clinica</p>
                        <p className="font-semibold text-gray-900">{group.clinicName}</p>
                      </div>
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                        {group.items.length} formula{group.items.length === 1 ? "" : "s"}
                      </span>
                    </div>
                    <div className="mt-4 space-y-3">
                      {group.items.map((item, idx) => (
                        <div
                          key={`${group.clinicId}-${idx}`}
                          className="rounded-lg border border-gray-100 bg-gray-50 p-3"
                        >
                          <p className="text-sm font-semibold text-gray-900">{item.displayDate}</p>
                          <p className="text-sm text-gray-700">{item.description}</p>
                          <p className="text-xs text-gray-500 mt-1">Dr(a): {item.doctorName}</p>
                        </div>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="w-full max-w-7xl mt-12">
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <FaCalendarCheck className="text-blue-600 text-3xl" />
              <h2 className="text-2xl font-bold text-gray-800">Historial de Citas</h2>
            </div>
            {isLoadingAppointments ? (
              <p className="text-sm text-gray-600">Cargando historial...</p>
            ) : pastAppointments.length === 0 ? (
              <p className="text-sm text-gray-600">Aun no tienes citas pasadas.</p>
            ) : (
              <div className="space-y-3">
                {pastAppointments.map((appt) => (
                  <div key={appt.appointment_id} className="rounded-xl border border-gray-200 p-4 shadow-sm bg-gray-50">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-gray-900">{appt.clinic_name}</p>
                      <p className="text-xs text-gray-500">ID: {appt.appointment_id}</p>
                    </div>
                    <p className="text-sm text-gray-700 mt-1">
                      {formatDateTime(appt.start_date_time)} - {formatDateTime(appt.end_date_time)}
                    </p>
                    <p className="text-sm text-gray-700 mt-1">
                      Doctor: {[appt.first_name, appt.second_name, appt.first_last_name, appt.second_last_name].filter(Boolean).join(" ")}
                    </p>
                    {appt.appointment_description && (
                      <p className="text-sm text-gray-600 mt-1">Notas: {appt.appointment_description}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
