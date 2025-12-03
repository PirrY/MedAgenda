import React from 'react';

interface UserAvatarProps {
  firstName: string;
  lastName: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
};

export default function UserAvatar({
  firstName,
  lastName,
  size = 'md',
  className = '',
}: UserAvatarProps) {
  const initials = `${firstName[0] || ''}${lastName[0] || ''}`.toUpperCase();

  return (
    <div
      className={`
        bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full
        flex items-center justify-center text-white font-bold
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {initials}
    </div>
  );
}
