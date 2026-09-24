import React from 'react';
import { useLang } from '../i18n/LanguageContext';
import { Lang } from '../i18n/translations';

const LANGS: Lang[] = ['nl', 'en'];

export const LanguageToggle: React.FC = () => {
  const { lang, setLang, t } = useLang();

  return (
    <div
      role="group"
      aria-label={t.common.toggleLanguage}
      className="flex p-1 rounded-xl bg-neutral-100 dark:bg-neutral-800"
    >
      {LANGS.map(l => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold tracking-widest uppercase transition-all ${
            lang === l
              ? 'bg-white dark:bg-neutral-600 text-neutral-900 dark:text-white shadow-sm'
              : 'text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
};
