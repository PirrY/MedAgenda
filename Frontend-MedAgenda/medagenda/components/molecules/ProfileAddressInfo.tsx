import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { UpdateUserDTO } from '../../interfaces/user';
import InputField from '../atoms/InputField';
import { INPUT_LIMITS } from '../../utils/validation';

interface ProfileAddressInfoProps {
  formData: UpdateUserDTO;
  isEditing: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export default function ProfileAddressInfo({ formData, isEditing, onInputChange }: ProfileAddressInfoProps) {
  return (
    <div className="mb-8 pt-8 border-t border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
        <FaMapMarkerAlt className="text-blue-600" />
        Dirección
      </h2>
      <div className="grid grid-cols-1 gap-6">
        <InputField
          label="Dirección Completa"
          name="address"
          value={formData.address || ""}
          onChange={onInputChange}
          disabled={!isEditing}
          maxLength={INPUT_LIMITS.ADDRESS}
          showCharCount={isEditing}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InputField
            label="Ciudad"
            name="city"
            value={formData.city || ""}
            onChange={onInputChange}
            disabled={!isEditing}
            maxLength={INPUT_LIMITS.NAME}
            showCharCount={isEditing}
          />
          <InputField
            label="Estado/Provincia"
            name="state"
            value={formData.state || ""}
            onChange={onInputChange}
            disabled={!isEditing}
            maxLength={INPUT_LIMITS.NAME}
            showCharCount={isEditing}
          />
          <InputField
            label="País"
            name="country"
            value={formData.country || ""}
            onChange={onInputChange}
            disabled={!isEditing}
            maxLength={INPUT_LIMITS.NAME}
            showCharCount={isEditing}
          />
        </div>
      </div>
    </div>
  );
}
