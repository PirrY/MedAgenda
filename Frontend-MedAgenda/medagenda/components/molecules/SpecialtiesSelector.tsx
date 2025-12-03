import React from 'react';
import { FaStethoscope, FaPlus } from 'react-icons/fa';
import { SpecialtyDTO } from '../../interfaces/specialty';

interface SpecialtiesSelectorProps {
  specialties: SpecialtyDTO[];
  selectedSpecialtyIds: number[];
  loadingSpecialties: boolean;
  showNewSpecialtyInput: boolean;
  newSpecialtyName: string;
  isCreatingSpecialty: boolean;
  isSubmitting: boolean;
  onToggleSpecialty: (specialtyId: number) => void;
  onCreateSpecialty: () => void;
  setShowNewSpecialtyInput: (show: boolean) => void;
  setNewSpecialtyName: (name: string) => void;
}

export default function SpecialtiesSelector({
  specialties,
  selectedSpecialtyIds,
  loadingSpecialties,
  showNewSpecialtyInput,
  newSpecialtyName,
  isCreatingSpecialty,
  isSubmitting,
  onToggleSpecialty,
  onCreateSpecialty,
  setShowNewSpecialtyInput,
  setNewSpecialtyName,
}: SpecialtiesSelectorProps) {
  return (
    <div>
      <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
        <FaStethoscope className="text-[#4682B4]" />
        Especialidades de la Clínica
      </label>
      <p className="text-sm text-gray-600 mb-3">
        Selecciona las especialidades médicas que ofrece tu clínica
      </p>

      {loadingSpecialties ? (
        <div className="text-gray-500 text-sm">Cargando especialidades...</div>
      ) : (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-h-64 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {specialties.map((specialty) => (
              <label
                key={specialty.specialty_id}
                className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-[#4682B4] hover:bg-blue-50 cursor-pointer transition-all"
              >
                <input
                  type="checkbox"
                  checked={selectedSpecialtyIds.includes(specialty.specialty_id)}
                  onChange={() => onToggleSpecialty(specialty.specialty_id)}
                  className="w-5 h-5 accent-[#4682B4]"
                  disabled={isSubmitting}
                />
                <span className="text-gray-800 font-medium">{specialty.specialty_name}</span>
              </label>
            ))}
          </div>

          {selectedSpecialtyIds.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-200 text-sm text-gray-600">
              <span className="font-semibold text-[#4682B4]">{selectedSpecialtyIds.length}</span> especialidad(es) seleccionada(s)
            </div>
          )}
        </div>
      )}

      {/* Create New Specialty */}
      <div className="mt-4">
        {!showNewSpecialtyInput ? (
          <button
            type="button"
            onClick={() => setShowNewSpecialtyInput(true)}
            className="flex items-center gap-2 text-[#4682B4] hover:text-[#3b6a93] font-semibold text-sm transition-colors"
            disabled={isSubmitting}
          >
            <FaPlus />
            ¿No encuentras la especialidad? Crear nueva
          </button>
        ) : (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <label className="text-gray-700 font-semibold mb-2 block">
              Nombre de la nueva especialidad
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newSpecialtyName}
                onChange={(e) => setNewSpecialtyName(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4682B4]"
                placeholder="Ej: Oftalmología"
                disabled={isCreatingSpecialty || isSubmitting}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    onCreateSpecialty();
                  }
                }}
              />
              <button
                type="button"
                onClick={onCreateSpecialty}
                disabled={isCreatingSpecialty || isSubmitting || !newSpecialtyName.trim()}
                className="px-4 py-2 bg-[#4682B4] text-white rounded-lg font-semibold hover:bg-[#3b6a93] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isCreatingSpecialty ? 'Creando...' : 'Crear'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowNewSpecialtyInput(false);
                  setNewSpecialtyName('');
                }}
                disabled={isCreatingSpecialty || isSubmitting}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
