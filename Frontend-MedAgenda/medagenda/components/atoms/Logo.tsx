import React from 'react';
import Link from 'next/link';
import { Activity } from 'lucide-react';

interface LogoProps {
  href?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export default function Logo({ href = '/', size = 'md', showText = true }: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const textSizeClasses = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <Link href={href} className="-m-1.5 p-1.5">
      <span className="sr-only">MedAgenda</span>
      <div className="flex items-center space-x-3">
        <div className={`${sizeClasses[size]} bg-gradient-to-br from-[#259487] to-indigo-700 rounded-xl flex items-center justify-center shadow-lg`}>
          <Activity className={`${iconSizeClasses[size]} text-white`} />
        </div>
        {showText && (
          <span className={`${textSizeClasses[size]} font-bold text-white`}>MedAgenda</span>
        )}
      </div>
    </Link>
  );
}
