"use client";

import React from "react";
import Heading from "../../../components/atoms/Heading";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useClinicSearchController } from "../../../hooks/useClinicSearchController";

export default function Page() {
  const c = useClinicSearchController();

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-16 flex flex-col items-center">
      <Heading text="Clínicas" highlight="" />

      <form
        onSubmit={(e) => { e.preventDefault(); c.handleSearch(); }}
        className="mt-8 w-full max-w-5xl flex justify-center"
      >
        <div className="relative flex w-full items-stretch bg-white rounded-full shadow-lg overflow-visible border border-gray-200">
          <div className="flex-1 flex items-center px-4 py-3 gap-3 border-r border-gray-200">
            <div className="flex flex-col w-full">
              <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">País</span>
              <select
                className="mt-0.5 w-full bg-transparent outline-none text-sm text-gray-900"
                value={c.countryId ?? ""}
                onChange={(e) => c.onCountryChange(e.target.value ? Number(e.target.value) : null)}
              >
                <option value="">{c.loadingCountries ? "Cargando países..." : "Selecciona un país"}</option>
                {c.countries?.map((x) => (
                  <option key={x.country_id} value={x.country_id}>{x.country_name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex-1 flex items-center px-4 py-3 gap-3 border-r border-gray-200">
            <div className="flex flex-col w-full">
              <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">Estado</span>
              <select
                className="mt-0.5 w-full bg-transparent outline-none text-sm text-gray-900 disabled:text-gray-400"
                value={c.stateId ?? ""}
                onChange={(e) => c.onStateChange(e.target.value ? Number(e.target.value) : null)}
                disabled={!c.countryId || c.loadingStates}
              >
                <option value="">
                  {!c.countryId ? "Selecciona un país primero"
                  : c.loadingStates ? "Cargando estados..."
                  : "Selecciona un estado"}
                </option>
                {c.states?.map((s) => (
                  <option key={s.state_id} value={s.state_id}>{s.state_name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex-1 flex items-center px-4 py-3 gap-3 border-r border-gray-200">
            <div className="flex flex-col w-full">
              <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">Ciudad</span>
              <select
                className="mt-0.5 w-full bg-transparent outline-none text-sm text-gray-900 disabled:text-gray-400"
                value={c.cityId ?? ""}
                onChange={(e) => c.setCityId(e.target.value ? Number(e.target.value) : null)}
                disabled={!c.countryId || !c.stateId || c.loadingCities}
              >
                <option value="">
                  {!c.stateId ? "Selecciona un estado primero"
                  : c.loadingCities ? "Cargando ciudades..."
                  : "Selecciona una ciudad"}
                </option>
                {c.cities?.map((x) => (
                  <option key={x.city_id} value={x.city_id}>{x.city_name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex-1 flex items-center px-4 py-3 gap-3 relative">
            <div className="flex flex-col w-full">
              <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">Especialidades</span>
              <button
                type="button"
                className="mt-0.5 w-full bg-white text-sm text-gray-900 outline-none border border-gray-200 rounded-md px-3 py-1.5 flex items-center justify-between hover:bg-gray-50"
                onClick={c.openCloseSpecialty}
                disabled={c.loadingSpecialties}
              >
                <span className="truncate">{c.selectedLabel}</span>
                <ChevronDownIcon className={`h-4 w-4 text-gray-500 transition-transform ${c.specialtyOpen ? "rotate-180" : ""}`} />
              </button>

              {c.specialtyOpen && (
                <div className="absolute top-full left-0 mt-2 z-30 w-80 max-h-72 overflow-auto rounded-xl border border-gray-200 bg-white shadow-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500">Selecciona especialidades</span>
                    {c.selectedSpecialtyIds.length > 0 && (
                      <button
                        type="button"
                        className="text-xs text-[#4682B4] hover:underline"
                        onClick={c.clearSpecialties}
                      >
                        Limpiar
                      </button>
                    )}
                  </div>

                  <ul className="space-y-2">
                    {c.specialties.map(sp => (
                      <li key={sp.specialty_id} className="flex items-center gap-2">
                        <input
                          id={`sp-${sp.specialty_id}`}
                          type="checkbox"
                          checked={c.selectedSpecialtyIds.includes(sp.specialty_id)}
                          onChange={() => c.toggleSpecialty(sp.specialty_id)}
                          className="accent-[#4682B4]"
                        />
                        <label htmlFor={`sp-${sp.specialty_id}`} className="text-sm text-gray-800">
                          {sp.specialty_name}
                        </label>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-3 text-right">
                    <button
                      type="button"
                      className="text-sm font-semibold text-white bg-[#4682B4] hover:bg-[#3b6a93] px-3 py-1.5 rounded-md"
                      onClick={c.closeSpecialty}
                    >
                      Listo
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={!c.canSearch}
            className="flex items-center justify-center px-6 sm:px-7 bg-gradient-to-br from-[#259487] to-indigo-700 text-white text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed hover:bg-orange-600 transition-colors"
          >
            <span className="hidden sm:inline mr-1">Buscar</span>
          </button>
        </div>
      </form>

      <section className="mt-10 w-full max-w-5xl">
        {c.hasErrors && (
          <p className="mb-4 text-sm text-red-500">
            {c.errorCountries || c.errorStates || c.errorCities || c.errorClinics || c.errorSpecialties}
          </p>
        )}

        {!c.submittedFilters && (
          <p className="text-sm text-gray-500">
            Selecciona al menos el país (los demás campos son opcionales) y pulsa <span className="font-semibold">Buscar</span>.
          </p>
        )}

        {c.submittedFilters && c.loadingClinics && (
          <p className="text-sm text-gray-500">Cargando clínicas...</p>
        )}

        {c.submittedFilters && !c.loadingClinics && !c.errorClinics && (
          c.clinics.length === 0 ? (
            <p className="text-sm text-gray-500">No se encontraron clínicas para los filtros seleccionados.</p>
          ) : (
            <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {c.clinics.map((clinic) => (
                <Link
                  key={clinic.clinic_id}
                  href={`/Clinics/${clinic.clinic_id}`}
                  className="rounded-lg border bg-white p-4 shadow-sm flex flex-col gap-2 hover:shadow transition"
                >
                  <h2 className="font-semibold text-lg">{clinic.clinic_name}</h2>
                  <p className="text-sm text-gray-600">{clinic.clinic_address}</p>
                  <p className="text-sm text-gray-600">Teléfono: {clinic.clinic_phone_number}</p>
                  {clinic.clinic_description && (
                    <p className="text-sm text-gray-500">{clinic.clinic_description}</p>
                  )}
                  <span
                    className={`mt-2 inline-flex w-fit rounded-full px-3 py-1 text-xs ${
                      clinic.is_open ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}
                  >
                    {clinic.is_open ? "Abierta" : "Cerrada"}
                  </span>
                </Link>
              ))}
            </div>
          )
        )}
      </section>
    </main>
  );
}
