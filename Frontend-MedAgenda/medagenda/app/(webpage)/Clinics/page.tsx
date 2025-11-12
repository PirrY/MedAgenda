"use client";

import React, { useState } from "react";
import Heading from "../../../components/atoms/Heading";                // ajusta ruta
import { useCountries } from "../../../hooks/useCountries";          // nuevo
import { useStates } from "../../../hooks/useStates";                  // ya lo tienes
import { useCities } from "../../../hooks/useCities";                  // nuevo
import { useClinicsByCity } from "../../../hooks/useClinicsComponent"; // tu hook

export default function Page() {
  const [countryId, setCountryId] = useState<number | null>(null);
  const [stateId, setStateId] = useState<number | null>(null);
  const [cityId, setCityId] = useState<number | null>(null);
  const [submittedCityId, setSubmittedCityId] = useState<number | null>(null);

  const { countries, loading: loadingCountries, error: errorCountries } = useCountries();
  const { states, loading: loadingStates, error: errorStates } = useStates(countryId ?? undefined);
  const { cities, loading: loadingCities, error: errorCities } = useCities(stateId);
  const { clinics, loading: loadingClinics, error: errorClinics } = useClinicsByCity(submittedCityId ?? undefined);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (cityId) setSubmittedCityId(cityId);
  };

  const hasErrors = errorCountries || errorStates || errorCities || errorClinics;

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-16 flex flex-col items-center">
      <Heading text="Clínicas" highlight="" />

      <form onSubmit={handleSearch} className="mt-8 w-full max-w-5xl flex justify-center">
        <div className="flex w-full items-stretch bg-white rounded-full shadow-lg overflow-hidden border border-gray-200">
          <div className="flex-1 flex items-center px-4 py-3 gap-3 border-r border-gray-200">
            <div className="flex flex-col w-full">
              <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">País</span>
              <select
                className="mt-0.5 w-full bg-transparent outline-none text-sm text-gray-900"
                value={countryId ?? ""}
                onChange={(e) => {
                  const val = e.target.value ? Number(e.target.value) : null;
                  setCountryId(val);
                  setStateId(null);
                  setCityId(null);
                  setSubmittedCityId(null);
                }}
              >
                <option value="">{loadingCountries ? "Cargando países..." : "Selecciona un país"}</option>
                {countries?.map((c) => (
                  <option key={c.country_id} value={c.country_id}>{c.country_name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex-1 flex items-center px-4 py-3 gap-3 border-r border-gray-200">
            <div className="flex flex-col w-full">
              <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">Estado</span>
              <select
                className="mt-0.5 w-full bg-transparent outline-none text-sm text-gray-900 disabled:text-gray-400"
                value={stateId ?? ""}
                onChange={(e) => {
                  const val = e.target.value ? Number(e.target.value) : null;
                  setStateId(val);
                  setCityId(null);
                  setSubmittedCityId(null);
                }}
                disabled={!countryId || loadingStates}
              >
                <option value="">
                  {!countryId ? "Selecciona un país primero"
                  : loadingStates ? "Cargando estados..."
                  : "Selecciona un estado"}
                </option>
                {states?.map((s) => (
                  <option key={s.state_id} value={s.state_id}>{s.state_name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex-1 flex items-center px-4 py-3 gap-3">
            <div className="flex flex-col w-full">
              <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">Ciudad</span>
              <select
                className="mt-0.5 w-full bg-transparent outline-none text-sm text-gray-900 disabled:text-gray-400"
                value={cityId ?? ""}
                onChange={(e) => setCityId(e.target.value ? Number(e.target.value) : null)}
                disabled={!stateId || loadingCities}
              >
                <option value="">
                  {!stateId ? "Selecciona un estado primero"
                  : loadingCities ? "Cargando ciudades..."
                  : "Selecciona una ciudad"}
                </option>
                {cities?.map((c) => (
                  <option key={c.city_id} value={c.city_id}>{c.city_name}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={!cityId}
            className="flex items-center justify-center px-6 sm:px-7 bg-gradient-to-br from-[#259487] to-indigo-700 text-white text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed hover:bg-orange-600 transition-colors"
          >
            <span className="hidden sm:inline mr-1">Buscar</span>
          </button>
        </div>
      </form>

      <section className="mt-10 w-full max-w-5xl">
        {hasErrors && (
          <p className="mb-4 text-sm text-red-500">
            {errorCountries || errorStates || errorCities || errorClinics}
          </p>
        )}

        {!submittedCityId && (
          <p className="text-sm text-gray-500">
            Selecciona país, estado y ciudad y pulsa <span className="font-semibold">Buscar</span>.
          </p>
        )}

        {submittedCityId && loadingClinics && (
          <p className="text-sm text-gray-500">Cargando clínicas...</p>
        )}

        {submittedCityId && !loadingClinics && !errorClinics && (
          clinics.length === 0 ? (
            <p className="text-sm text-gray-500">No se encontraron clínicas para esta ciudad.</p>
          ) : (
            <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {clinics.map((clinic) => (
                <article key={clinic.clinic_id} className="rounded-lg border bg-white p-4 shadow-sm flex flex-col gap-2">
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
                </article>
              ))}
            </div>
          )
        )}
      </section>
    </main>
  );
}
