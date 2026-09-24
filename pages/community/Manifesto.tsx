
import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../../i18n/LanguageContext';

export const Manifesto: React.FC<{ isMember: boolean }> = ({ isMember }) => {
  const { t } = useLang();
  const m = t.manifesto;

  return (
    <div className="h-full bg-white dark:bg-[#0a0a0a] overflow-y-auto p-4 sm:p-8 lg:p-12">
      <div className="max-w-2xl mx-auto space-y-14 py-8 lg:py-12">
        <header className="space-y-6 text-center">
          <div className="w-12 h-12 rounded-2xl bg-teal-500 flex items-center justify-center text-white font-serif text-2xl mx-auto">م</div>
          <h1 className="text-4xl lg:text-5xl font-light text-neutral-900 dark:text-white tracking-tighter">{m.title}</h1>
          <p className="text-base text-neutral-500 dark:text-neutral-400 italic">{m.subtitle}</p>
        </header>

        <div className="space-y-8 text-neutral-700 dark:text-neutral-300 font-light text-lg leading-relaxed">
          <p>{m.intro}</p>
          {m.sections.map(section => (
            <section key={section.title} className="space-y-3">
              <h2 className="text-2xl font-medium text-neutral-900 dark:text-white">{section.title}</h2>
              <p>{section.text}</p>
            </section>
          ))}
        </div>

        {!isMember && (
          <footer className="pt-12 border-t border-neutral-100 dark:border-neutral-800 text-center space-y-6">
            <p className="text-sm text-neutral-400 uppercase tracking-widest font-bold">{m.cta}</p>
            <Link
              to="/onboarding"
              className="inline-block px-8 py-4 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-2xl text-[12px] font-bold tracking-widest uppercase hover:opacity-90 transition-all"
            >
              {t.landing.ctaJoin}
            </Link>
          </footer>
        )}
      </div>
    </div>
  );
};
