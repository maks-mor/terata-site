import React from 'react';

interface WingsIconProps {
  className?: string;
  size?: number;
}

export const WingsIcon: React.FC<WingsIconProps> = ({ className = '', size = 24 }) => {
  return (
    <img
      src="/logo.png"
      alt="Terata"
      style={{ height: `${size}px`, width: 'auto', maxHeight: `${size}px` }}
      className={`object-contain inline-block shrink-0 select-none ${className}`}
      draggable={false}
    />
  );
};
