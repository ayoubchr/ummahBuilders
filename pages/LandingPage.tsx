
import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { useLang } from '../i18n/LanguageContext';

export const LandingPage: React.FC = () => {
  const { t } = useLang();
  const l = t.landing;

  return (
    <div className="h-full overflow-y-auto bg-white dark:bg-[#0a0a0a] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-24 lg:space-y-32 overflow-hidden">
        {/* Hero */}
        <section className="relative pt-16 lg:pt-24 pb-8 flex flex-col lg:flex-row items-center gap-16">
          <div className="absolute top-0 left-0 w-[1000px] h-[1000px] bg-teal-500/5 blur-[150px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

          <div className="flex-1 space-y-8 lg:space-y-10 relative z-10">
            <div className="inline-flex items-center gap-3 px-3 py-1 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase">
              <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse" />
              {l.badge}
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tighter text-neutral-900 dark:text-white leading-[0.95]">
              {l.titleA} <br />
              <span className="text-teal-600 font-serif italic">{l.titleB}</span> <br />
              {l.titleC}
            </h1>
            <p className="max-w-xl text-lg lg:text-xl text-neutral-500 dark:text-neutral-400 font-light leading-relaxed">
              {l.intro}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-start">
              <Link
                to="/onboarding"
                className="px-10 py-5 text-center bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-2xl text-[12px] font-bold tracking-widest hover:opacity-90 transition-all hover:-translate-y-1 active:scale-95 uppercase"
              >
                {l.ctaJoin}
              </Link>
              <Link
                to="/login"
                className="px-10 py-5 text-center bg-white dark:bg-transparent border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 rounded-2xl text-[12px] font-bold tracking-widest hover:border-neutral-900 dark:hover:border-white hover:text-neutral-900 dark:hover:text-white transition-all uppercase"
              >
                {t.common.login}
              </Link>
            </div>
          </div>

          <div className="flex-1 w-full lg:w-auto relative hidden lg:block">
            <div className="absolute inset-0 bg-neutral-50 dark:bg-neutral-900 rounded-[4rem] -rotate-6 scale-105" />
            <div className="relative bg-white dark:bg-[#121212] p-10 rounded-[4rem] border border-neutral-100 dark:border-neutral-800 shadow-2xl space-y-6">
              <p className="text-[10px] font-bold text-neutral-400 tracking-widest uppercase">{l.principlesTitle}</p>
              {l.principles.map(p => (
                <div key={p} className="flex items-center gap-4 bg-neutral-50 dark:bg-neutral-900 p-4 rounded-2xl border border-neutral-100 dark:border-neutral-800">
                  <span className="w-8 h-8 shrink-0 rounded-xl bg-teal-50 dark:bg-teal-900/30 text-teal-600 flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                    </svg>
                  </span>
                  <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">{p}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pillars */}
        <section className="space-y-16">
          <div className="text-center space-y-6 max-w-2xl mx-auto">
            <h2 className="text-[11px] font-bold text-teal-600 tracking-[0.3em] uppercase">{l.pillarsLabel}</h2>
            <h3 className="text-3xl lg:text-4xl font-light text-neutral-900 dark:text-white leading-tight">{l.pillarsTitle}</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {l.pillars.map((v, i) => (
              <div key={v.title} className="space-y-5 group">
                <div className="w-12 h-12 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 flex items-center justify-center text-neutral-400 group-hover:bg-teal-600 group-hover:text-white transition-all duration-500">
                  <span className="text-lg font-bold italic">0{i + 1}</span>
                </div>
                <h4 className="text-xl font-medium text-neutral-900 dark:text-white">{v.title}</h4>
                <p className="text-neutral-500 dark:text-neutral-400 font-light leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 lg:py-32 relative text-center">
          <div className="absolute inset-0 bg-neutral-900 rounded-[3rem] lg:rounded-[5rem] overflow-hidden">
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-teal-600/20 blur-[150px] rounded-full translate-x-1/2 translate-y-1/2" />
          </div>
          <div className="relative z-10 space-y-10 py-10 px-6">
            <h2 className="text-3xl md:text-6xl font-light text-white leading-tight">
              {l.ctaTitleA}<br />
              <span className="text-teal-400 font-serif italic">{l.ctaTitleB}</span>
            </h2>
            <Link
              to="/onboarding"
              className="inline-block px-10 py-5 bg-white text-neutral-900 rounded-3xl text-[13px] font-bold tracking-[0.2em] hover:scale-105 active:scale-95 transition-all uppercase"
            >
              {l.ctaButton}
            </Link>
            <div className="pt-8 flex flex-col items-center gap-4">
              <Logo size="sm" inverted />
              <p className="text-neutral-500 text-[10px] tracking-widest uppercase">&copy; {new Date().getFullYear()} — {l.footer}</p>
            </div>
          </div>
        </section>
      </div>
      <footer className="h-12" />
    </div>
  );
};
