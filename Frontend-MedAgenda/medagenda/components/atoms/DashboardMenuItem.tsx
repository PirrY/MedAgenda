import React from 'react';

interface DashboardMenuItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  colorScheme?: 'blue' | 'green' | 'purple' | 'teal' | 'gray' | 'red';
}

const colorSchemes = {
  blue: {
    iconBg: 'bg-blue-100',
    iconText: 'text-blue-600',
    hoverBg: 'hover:bg-blue-50',
  },
  green: {
    iconBg: 'bg-green-100',
    iconText: 'text-green-600',
    hoverBg: 'hover:bg-green-50',
  },
  purple: {
    iconBg: 'bg-purple-100',
    iconText: 'text-purple-600',
    hoverBg: 'hover:bg-purple-50',
  },
  teal: {
    iconBg: 'bg-teal-100',
    iconText: 'text-teal-600',
    hoverBg: 'hover:bg-teal-50',
  },
  gray: {
    iconBg: 'bg-gray-100',
    iconText: 'text-gray-600',
    hoverBg: 'hover:bg-gray-50',
  },
  red: {
    iconBg: 'bg-red-100',
    iconText: 'text-red-600',
    hoverBg: 'hover:bg-red-50',
  },
};

export default function DashboardMenuItem({
  icon,
  title,
  description,
  onClick,
  colorScheme = 'blue',
}: DashboardMenuItemProps) {
  const colors = colorSchemes[colorScheme];

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-x-3 rounded-lg p-3 text-sm text-left ${colors.hoverBg} transition-colors duration-200`}
    >
      <div className={`flex h-10 w-10 flex-none items-center justify-center rounded-lg ${colors.iconBg}`}>
        <div className={`h-6 w-6 ${colors.iconText}`}>
          {icon}
        </div>
      </div>
      <div className="flex-auto">
        <p className="font-semibold text-gray-900">{title}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
    </button>
  );
}
