"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ArrowPathIcon,
  BuildingOffice2Icon,
  CalendarDaysIcon,
  ClockIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
  ClipboardDocumentCheckIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Heading from "../../../components/atoms/Heading";
import { useDoctorDashboard } from "../../../hooks/useDoctorDashboard";

export default function DHome() {
  const {
    loading,
    error,
    refresh,
    timeRange,
    rangeError,
    rangeLabel,
    setRangeValue,
    applyQuickRange,
    appointmentsByClinic,
    patientHistoryGroups,
    patientQuery,
    setPatientQuery,
    stats,
    assigningPrescription,
    prescriptionError,
    prescriptionSuccess,
    submitPrescription,
  } = useDoctorDashboard();

  const [activePatient, setActivePatient] = useState<{
    patientId: number;
    patientName: string;
    clinics: { clinicId: number; clinicName: string }[];
  } | null>(null);
  const [selectedClinicId, setSelectedClinicId] = useState<number | undefined>();
  const [prescriptionDescription, setPrescriptionDescription] = useState("");

  const closeModal = () => {
    setActivePatient(null);
    setSelectedClinicId(undefined);
    setPrescriptionDescription("");
  };

  const handleSubmitPrescription = async () => {
    if (!activePatient || !selectedClinicId || !prescriptionDescription.trim()) return;
    const ok = await submitPrescription({
      patientId: activePatient.patientId,
      clinicId: selectedClinicId,
      description: prescriptionDescription.trim(),
    });
    if (ok) closeModal();
  };

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-14">
      <div className="mx-auto w-full max-w-6xl space-y-10">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <Heading text="Bienvenido" highlight="Doctor" />
          <div className="flex items-center gap-3">
            {loading && (
              <span className="flex items-center gap-2 text-sm text-gray-500">
                <ClockIcon className="h-4 w-4 animate-spin text-[#4682B4]" />
                Actualizando...
              </span>
            )}
            <button
              type="button"
              onClick={refresh}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#2e7bb4] to-[#8bccc4] px-4 py-2 text-sm font-semibold text-white shadow hover:opacity-95"
            >
              <ArrowPathIcon className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Recargar
            </button>
          </div>
        </div>

        {error && (
          <div className="flex items-center justify-between rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
            <span>{error}</span>
            <button onClick={refresh} className="text-sm font-semibold underline">
              Reintentar
            </button>
          </div>
        )}

        <section className="grid gap-6 lg:grid-cols-[1.6fr,1fr]">
          <div className="rounded-3xl bg-gradient-to-r from-[#2e7bb4] to-[#8bccc4] p-[2px] shadow">
            <div className="h-full rounded-3xl bg-white p-6 md:p-7">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#2e7bb4]">Rango de tiempo</p>
                  <h2 className="text-xl font-semibold text-gray-900">Filtra tus proximas citas</h2>
                  <p className="text-sm text-gray-600">Selecciona un tramo y agrupamos las citas por clinica.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => applyQuickRange(7)}
                    className="rounded-full border border-[#2e7bb4]/20 bg-[#2e7bb4]/10 px-3 py-1.5 text-xs font-semibold text-[#2e7bb4] hover:bg-[#2e7bb4]/15"
                  >
                    Proximos 7 dias
                  </button>
                  <button
                    type="button"
                    onClick={() => applyQuickRange(30)}
                    className="rounded-full border border-[#8bccc4]/40 bg-[#8bccc4]/20 px-3 py-1.5 text-xs font-semibold text-[#0f4a6c]"
                  >
                    Proximos 30 dias
                  </button>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm text-gray-700">
                  <span className="flex items-center gap-2 font-semibold text-gray-800">
                    <ClockIcon className="h-4 w-4 text-[#4682B4]" />
                    Desde
                  </span>
                  <input
                    type="datetime-local"
                    value={timeRange.from}
                    onChange={(e) => setRangeValue("from", e.target.value)}
                    className="rounded-xl border border-gray-200 px-3 py-2 text-sm shadow-sm outline-none focus:border-[#4682B4] focus:ring-2 focus:ring-[#4682B4]/20"
                  />
                </label>

                <label className="flex flex-col gap-2 text-sm text-gray-700">
                  <span className="flex items-center gap-2 font-semibold text-gray-800">
                    <ClockIcon className="h-4 w-4 text-[#4682B4]" />
                    Hasta
                  </span>
                  <input
                    type="datetime-local"
                    value={timeRange.to}
                    onChange={(e) => setRangeValue("to", e.target.value)}
                    className="rounded-xl border border-gray-200 px-3 py-2 text-sm shadow-sm outline-none focus:border-[#4682B4] focus:ring-2 focus:ring-[#4682B4]/20"
                  />
                </label>
              </div>

              {rangeError ? (
                <p className="mt-4 text-sm text-red-500">{rangeError}</p>
              ) : (
                <p className="mt-4 text-sm text-gray-600">
                  Rango activo: <span className="font-semibold text-gray-900">{rangeLabel}</span>
                </p>
              )}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow">
            <div className="absolute inset-0 bg-gradient-to-br from-[#2e7bb4]/10 to-[#8bccc4]/20" />
            <div className="relative flex h-full flex-col items-center gap-4 p-6">
              <Image
                src="/robot-medico.png"
                alt="Asistente medico"
                width={320}
                height={320}
                className="object-contain drop-shadow-md"
              />
              <div className="grid w-full gap-3 sm:grid-cols-2">
                <article className="rounded-2xl border border-gray-200 bg-white/80 p-4 shadow-sm backdrop-blur">
                  <div className="flex items-center gap-3">
                    <CalendarDaysIcon className="h-8 w-8 text-[#4682B4]" />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Citas en rango</p>
                      <p className="text-2xl font-semibold text-gray-900">{stats.totalUpcoming}</p>
                      <p className="text-xs text-gray-600">Futuras y agrupadas por clinica.</p>
                    </div>
                  </div>
                </article>

                <article className="rounded-2xl border border-gray-200 bg-white/80 p-4 shadow-sm backdrop-blur">
                  <div className="flex items-center gap-3">
                    <UserCircleIcon className="h-8 w-8 text-[#2e7bb4]" />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Pacientes</p>
                      <p className="text-2xl font-semibold text-gray-900">{stats.totalPatients}</p>
                      <p className="text-xs text-gray-600">Con historial registrado.</p>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-900">
                <BuildingOffice2Icon className="h-6 w-6 text-[#2e7bb4]" />
                Proximas citas por clinica
              </h2>
              <p className="text-sm text-gray-600">Trabajamos con fechas TIMESTAMP; agrupamos por clinica.</p>
            </div>
          </div>

          {rangeError ? (
            <p className="text-sm text-gray-600">Define un rango valido para ver las proximas citas.</p>
          ) : loading && appointmentsByClinic.length === 0 ? (
            <p className="text-sm text-gray-600">Cargando citas...</p>
          ) : appointmentsByClinic.length === 0 ? (
            <p className="text-sm text-gray-600">No hay citas futuras en el rango seleccionado.</p>
          ) : (
            <div className="space-y-5">
              {appointmentsByClinic.map((clinic) => (
                <article key={clinic.clinicId} className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                  <div className="flex items-center justify-between bg-gradient-to-r from-[#2e7bb4]/10 to-[#8bccc4]/20 px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow">
                        <BuildingOffice2Icon className="h-5 w-5 text-[#2e7bb4]" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{clinic.clinicName}</p>
                        <p className="text-xs text-gray-500">ID: {clinic.clinicId}</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#2e7bb4] shadow">
                      {clinic.appointments.length} cita{clinic.appointments.length === 1 ? "" : "s"}
                    </span>
                  </div>

                  <div className="divide-y divide-gray-100">
                    {clinic.appointments.map((appt) => (
                      <div key={appt.appointmentId} className="flex items-start gap-4 px-5 py-4">
                        <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#259487] to-indigo-700 text-white shadow">
                          <CalendarDaysIcon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-3">
                            <p className="font-semibold text-gray-900">{appt.patientName}</p>
                            <span className="text-xs text-gray-500">ID cita: {appt.appointmentId}</span>
                          </div>
                          <div className="mt-1 text-sm text-gray-700">
                            <p className="flex items-center gap-2">
                              <ClockIcon className="h-4 w-4 text-[#4682B4]" />
                              <span>Inicio: {appt.displayStart}</span>
                            </p>
                            <p className="mt-1 flex items-center gap-2">
                              <ClockIcon className="h-4 w-4 text-[#4682B4]" />
                              <span>Fin: {appt.displayEnd}</span>
                            </p>
                          </div>
                          {appt.description && (
                            <p className="mt-2 text-sm text-gray-600">Descripcion: {appt.description}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-900">
                <UserCircleIcon className="h-6 w-6 text-[#2e7bb4]" />
                Historial de pacientes
              </h2>
              <p className="text-sm text-gray-600">Agrupamos por paciente; filtra por nombre para encontrar historias rapido.</p>
            </div>
            <div className="relative w-full max-w-xs">
              <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={patientQuery}
                onChange={(e) => setPatientQuery(e.target.value)}
                placeholder="Filtrar por nombre"
                className="w-full rounded-full border border-gray-200 bg-white px-9 py-2 text-sm shadow-sm outline-none focus:border-[#4682B4] focus:ring-2 focus:ring-[#4682B4]/20"
              />
            </div>
          </div>

          {loading && patientHistoryGroups.length === 0 ? (
            <p className="text-sm text-gray-600">Cargando historial...</p>
          ) : patientHistoryGroups.length === 0 ? (
            <p className="text-sm text-gray-600">No hay historial para mostrar con este filtro.</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {patientHistoryGroups.map((group) => (
                <article key={group.patientId} className="rounded-2xl border border-gray-200 bg-white shadow-sm">
                  <div className="flex items-center justify-between gap-3 px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#2e7bb4] to-[#8bccc4] text-white shadow">
                        <UserCircleIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{group.patientName}</p>
                        <div className="mt-1 flex flex-wrap gap-2">
                          {group.clinics.map((clinic) => (
                            <span key={`${group.patientId}-${clinic.clinicId}`} className="rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-[11px] text-gray-700">
                              {clinic.clinicName}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setActivePatient({ patientId: group.patientId, patientName: group.patientName, clinics: group.clinics });
                        setSelectedClinicId(group.clinics[0]?.clinicId);
                        setPrescriptionDescription("");
                      }}
                      className="inline-flex items-center gap-2 rounded-full border border-[#2e7bb4] px-3 py-1.5 text-xs font-semibold text-[#2e7bb4] hover:bg-[#2e7bb4]/10"
                    >
                      <PlusIcon className="h-4 w-4" />
                      Asignar receta
                    </button>
                  </div>

                  <div className="divide-y divide-gray-100">
                    <div className="px-5 py-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Citas</p>
                    </div>
                    {group.records.length === 0 ? (
                      <div className="px-5 py-3 text-sm text-gray-600">Sin citas registradas.</div>
                    ) : (
                      group.records.map((record, idx) => (
                        <div key={`${group.patientId}-${idx}`} className="flex items-start gap-3 px-5 py-3">
                          <CalendarDaysIcon className="mt-1 h-4 w-4 text-[#4682B4]" />
                          <div className="text-sm text-gray-700">
                            <p className="font-semibold text-gray-900">{record.displayDate}</p>
                            <p className="text-gray-600">{record.description || "Sin descripcion"}</p>
                            <p className="text-xs text-gray-500">{record.clinicName}</p>
                          </div>
                        </div>
                      ))
                    )}

                    <div className="px-5 py-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Prescripciones</p>
                    </div>
                    {group.prescriptions.length === 0 ? (
                      <div className="px-5 py-3 text-sm text-gray-600">Sin prescripciones registradas.</div>
                    ) : (
                      group.prescriptions.map((pres, idx) => {
                        const clinic = group.clinics.find((c) => c.clinicId === pres.clinicId);
                        return (
                          <div key={`${group.patientId}-pres-${idx}`} className="flex items-start gap-3 px-5 py-3">
                            <ClipboardDocumentCheckIcon className="mt-1 h-4 w-4 text-[#259487]" />
                            <div className="text-sm text-gray-700">
                              <p className="font-semibold text-gray-900">{pres.displayDate}</p>
                              <p className="text-gray-600">{pres.description}</p>
                              <p className="text-xs text-gray-500">{clinic ? clinic.clinicName : `Clinica ${pres.clinicId}`}</p>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>

      {activePatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Asignar receta</p>
                <h3 className="text-lg font-semibold text-gray-900">{activePatient.patientName}</h3>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="rounded-full p-1 text-gray-500 hover:bg-gray-100"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <label className="block text-sm text-gray-700">
                Clinica
                <select
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#2e7bb4] focus:ring-2 focus:ring-[#2e7bb4]/20"
                  value={selectedClinicId ?? ""}
                  onChange={(e) => setSelectedClinicId(e.target.value ? Number(e.target.value) : undefined)}
                >
                  <option value="">Selecciona una clinica</option>
                  {activePatient.clinics.map((c) => (
                    <option key={c.clinicId} value={c.clinicId}>
                      {c.clinicName}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block text-sm text-gray-700">
                Descripcion
                <textarea
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#2e7bb4] focus:ring-2 focus:ring-[#2e7bb4]/20"
                  rows={4}
                  value={prescriptionDescription}
                  onChange={(e) => setPrescriptionDescription(e.target.value)}
                  placeholder="Escribe la receta o indicaciones"
                />
              </label>

              {prescriptionError && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                  {prescriptionError}
                </div>
              )}
              {prescriptionSuccess && (
                <div className="rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
                  {prescriptionSuccess}
                </div>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-full border border-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleSubmitPrescription}
                  disabled={assigningPrescription || !selectedClinicId || !prescriptionDescription.trim()}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-[#259487] to-indigo-700 px-4 py-2 text-sm font-semibold text-white shadow disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {assigningPrescription ? "Asignando..." : "Asignar receta"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
