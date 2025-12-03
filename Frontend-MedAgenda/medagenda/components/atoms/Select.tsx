import React from 'react';

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps {
  label?: string;
  icon?: React.ReactNode;
  value: string | number;
  onChange: (value: string | number) => void;
  options: SelectOption[];
  disabled?: boolean;
  placeholder?: string;
  helpText?: string;
  className?: string;
}

export default function Select({
  label,
  icon,
  value,
  onChange,
  options,
  disabled = false,
  placeholder,
  helpText,
  className = '',
}: SelectProps) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          {icon && <span className="text-[#4682B4]">{icon}</span>}
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {helpText && <p className="text-xs text-gray-500 mt-2">{helpText}</p>}
    </div>
  );
}
