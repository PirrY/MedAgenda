import React from 'react';
import { FaUsersCog, FaUserMd, FaUserShield, FaSave, FaTimes } from 'react-icons/fa';
import { ClinicUser, Specialty } from '../../interfaces/adminUser';

interface UserRoleModalProps {
  editingUser: ClinicUser | null;
  roleForm: {
    is_doctor: boolean;
    is_admin: boolean;
    specialty_id?: number;
  };
  specialties: Specialty[];
  isSaving: boolean;
  onRoleFormChange: (form: any) => void;
  onSave: () => void;
  onCancel: () => void;
}

export default function UserRoleModal({
  editingUser,
  roleForm,
  specialties,
  isSaving,
  onRoleFormChange,
  onSave,
  onCancel,
}: UserRoleModalProps) {
  if (!editingUser) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          <FaUsersCog className="text-blue-600" />
          Editar Rol de Usuario
        </h3>

        {/* User Info */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-600 mb-1">Usuario seleccionado:</p>
          <p className="font-semibold text-gray-800">
            {editingUser.first_name} {editingUser.first_last_name}
          </p>
          <p className="text-sm text-gray-600">{editingUser.user_email_address}</p>
        </div>

        {/* Role Selection */}
        <div className="space-y-4 mb-6">
          <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <input
              type="checkbox"
              checked={roleForm.is_admin}
              onChange={(e) => onRoleFormChange({ ...roleForm, is_admin: e.target.checked })}
              className="w-5 h-5 text-purple-600 focus:ring-purple-500 rounded"
            />
            <FaUserShield className="text-purple-600 text-xl" />
            <div className="flex-1">
              <p className="font-semibold text-gray-800">Administrador</p>
              <p className="text-sm text-gray-600">Gestión completa de la clínica</p>
            </div>
          </label>

          <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <input
              type="checkbox"
              checked={roleForm.is_doctor}
              onChange={(e) => onRoleFormChange({ ...roleForm, is_doctor: e.target.checked })}
              className="w-5 h-5 text-blue-600 focus:ring-blue-500 rounded"
            />
            <FaUserMd className="text-blue-600 text-xl" />
            <div className="flex-1">
              <p className="font-semibold text-gray-800">Doctor</p>
              <p className="text-sm text-gray-600">Puede atender pacientes y gestionar citas</p>
            </div>
          </label>

          {/* Specialty Selection (only if doctor) */}
          {roleForm.is_doctor && (
            <div className="ml-12 mt-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Especialidad *
              </label>
              <select
                value={roleForm.specialty_id || ""}
                onChange={(e) => onRoleFormChange({ ...roleForm, specialty_id: Number(e.target.value) })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Seleccionar especialidad</option>
                {specialties.map((specialty) => (
                  <option key={specialty.specialty_id} value={specialty.specialty_id}>
                    {specialty.specialty_name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={onSave}
            disabled={isSaving}
            className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-600 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Guardando...
              </>
            ) : (
              <>
                <FaSave />
                Guardar Cambios
              </>
            )}
          </button>
          <button
            onClick={onCancel}
            disabled={isSaving}
            className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaTimes />
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
