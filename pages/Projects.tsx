
import React from 'react';
import { useLang } from '../i18n/LanguageContext';

export const Projects: React.FC = () => {
  const { t } = useLang();
  const p = t.projects;

  return (
    <div className="h-full flex flex-col bg-neutral-50 dark:bg-[#0a0a0a] overflow-hidden">
      <header className="px-4 lg:px-8 py-8 border-b border-neutral-100 dark:border-neutral-800 bg-white dark:bg-[#121212] shrink-0">
        <h1 className="text-2xl font-light text-neutral-900 dark:text-white tracking-tight">{p.title}</h1>
        <p className="text-sm text-neutral-500 font-light mt-1">{p.subtitle}</p>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-6">
        <div className="w-24 h-24 rounded-3xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-300 dark:text-neutral-600">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-light text-neutral-900 dark:text-white">{p.emptyTitle}</h2>
          <p className="max-w-md text-sm text-neutral-400 font-light leading-relaxed">{p.emptyText}</p>
        </div>
        <span className="px-4 py-1.5 rounded-full bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 text-[11px] font-bold tracking-widest uppercase">
          {t.common.comingSoon}
        </span>
      </main>
    </div>
  );
};
