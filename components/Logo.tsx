
import React from 'react';

// `inverted` is for dark backgrounds that stay dark regardless of theme.
export const Logo: React.FC<{ size?: 'sm' | 'md' | 'lg'; inverted?: boolean }> = ({ size = 'md', inverted = false }) => {
  const sizes = {
    sm: 'w-6 h-6 text-xl',
    md: 'w-10 h-10 text-2xl',
    lg: 'w-14 h-14 text-4xl'
  };

  const badge = inverted ? 'bg-white text-neutral-900' : 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900';
  const primary = inverted ? 'text-white' : 'text-neutral-900 dark:text-white';
  const secondary = inverted ? 'text-neutral-400' : 'text-neutral-500 dark:text-neutral-400';

  return (
    <div className="flex items-center gap-3">
      <div className={`${sizes[size]} rounded-xl ${badge} flex items-center justify-center font-serif`}>
        م
      </div>
      <div className="flex flex-col leading-none">
        <span className={`text-[13px] font-semibold tracking-widest uppercase ${primary}`}>UMMAH</span>
        <span className={`text-[13px] font-light tracking-widest uppercase ${secondary}`}>BUILDERS</span>
      </div>
    </div>
  );
};
