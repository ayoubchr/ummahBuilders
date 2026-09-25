
import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { Onboarding } from './pages/Onboarding';
import { Dashboard } from './pages/Dashboard';
import { Network } from './pages/Network';
import { Projects } from './pages/Projects';
import { Settings } from './pages/Settings';
import { Profile } from './pages/Profile';
import { Login } from './pages/Login';
import { Knowledge } from './pages/Knowledge';
import { Events } from './pages/Events';
import { Roadmap } from './pages/community/Roadmap';
import { Manifesto } from './pages/community/Manifesto';
import { Support } from './pages/community/Support';
import { Sidebar } from './components/Sidebar';
import { ThemeToggle } from './components/ThemeToggle';
import { LanguageToggle } from './components/LanguageToggle';
import { PublicNav } from './components/PublicNav';
import { UserProfile } from './types';
import { useLang } from './i18n/LanguageContext';
import { TOPICS } from './constants';
import * as auth from './services/auth';

type Theme = 'light' | 'dark';

const readSessionUser = (): UserProfile | null => {
  const profile = auth.getSessionUser();
  if (!profile) return null;
  // Drop tags from older versions that are no longer known topics.
  return { ...profile, tags: (profile.tags || []).filter(tag => TOPICS.includes(tag)) };
};

// Sends visitors without a session to the login page, remembering where they wanted to go.
const RequireAuth: React.FC<{ user: UserProfile | null; children: React.ReactElement }> = ({ user, children }) => {
  const location = useLocation();
  return user ? children : <Navigate to="/login" replace state={{ from: location.pathname }} />;
};

const readStoredTheme = (): Theme => {
  try {
    const stored = localStorage.getItem('ub_theme');
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {}
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const UserMenu: React.FC<{ user: UserProfile; onLogout: () => void; theme: Theme; onToggleTheme: () => void; onToggleSidebar: () => void }> = ({ user, onLogout, theme, onToggleTheme, onToggleSidebar }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { t } = useLang();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative flex items-center gap-2 lg:gap-3" ref={dropdownRef}>
      <button
        onClick={onToggleSidebar}
        aria-label={t.common.openMenu}
        className="lg:hidden p-2 mr-auto text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-all"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>

      <LanguageToggle />
      <ThemeToggle theme={theme} onToggle={onToggleTheme} />

      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={t.common.profile}
        className="w-9 h-9 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-sm transition-all hover:ring-2 hover:ring-teal-500/20"
      >
        <img src={user.avatar_url} alt="" className="w-full h-full object-cover" />
      </button>

      {isOpen && (
        <div className="absolute top-12 right-0 w-48 bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-2xl border border-neutral-100 dark:border-neutral-800 py-2 animate-in z-[70]">
          <Link
            to="/profile"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 text-[13px] text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white transition-all"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {t.common.profile}
          </Link>
          <Link
            to="/settings"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 text-[13px] text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white transition-all"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {t.common.settings}
          </Link>
          <div className="my-2 border-t border-neutral-100 dark:border-neutral-800" />
          <button
            onClick={() => { setIsOpen(false); onLogout(); }}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            {t.common.logout}
          </button>
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(readSessionUser);
  const [theme, setTheme] = useState<Theme>(readStoredTheme);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    try {
      localStorage.setItem('ub_theme', theme);
    } catch {}
  }, [theme]);

  const saveProfile = (profile: UserProfile) => {
    setCurrentUser(profile);
    auth.saveSessionProfile(profile);
  };

  const handleRegister = async (email: string, password: string, profile: UserProfile) => {
    const error = await auth.register(email, password, profile);
    if (!error) setCurrentUser(profile);
    return error;
  };

  const handleLogin = async (email: string, password: string) => {
    const result = await auth.login(email, password);
    if (typeof result === 'string') return false;
    setCurrentUser(result);
    return true;
  };

  const handleLogout = () => {
    auth.logout();
    // Full reload to the landing page so no member state lingers in memory.
    window.location.assign('/');
  };

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const requireUser = (element: React.ReactElement) => <RequireAuth user={currentUser}>{element}</RequireAuth>;

  return (
    <Router>
      <div className="h-full w-full flex overflow-hidden bg-neutral-50 dark:bg-[#0a0a0a] transition-colors duration-200">
        {currentUser && (
          <Sidebar
            isAuthenticated={true}
            onLogout={handleLogout}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
        )}

        <div className="flex-1 h-full overflow-hidden relative flex flex-col">
          {currentUser ? (
            <div className="shrink-0 z-[50] px-4 py-3 lg:px-8 flex justify-end bg-white dark:bg-[#121212] border-b border-neutral-100 dark:border-neutral-800">
              <UserMenu
                user={currentUser}
                onLogout={handleLogout}
                theme={theme}
                onToggleTheme={toggleTheme}
                onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
              />
            </div>
          ) : (
            <PublicNav theme={theme} onToggleTheme={toggleTheme} />
          )}

          <div className="flex-1 overflow-hidden relative">
            <Routes>
              <Route path="/" element={currentUser ? <Navigate to="/matches" replace /> : <LandingPage />} />
              <Route
                path="/login"
                element={currentUser ? <Navigate to="/matches" replace /> : <Login onLogin={handleLogin} />}
              />
              <Route
                path="/onboarding"
                element={currentUser ? <Navigate to="/matches" replace /> : <Onboarding onComplete={handleRegister} />}
              />
              <Route path="/matches" element={requireUser(<Dashboard currentUser={currentUser!} />)} />
              <Route path="/network" element={requireUser(<Network currentUser={currentUser!} />)} />
              <Route path="/projects" element={requireUser(<Projects />)} />
              <Route path="/settings" element={requireUser(<Settings user={currentUser!} onUpdate={saveProfile} theme={theme} onSetTheme={setTheme} />)} />
              <Route path="/profile" element={requireUser(<Profile user={currentUser!} />)} />
              <Route path="/knowledge" element={requireUser(<Knowledge currentUser={currentUser!} />)} />
              <Route path="/events" element={requireUser(<Events currentUser={currentUser!} />)} />
              <Route path="/community/roadmap" element={requireUser(<Roadmap />)} />
              <Route path="/community/manifesto" element={requireUser(<Manifesto />)} />
              <Route path="/community/support" element={requireUser(<Support />)} />
              <Route path="/about" element={<Navigate to="/community/manifesto" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
