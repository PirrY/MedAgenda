import React from 'react';
import { FaUser, FaUserMd, FaUserShield } from 'react-icons/fa';

interface RoleBadgeProps {
  role: 'admin' | 'doctor' | 'patient';
  size?: 'sm' | 'md';
}

const roleConfig = {
  admin: {
    label: 'Admin',
    icon: FaUserShield,
    bg: 'bg-purple-100',
    text: 'text-purple-700',
  },
  doctor: {
    label: 'Doctor',
    icon: FaUserMd,
    bg: 'bg-blue-100',
    text: 'text-blue-700',
  },
  patient: {
    label: 'Paciente',
    icon: FaUser,
    bg: 'bg-green-100',
    text: 'text-green-700',
  },
};

const sizeClasses = {
  sm: 'px-2 py-0.5 text-[11px]',
  md: 'px-3 py-1 text-xs',
};

export default function RoleBadge({ role, size = 'md' }: RoleBadgeProps) {
  const config = roleConfig[role];
  const Icon = config.icon;

  return (
    <span
      className={`
        inline-flex items-center gap-1 rounded-full font-semibold
        ${config.bg} ${config.text}
        ${sizeClasses[size]}
      `}
    >
      <Icon />
      {config.label}
    </span>
  );
}
