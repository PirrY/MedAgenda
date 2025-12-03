import React, { useRef, useEffect } from 'react';

interface AutocompleteOption {
  id: number | string;
  label: string;
  subtitle?: string;
}

interface AutocompleteInputProps {
  label: string;
  icon?: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
  onSelect: (option: any) => void;
  options: AutocompleteOption[];
  isSearching: boolean;
  showDropdown: boolean;
  setShowDropdown: (show: boolean) => void;
  placeholder?: string;
  disabled?: boolean;
  noResultsMessage?: string;
  dropdownHeader?: string;
}

export default function AutocompleteInput({
  label,
  icon,
  value,
  onChange,
  onSelect,
  options,
  isSearching,
  showDropdown,
  setShowDropdown,
  placeholder = 'Escribe para buscar...',
  disabled = false,
  noResultsMessage = 'No se encontraron coincidencias',
  dropdownHeader,
}: AutocompleteInputProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setShowDropdown]);

  return (
    <div>
      <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
        {icon && <span className="text-[#4682B4]">{icon}</span>}
        {label}
      </label>
      <div className="relative" ref={dropdownRef}>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setShowDropdown(true)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4682B4]"
          placeholder={placeholder}
          disabled={disabled}
          autoComplete="off"
        />

        {showDropdown && value && (
          <div className="absolute z-50 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-y-auto">
            {isSearching ? (
              <div className="px-4 py-3 text-gray-500 text-sm">Buscando...</div>
            ) : options.length > 0 ? (
              <>
                {dropdownHeader && (
                  <div className="px-4 py-2 bg-gray-50 border-b border-gray-200 text-xs text-gray-600 font-semibold">
                    {dropdownHeader}
                  </div>
                )}
                {options.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => onSelect(option)}
                    className="w-full px-4 py-3 text-left hover:bg-blue-50 border-b border-gray-100 last:border-b-0 transition-colors"
                  >
                    <div className="font-semibold text-gray-800">{option.label}</div>
                    {option.subtitle && (
                      <div className="text-sm text-gray-600">{option.subtitle}</div>
                    )}
                  </button>
                ))}
              </>
            ) : (
              <div className="px-4 py-3 text-gray-500 text-sm">{noResultsMessage}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
