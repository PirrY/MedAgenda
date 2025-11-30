"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeftIcon, CalendarDaysIcon, CheckCircleIcon, ClockIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useClinicDoctorSchedule } from "../../../../../../hooks/useClinicDoctorSchedule";

export default function ScheduleAppointmentPage() {
  const params = useParams();
  const clinicId = Number(params.clinic_id);
  const doctorId = Number(params.doctor_id);
  const scheduler = useClinicDoctorSchedule(clinicId, doctorId);

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-3">
            <Link
              href={`/Clinics/${clinicId}`}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm hover:bg-gray-50"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Volver a la clinica
            </Link>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Agenda</p>
              <h1 className="text-2xl font-semibold text-gray-900">Selecciona fecha y hora</h1>
              <p className="text-sm text-gray-600">Mostramos solo dias y horas futuras segun las reglas de la clinica.</p>
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Reglas de la clinica</p>
            <dl className="mt-2 grid grid-cols-2 gap-3 text-sm text-gray-800">
              <div>
                <dt className="text-xs uppercase text-gray-500">Apertura</dt>
                <dd className="font-semibold">{scheduler.ruleSummary.opening}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase text-gray-500">Cierre</dt>
                <dd className="font-semibold">{scheduler.ruleSummary.closing}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase text-gray-500">Descanso</dt>
                <dd className="font-semibold">
                  {scheduler.ruleSummary.breakTime} / {scheduler.ruleSummary.breakDuration}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase text-gray-500">Duracion cita</dt>
                <dd className="font-semibold">{scheduler.ruleSummary.slotDuration}</dd>
              </div>
            </dl>
          </div>
        </div>

        {scheduler.rulesError && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-sm">
            {scheduler.rulesError}
          </div>
        )}

        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Meses disponibles</p>
              <p className="text-sm text-gray-700">Elige un mes futuro para ver los dias habilitados.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {scheduler.months.map((month) => {
                const selected = month.key === scheduler.selectedMonthKey;
                return (
                  <button
                    key={month.key}
                    type="button"
                    onClick={() => scheduler.onSelectMonth(month.key)}
                    className={`rounded-full border px-3 py-1 text-sm font-semibold transition ${
                      selected
                        ? "border-[#259487] bg-[#259487] text-white shadow"
                        : "border-gray-200 bg-gray-50 text-gray-700 hover:border-[#259487]/50 hover:text-[#259487]"
                    }`}
                  >
                    {month.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Dias del mes</p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
              {scheduler.days.map((day) => {
                const selected = day.key === scheduler.selectedDayKey;
                return (
                  <button
                    key={day.key}
                    type="button"
                    onClick={() => scheduler.onSelectDay(day.key)}
                    className={`flex flex-col rounded-xl border px-3 py-3 text-left shadow-sm transition ${
                      selected
                        ? "border-[#259487] bg-[#259487]/10 text-[#0f4a6c]"
                        : "border-gray-200 bg-white text-gray-800 hover:border-[#259487]/50"
                    }`}
                  >
                    <span className="text-xs font-semibold uppercase text-gray-500">{day.weekLabel}</span>
                    <span className="text-lg font-semibold">{day.label}</span>
                  </button>
                );
              })}
              {scheduler.days.length === 0 && (
                <div className="col-span-full rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
                  No hay dias disponibles para este rango.
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Fecha seleccionada</p>
              <p className="text-lg font-semibold text-gray-900">{scheduler.selectedDayLabel}</p>
            </div>
            {scheduler.loadingSlots && <span className="text-sm text-gray-500">Actualizando disponibilidad...</span>}
          </div>

          {scheduler.dayError && (
            <div className="mt-3 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              <ExclamationTriangleIcon className="h-4 w-4 mt-0.5" />
              <div>{scheduler.dayError}</div>
            </div>
          )}

          {!scheduler.dayError && (
            <>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-gray-600">
                <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-green-700 border border-green-200">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  Disponible
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-gray-700 border border-gray-200">
                  <span className="h-2 w-2 rounded-full bg-gray-500" />
                  Ocupado o fuera de horario
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-yellow-50 px-3 py-1 text-yellow-700 border border-yellow-200">
                  <span className="h-2 w-2 rounded-full bg-yellow-500" />
                  Descanso
                </span>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {scheduler.slots.map((slot) => {
                  const selected = scheduler.selectedSlotId === slot.id;
                  if (slot.status === "available") {
                    return (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() => scheduler.onSelectSlot(slot.id)}
                        className={`flex flex-col rounded-xl border px-4 py-3 text-left shadow-sm transition ${
                          selected
                            ? "border-[#259487] bg-[#259487]/10 ring-2 ring-[#259487]/40"
                            : "border-gray-200 bg-white hover:border-[#259487]/50"
                        }`}
                      >
                        <span className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                          <ClockIcon className="h-4 w-4 text-[#259487]" />
                          {slot.label}
                        </span>
                        <span className="mt-1 text-xs text-gray-600">Disponible</span>
                      </button>
                    );
                  }

                  const baseClasses =
                    slot.status === "break"
                      ? "border-yellow-200 bg-yellow-50 text-yellow-800"
                      : slot.status === "booked"
                      ? "border-gray-200 bg-gray-100 text-gray-700"
                      : "border-gray-200 bg-gray-100 text-gray-500";

                  const note =
                    slot.status === "break"
                      ? "Descanso de la clinica"
                      : slot.status === "booked"
                      ? "Reservado"
                      : "Hora pasada";

                  return (
                    <div key={slot.id} className={`rounded-xl border px-4 py-3 shadow-sm ${baseClasses}`}>
                      <span className="flex items-center gap-2 text-sm font-semibold">
                        <ClockIcon className="h-4 w-4" />
                        {slot.label}
                      </span>
                      <span className="mt-1 text-xs">{slot.note || note}</span>
                    </div>
                  );
                })}

                {(scheduler.loadingRules || scheduler.loadingSlots) && scheduler.slots.length === 0 && (
                  <div className="col-span-full rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
                    Cargando disponibilidad...
                  </div>
                )}

                {!scheduler.loadingRules && !scheduler.loadingSlots && scheduler.slots.length === 0 && (
                  <div className="col-span-full rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
                    No hay horarios disponibles con las reglas actuales.
                  </div>
                )}
              </div>
            </>
          )}
        </section>

        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-800">
                Nota opcional para el doctor
                <textarea
                  value={scheduler.note}
                  onChange={(e) => scheduler.setNote(e.target.value)}
                  rows={3}
                  className="mt-2 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-800 shadow-sm outline-none focus:border-[#259487] focus:ring-2 focus:ring-[#259487]/20"
                  placeholder="Motivo de la cita, sintomas, etc."
                />
              </label>
              <p className="mt-2 text-xs text-gray-500">Confirma un horario disponible antes de agendar.</p>
            </div>
            <div className="w-full max-w-xs space-y-3">
              {scheduler.scheduleError && (
                <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                  <ExclamationTriangleIcon className="mt-0.5 h-4 w-4" />
                  <span>{scheduler.scheduleError}</span>
                </div>
              )}
              {scheduler.scheduleSuccess && (
                <div className="flex items-start gap-2 rounded-xl border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
                  <CheckCircleIcon className="mt-0.5 h-4 w-4" />
                  <span>{scheduler.scheduleSuccess}</span>
                </div>
              )}
              <button
                type="button"
                onClick={scheduler.schedule}
                disabled={!scheduler.canSchedule}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-br from-[#259487] to-indigo-700 px-4 py-3 text-sm font-semibold text-white shadow disabled:cursor-not-allowed disabled:opacity-60"
              >
                <CalendarDaysIcon className="h-5 w-5" />
                {scheduler.scheduling ? "Agendando..." : "Confirmar cita"}
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
