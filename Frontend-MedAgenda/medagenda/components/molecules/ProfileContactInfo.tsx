import React from 'react';
import { FaPhone } from 'react-icons/fa';
import { UpdateUserDTO, User } from '../../interfaces/user';
import InputField from '../atoms/InputField';
import { INPUT_LIMITS } from '../../utils/validation';

interface ProfileContactInfoProps {
  formData: UpdateUserDTO;
  user: User;
  isEditing: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export default function ProfileContactInfo({ formData, user, isEditing, onInputChange }: ProfileContactInfoProps) {
  return (
    <div className="mb-8 pt-8 border-t border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
        <FaPhone className="text-blue-600" />
        Información de Contacto
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Teléfono"
          name="user_phone_number"
          type="tel"
          value={formData.user_phone_number || ""}
          onChange={onInputChange}
          disabled={!isEditing}
          placeholder="Ej: +57 300 123 4567"
          maxLength={INPUT_LIMITS.PHONE}
          showCharCount={isEditing}
        />
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            value={user?.user_email_address || ""}
            disabled
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
          />
          <p className="text-xs text-gray-500 mt-1">El email no se puede cambiar</p>
        </div>
      </div>
    </div>
  );
}
