"use client";

import React, { useMemo, useState } from "react";
import Heading from "../../../components/atoms/Heading";
import { useCountries } from "../../../hooks/useCountries";
import { useStates } from "../../../hooks/useStates";
import { useCities } from "../../../hooks/useCities";
import { useSpecialties } from "../../../hooks/useSpecialties";
import { useClinicsSearch, ClinicSearchFilters } from "../../../hooks/useClinicsSearch";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function Page() {
  const [countryId, setCountryId] = useState<number | null>(null);
  const [stateId, setStateId] = useState<number | null>(null);
  const [cityId, setCityId] = useState<number | null>(null);
  const [selectedSpecialtyIds, setSelectedSpecialtyIds] = useState<number[]>([]);
  const [specialtyOpen, setSpecialtyOpen] = useState(false);
  const [submittedFilters, setSubmittedFilters] = useState<ClinicSearchFilters | undefined>(undefined);

  const { countries, loading: loadingCountries, error: errorCountries } = useCountries();
  const { states, loading: loadingStates, error: errorStates } = useStates(countryId ?? undefined);
  const { cities, loading: loadingCities, error: errorCities } = useCities(stateId);
  const { specialties, loading: loadingSpecialties, error: errorSpecialties } = useSpecialties();

  const { clinics, loading: loadingClinics, error: errorClinics } = useClinicsSearch(submittedFilters);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!countryId) return;
    setSubmittedFilters({
      countryId,
      stateId: stateId ?? undefined,
      cityId: cityId ?? undefined,
      specialtyIds: selectedSpecialtyIds.length ? selectedSpecialtyIds : undefined,
    });
    setSpecialtyOpen(false);
  };

  const onCountryChange = (val: number | null) => {
    setCountryId(val);
    setStateId(null);
    setCityId(null);
    setSubmittedFilters(undefined);
  };
  const onStateChange = (val: number | null) => {
    setStateId(val);
    setCityId(null);
    setSubmittedFilters(undefined);
  };

  const selectedCount = selectedSpecialtyIds.length;
  const selectedLabel = useMemo(() => {
    if (loadingSpecialties) return "Cargando especialidades...";
    if (selectedCount === 0) return "Cualquiera";
    if (selectedCount === 1) {
      const s = specialties.find(x => x.specialty_id === selectedSpecialtyIds[0]);
      return s ? s.specialty_name : "1 seleccionada";
    }
    return `${selectedCount} seleccionadas`;
  }, [loadingSpecialties, selectedCount, specialties, selectedSpecialtyIds]);

  const toggleSpecialty = (id: number) => {
    setSelectedSpecialtyIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const clearSpecialties = () => setSelectedSpecialtyIds([]);

  const hasErrors = errorCountries || errorStates || errorCities || errorClinics || errorSpecialties;

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-16 flex flex-col items-center">
      <Heading text="Clínicas" highlight="" />

      <form onSubmit={handleSearch} className="mt-8 w-full max-w-5xl flex justify-center">
        <div className="relative flex w-full items-stretch bg-white rounded-full shadow-lg overflow-visible border border-gray-200">
          <div className="flex-1 flex items-center px-4 py-3 gap-3 border-r border-gray-200">
            <div className="flex flex-col w-full">
              <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">País</span>
              <select
                className="mt-0.5 w-full bg-transparent outline-none text-sm text-gray-900"
                value={countryId ?? ""}
                onChange={(e) => {
                  const v = e.target.value ? Number(e.target.value) : null;
                  onCountryChange(v);
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
                  const v = e.target.value ? Number(e.target.value) : null;
                  onStateChange(v);
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

          <div className="flex-1 flex items-center px-4 py-3 gap-3 border-r border-gray-200">
            <div className="flex flex-col w-full">
              <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">Ciudad</span>
              <select
                className="mt-0.5 w-full bg-transparent outline-none text-sm text-gray-900 disabled:text-gray-400"
                value={cityId ?? ""}
                onChange={(e) => setCityId(e.target.value ? Number(e.target.value) : null)}
                disabled={!countryId || !stateId || loadingCities}
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

          <div className="flex-1 flex items-center px-4 py-3 gap-3 relative">
            <div className="flex flex-col w-full">
              <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">Especialidades</span>
              <button
                type="button"
                className="mt-0.5 w-full bg-white text-sm text-gray-900 outline-none border border-gray-200 rounded-md px-3 py-1.5 flex items-center justify-between hover:bg-gray-50"
                onClick={() => setSpecialtyOpen(o => !o)}
                disabled={loadingSpecialties}
              >
                <span className="truncate">{selectedLabel}</span>
                <ChevronDownIcon className={`h-4 w-4 text-gray-500 transition-transform ${specialtyOpen ? "rotate-180" : ""}`} />
              </button>

              {specialtyOpen && (
                <div className="absolute top-full left-0 mt-2 z-30 w-80 max-h-72 overflow-auto rounded-xl border border-gray-200 bg-white shadow-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500">Selecciona especialidades</span>
                    {selectedSpecialtyIds.length > 0 && (
                      <button
                        type="button"
                        className="text-xs text-[#4682B4] hover:underline"
                        onClick={clearSpecialties}
                      >
                        Limpiar
                      </button>
                    )}
                  </div>

                  <ul className="space-y-2">
                    {specialties.map(sp => (
                      <li key={sp.specialty_id} className="flex items-center gap-2">
                        <input
                          id={`sp-${sp.specialty_id}`}
                          type="checkbox"
                          checked={selectedSpecialtyIds.includes(sp.specialty_id)}
                          onChange={() => toggleSpecialty(sp.specialty_id)}
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
                      onClick={() => setSpecialtyOpen(false)}
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
            disabled={!countryId}
            className="flex items-center justify-center px-6 sm:px-7 bg-gradient-to-br from-[#259487] to-indigo-700 text-white text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed hover:bg-orange-600 transition-colors"
          >
            <span className="hidden sm:inline mr-1">Buscar</span>
          </button>
        </div>
      </form>

      <section className="mt-10 w-full max-w-5xl">
        {hasErrors && (
          <p className="mb-4 text-sm text-red-500">
            {errorCountries || errorStates || errorCities || errorClinics || errorSpecialties}
          </p>
        )}

        {!submittedFilters && (
          <p className="text-sm text-gray-500">
            Selecciona al menos el país (los demás campos son opcionales) y pulsa <span className="font-semibold">Buscar</span>.
          </p>
        )}

        {submittedFilters && loadingClinics && (
          <p className="text-sm text-gray-500">Cargando clínicas...</p>
        )}

        {submittedFilters && !loadingClinics && !errorClinics && (
          clinics.length === 0 ? (
            <p className="text-sm text-gray-500">No se encontraron clínicas para los filtros seleccionados.</p>
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
