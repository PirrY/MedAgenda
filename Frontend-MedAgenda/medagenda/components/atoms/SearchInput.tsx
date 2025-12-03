import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useDebounce } from '../../hooks/useDebounce';
import { sanitizeString, INPUT_LIMITS } from '../../utils/validation';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: () => void;
  placeholder?: string;
  className?: string;
  debounceMs?: number;
}

export default function SearchInput({
  value,
  onChange,
  onSearch,
  placeholder = 'Buscar...',
  className = '',
  debounceMs = 300,
}: SearchInputProps) {
  const debouncedValue = useDebounce(value, debounceMs);

  // Execute search when debounced value changes
  React.useEffect(() => {
    if (onSearch && debouncedValue !== undefined) {
      onSearch();
    }
  }, [debouncedValue, onSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;

    // Sanitize and limit length
    newValue = sanitizeString(newValue);
    if (newValue.length > INPUT_LIMITS.SEARCH) {
      newValue = newValue.substring(0, INPUT_LIMITS.SEARCH);
    }

    onChange(newValue);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch();
    }
  };

  return (
    <div className={`relative ${className}`}>
      <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        maxLength={INPUT_LIMITS.SEARCH}
        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
}
