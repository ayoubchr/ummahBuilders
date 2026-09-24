import React, { createContext, useContext, useEffect, useState } from 'react';
import { Lang, Translations, translations } from './translations';

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const readStoredLang = (): Lang => {
  try {
    const stored = localStorage.getItem('ub_lang');
    if (stored === 'nl' || stored === 'en') return stored;
  } catch {}
  return navigator.language?.toLowerCase().startsWith('en') ? 'en' : 'nl';
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Lang>(readStoredLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem('ub_lang', lang);
    } catch {}
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used inside LanguageProvider');
  return ctx;
};
