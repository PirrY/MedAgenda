import React from 'react';
import Image from 'next/image';
import { CalendarDaysIcon, UserCircleIcon } from '@heroicons/react/24/outline';

interface DoctorStatsCardProps {
  stats: {
    totalUpcoming: number;
    totalPatients: number;
  };
}

export default function DoctorStatsCard({ stats }: DoctorStatsCardProps) {
  return (
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
  );
}
