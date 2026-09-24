
import React from 'react';
import { useLang } from '../../i18n/LanguageContext';

const ICONS = {
  charity: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
  zakat: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z',
  sponsor: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
};

export const Support: React.FC = () => {
  const { t } = useLang();
  const s = t.support;

  const cards = [
    { icon: ICONS.charity, title: s.charityTitle, text: s.charityText },
    { icon: ICONS.zakat, title: s.zakatTitle, text: s.zakatText },
    { icon: ICONS.sponsor, title: s.sponsorTitle, text: s.sponsorText },
  ];

  return (
    <div className="h-full bg-neutral-50 dark:bg-[#0a0a0a] overflow-y-auto p-4 sm:p-8 lg:p-12">
      <div className="max-w-5xl mx-auto space-y-10">
        <header className="space-y-2">
          <h1 className="text-3xl lg:text-4xl font-light text-neutral-900 dark:text-white tracking-tighter">{s.title}</h1>
          <p className="text-sm text-neutral-500 font-light">{s.subtitle}</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map(card => (
            <div key={card.title} className="bg-white dark:bg-[#121212] border border-neutral-100 dark:border-neutral-800 rounded-[2rem] p-8 space-y-5 flex flex-col">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center text-teal-600">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={card.icon} />
                </svg>
              </div>
              <div className="space-y-2 flex-1">
                <h3 className="text-lg font-medium text-neutral-900 dark:text-white">{card.title}</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 font-light leading-relaxed">{card.text}</p>
              </div>
              <span className="self-start px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 text-[10px] font-bold tracking-widest uppercase">
                {t.common.comingSoon}
              </span>
            </div>
          ))}
        </div>

        <section className="bg-neutral-900 dark:bg-[#1a1a1a] rounded-[2.5rem] p-8 lg:p-12 text-white text-center">
          <div className="max-w-xl mx-auto space-y-4">
            <h2 className="text-2xl lg:text-3xl font-light tracking-tight">{s.goalTitle}</h2>
            <p className="text-neutral-400 font-light leading-relaxed">{s.goalText}</p>
          </div>
        </section>
      </div>
    </div>
  );
};
