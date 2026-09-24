
import React from 'react';

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const GlassPanel: React.FC<GlassPanelProps> = ({ children, className = '', onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`glass rounded-2xl p-6 transition-all duration-300 hover:shadow-lg ${className}`}
    >
      {children}
    </div>
  );
};
