import React from 'react';
import { FaUser, FaCalendar } from 'react-icons/fa';
import { UpdateUserDTO } from '../../interfaces/user';
import InputField from '../atoms/InputField';
import { INPUT_LIMITS } from '../../utils/validation';

interface ProfilePersonalInfoProps {
  formData: UpdateUserDTO;
  isEditing: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export default function ProfilePersonalInfo({ formData, isEditing, onInputChange }: ProfilePersonalInfoProps) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
        <FaUser className="text-blue-600" />
        Información Personal
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Primer Nombre"
          name="first_name"
          value={formData.first_name || ""}
          onChange={onInputChange}
          disabled={!isEditing}
          maxLength={INPUT_LIMITS.NAME}
          showCharCount={isEditing}
          required
        />
        <InputField
          label="Segundo Nombre"
          name="second_name"
          value={formData.second_name || ""}
          onChange={onInputChange}
          disabled={!isEditing}
          maxLength={INPUT_LIMITS.NAME}
          showCharCount={isEditing}
        />
        <InputField
          label="Primer Apellido"
          name="first_last_name"
          value={formData.first_last_name || ""}
          onChange={onInputChange}
          disabled={!isEditing}
          maxLength={INPUT_LIMITS.NAME}
          showCharCount={isEditing}
          required
        />
        <InputField
          label="Segundo Apellido"
          name="second_last_name"
          value={formData.second_last_name || ""}
          onChange={onInputChange}
          disabled={!isEditing}
          maxLength={INPUT_LIMITS.NAME}
          showCharCount={isEditing}
        />
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <FaCalendar className="inline mr-2" />
            Fecha de Nacimiento
          </label>
          <input
            type="date"
            name="birth_date"
            value={formData.birth_date?.split('T')[0] || ""}
            onChange={onInputChange}
            disabled={!isEditing}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Género
          </label>
          <select
            name="gender"
            value={formData.gender || ""}
            onChange={onInputChange}
            disabled={!isEditing}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="">Seleccionar</option>
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
            <option value="O">Otro</option>
          </select>
        </div>
      </div>
    </div>
  );
}
