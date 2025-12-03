import React from 'react';
import { ClockIcon } from '@heroicons/react/24/outline';

interface DoctorTimeRangeFilterProps {
  timeRange: { from: string; to: string };
  rangeError: string | null;
  rangeLabel: string;
  setRangeValue: (field: 'from' | 'to', value: string) => void;
  applyQuickRange: (days: number) => void;
}

export default function DoctorTimeRangeFilter({
  timeRange,
  rangeError,
  rangeLabel,
  setRangeValue,
  applyQuickRange,
}: DoctorTimeRangeFilterProps) {
  return (
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
  );
}
