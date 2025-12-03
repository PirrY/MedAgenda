import React from 'react';

interface TabButtonProps {
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
}

export default function TabButton({ label, icon, active, onClick }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 px-6 py-3 rounded-lg font-semibold
        transition-all duration-200
        ${
          active
            ? 'bg-[#4682B4] text-white shadow-lg'
            : 'bg-white text-gray-700 hover:bg-gray-100'
        }
      `}
    >
      <span className="text-xl">{icon}</span>
      {label}
    </button>
  );
}
