
import React from 'react';

export const Logo: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sizes = {
    sm: 'w-6 h-6 text-xl',
    md: 'w-10 h-10 text-2xl',
    lg: 'w-14 h-14 text-4xl'
  };

  return (
    <div className="flex items-center gap-3">
      <div className={`${sizes[size]} rounded-xl bg-neutral-900 flex items-center justify-center text-white font-serif`}>
        م
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-[13px] font-semibold tracking-widest text-neutral-900 uppercase">UMMAH</span>
        <span className="text-[13px] font-light tracking-widest text-neutral-500 uppercase">BUILDERS</span>
      </div>
    </div>
  );
};
