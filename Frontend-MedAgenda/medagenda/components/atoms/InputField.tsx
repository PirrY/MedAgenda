import React from 'react';
import { sanitizeString, truncateString } from '../../utils/validation';

interface InputFieldProps {
  label?: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  icon?: React.ReactNode;
  error?: string;
  className?: string;
  maxLength?: number;
  showCharCount?: boolean;
  sanitize?: boolean;
}

export default function InputField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  disabled = false,
  required = false,
  icon,
  error,
  className = '',
  maxLength,
  showCharCount = false,
  sanitize = true,
}: InputFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;

    // Sanitizar si está habilitado
    if (sanitize && type !== 'password') {
      newValue = sanitizeString(newValue);
    }

    // Truncar si hay límite de longitud
    if (maxLength) {
      newValue = truncateString(newValue, maxLength);
    }

    // Crear un nuevo evento con el valor procesado
    const syntheticEvent = {
      ...e,
      target: {
        ...e.target,
        value: newValue,
        name: name,
      },
    } as React.ChangeEvent<HTMLInputElement>;

    onChange(syntheticEvent);
  };

  const currentLength = value?.length || 0;

  return (
    <div className={className}>
      {label && (
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
          {icon && <span className="text-[#4682B4]">{icon}</span>}
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        className={`
          w-full px-4 py-3 border rounded-lg
          focus:outline-none focus:ring-2 focus:ring-[#4682B4]
          disabled:bg-gray-100 disabled:cursor-not-allowed
          ${error ? 'border-red-500' : 'border-gray-300'}
        `}
      />
      <div className="flex items-center justify-between mt-1">
        {error && <p className="text-sm text-red-500">{error}</p>}
        {showCharCount && maxLength && !error && (
          <p className={`text-xs ml-auto ${currentLength > maxLength * 0.9 ? 'text-orange-500' : 'text-gray-500'}`}>
            {currentLength}/{maxLength}
          </p>
        )}
      </div>
    </div>
  );
}
