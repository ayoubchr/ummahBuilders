import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { LanguageToggle } from './LanguageToggle';
import { ThemeToggle } from './ThemeToggle';
import { useLang } from '../i18n/LanguageContext';

interface PublicNavProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

// Top bar for visitors who have no profile yet.
export const PublicNav: React.FC<PublicNavProps> = ({ theme, onToggleTheme }) => {
  const { t } = useLang();
  const location = useLocation();

  const links = [
    { name: t.nav.manifesto, path: '/community/manifesto' },
    { name: t.nav.roadmap, path: '/community/roadmap' },
    { name: t.nav.support, path: '/community/support' },
  ];

  return (
    <nav className="shrink-0 z-50 px-4 sm:px-6 py-3 flex justify-between items-center gap-4 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md border-b border-neutral-100 dark:border-neutral-800">
      <Link to="/" aria-label="Ummah Builders">
        <Logo size="sm" />
      </Link>

      <div className="hidden md:flex gap-6 items-center">
        {links.map(link => (
          <Link
            key={link.path}
            to={link.path}
            className={`text-[11px] font-bold tracking-widest uppercase transition-colors hover:text-teal-600 ${
              location.pathname === link.path ? 'text-teal-600' : 'text-neutral-500 dark:text-neutral-400'
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <LanguageToggle />
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        <Link
          to="/onboarding"
          className="hidden sm:inline-block px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-[11px] font-bold tracking-widest uppercase rounded-xl hover:opacity-90 transition-all"
        >
          {t.common.join}
        </Link>
      </div>
    </nav>
  );
};
