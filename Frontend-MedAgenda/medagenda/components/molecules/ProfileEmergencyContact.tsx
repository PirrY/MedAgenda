import React from 'react';
import { FaUserShield } from 'react-icons/fa';
import { UpdateUserDTO } from '../../interfaces/user';
import InputField from '../atoms/InputField';
import { INPUT_LIMITS } from '../../utils/validation';

interface ProfileEmergencyContactProps {
  formData: UpdateUserDTO;
  isEditing: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export default function ProfileEmergencyContact({ formData, isEditing, onInputChange }: ProfileEmergencyContactProps) {
  return (
    <div className="mb-8 pt-8 border-t border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
        <FaUserShield className="text-blue-600" />
        Contacto de Emergencia
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Nombre Completo"
          name="emergency_contact_name"
          value={formData.emergency_contact_name || ""}
          onChange={onInputChange}
          disabled={!isEditing}
          maxLength={INPUT_LIMITS.NAME}
          showCharCount={isEditing}
        />
        <InputField
          label="Teléfono"
          name="emergency_contact_phone"
          type="tel"
          value={formData.emergency_contact_phone || ""}
          onChange={onInputChange}
          disabled={!isEditing}
          maxLength={INPUT_LIMITS.PHONE}
          showCharCount={isEditing}
        />
      </div>
    </div>
  );
}
