
import React from 'react';
import { useLang } from '../../i18n/LanguageContext';

// Index of the phase the organisation is currently in.
const CURRENT_PHASE = 0;

export const Roadmap: React.FC = () => {
  const { t } = useLang();
  const r = t.roadmap;

  return (
    <div className="h-full bg-neutral-50 dark:bg-[#0a0a0a] overflow-y-auto p-4 sm:p-8 lg:p-12">
      <div className="max-w-3xl mx-auto space-y-12">
        <header className="space-y-2">
          <h1 className="text-3xl lg:text-4xl font-light text-neutral-900 dark:text-white tracking-tighter">{r.title}</h1>
          <p className="text-sm text-neutral-500 font-light">{r.subtitle}</p>
        </header>

        <ol className="relative border-l border-neutral-200 dark:border-neutral-800 ml-3 space-y-10 pb-12">
          {r.phases.map((phase, i) => {
            const isCurrent = i === CURRENT_PHASE;
            return (
              <li key={phase.title} className="pl-8 relative">
                <span
                  className={`absolute -left-[13px] top-1 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isCurrent ? 'bg-teal-600 text-white ring-4 ring-teal-100 dark:ring-teal-900/40' : 'bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-neutral-400'
                  }`}
                >
                  {i + 1}
                </span>
                <div className={`bg-white dark:bg-[#121212] p-6 sm:p-8 rounded-[2rem] border space-y-4 ${isCurrent ? 'border-teal-200 dark:border-teal-900/60' : 'border-neutral-100 dark:border-neutral-800'}`}>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{phase.period}</span>
                    {isCurrent && (
                      <span className="px-2 py-0.5 rounded-md bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 text-[10px] font-bold uppercase tracking-widest">
                        {r.current}
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl font-medium text-neutral-900 dark:text-white">{phase.title}</h2>
                  <ul className="space-y-2">
                    {phase.items.map(item => (
                      <li key={item} className="flex gap-3 text-sm text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                        <span className="mt-2 w-1 h-1 shrink-0 rounded-full bg-teal-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};
