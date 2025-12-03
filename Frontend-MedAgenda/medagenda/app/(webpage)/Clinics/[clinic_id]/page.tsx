"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";
import AuthModal from "../../../../components/organisms/AuthModal";
import { useClinicDetail } from "../../../../hooks/useClinicDetail";
import useAuth from "../../../../hooks/useAuth";

export default function ClinicDetailPage() {
  const params = useParams();
  const router = useRouter();
  const clinicId = Number(params.clinic_id);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [pendingDoctorId, setPendingDoctorId] = useState<number | null>(null);
  const { isAuthenticated, isLoading } = useAuth();
  const { clinic, doctors, clinicSpecialties, loadingClinic, loadingDoctors, errorClinic, errorDoctors, refetch } = useClinicDetail(clinicId);

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setPendingDoctorId(null);
  };

  const handleAuthSuccess = () => {
    setIsAuthModalOpen(false);
    if (pendingDoctorId !== null) {
      router.push(`/Clinics/${clinicId}/schedule/${pendingDoctorId}`);
      setPendingDoctorId(null);
    }
  };

  const handleScheduleClick = (doctorId: number) => {
    // Fallback to cookie check while auth hook finishes loading
    const hasToken = isAuthenticated || (isLoading && Boolean(Cookies.get("token")));
    if (hasToken) {
      router.push(`/Clinics/${clinicId}/schedule/${doctorId}`);
      return;
    }
    setPendingDoctorId(doctorId);
    setIsAuthModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto w-full max-w-6xl">
        {!clinic && loadingClinic && (
          <div className="animate-pulse rounded-2xl bg-white p-6 shadow">
            <div className="h-6 w-2/3 bg-gray-200 rounded mb-3" />
            <div className="h-4 w-1/2 bg-gray-200 rounded mb-2" />
            <div className="h-4 w-1/3 bg-gray-200 rounded" />
          </div>
        )}

        {errorClinic && (
          <div className="rounded-2xl bg-red-50 border border-red-200 p-4 text-red-700 mb-6">
            {errorClinic}
            <button onClick={refetch} className="ml-3 underline">Reintentar</button>
          </div>
        )}

        {clinic && (
          <section className="rounded-2xl bg-white shadow border border-gray-200 overflow-hidden">
            <div className="bg-[#4682B4] h-2 w-full" />
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{clinic.clinic_name}</h1>
                  <p className="text-sm text-gray-600">{clinic.clinic_address}</p>
                  <p className="text-sm text-gray-600">Teléfono: {clinic.clinic_phone_number}</p>
                  {clinic.clinic_description && <p className="mt-2 text-sm text-gray-700">{clinic.clinic_description}</p>}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs ${clinic.is_open ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {clinic.is_open ? "Abierta" : "Cerrada"}
                  </span>
                  <Link
                    href="#doctor-list"
                    className="rounded-full bg-gradient-to-br from-[#259487] to-indigo-700 text-white text-sm font-semibold px-4 py-2 hover:opacity-95"
                  >
                    Ver horarios
                  </Link>
                </div>
              </div>

              {clinicSpecialties.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {clinicSpecialties.map(s => (
                    <span key={s.specialty_id} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full border border-gray-200">
                      {s.specialty_name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        <section id="doctor-list" className="mt-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-900">Doctores</h2>
            {loadingDoctors && <span className="text-sm text-gray-500">Cargando...</span>}
          </div>

          {errorDoctors && <div className="rounded-2xl bg-red-50 border border-red-200 p-4 text-red-700 mb-6">{errorDoctors}</div>}

          {!loadingDoctors && doctors.length === 0 && <p className="text-sm text-gray-600">No hay doctores registrados para esta clínica.</p>}

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {doctors.map((d) => {
              const fullName = [d.first_name, d.second_name, d.first_last_name, d.second_last_name].filter(Boolean).join(" ");
              return (
                <article key={d.doctor_id ?? fullName} className="rounded-xl border bg-white p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#259487] to-indigo-700" />
                    <div>
                      <h3 className="font-semibold text-gray-900">{fullName}</h3>
                    </div>
                  </div>
                  {d.specialties?.length ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {d.specialties.map((s) => (
                        <span key={s.specialty_id} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full border border-gray-200">
                          {s.specialty_name}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-3 text-sm text-gray-500">Sin especialidades registradas.</p>
                  )}
                  <div className="mt-4">
                    {Number.isFinite(d.doctor_id) ? (
                      <button
                        type="button"
                        onClick={() => handleScheduleClick(Number(d.doctor_id))}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-br from-[#259487] to-indigo-700 px-4 py-2 text-sm font-semibold text-white shadow hover:opacity-95"
                      >
                        Agendar con este doctor
                      </button>
                    ) : (
                      <p className="text-sm text-gray-500">Sin identificador de doctor disponible.</p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} onSuccess={handleAuthSuccess} defaultTab="login" />
    </main>
  );
}
