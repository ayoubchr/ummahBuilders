
import React, { useState, useEffect, useRef } from 'react';
import { MemoryRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { Onboarding } from './pages/Onboarding';
import { Dashboard } from './pages/Dashboard';
import { Network } from './pages/Network';
import { Projects } from './pages/Projects';
import { Settings } from './pages/Settings';
import { Blog } from './pages/community/Blog';
import { Manifesto } from './pages/community/Manifesto';
import { Support } from './pages/community/Support';
import { Sidebar } from './components/Sidebar';
import { ThemeToggle } from './components/ThemeToggle';
import { UserProfile } from './types';
import { Logo } from './components/Logo';
import { MOCK_USERS } from './constants';

const UserMenu: React.FC<{ user: UserProfile; onLogout: () => void; theme: 'light' | 'dark'; onToggleTheme: () => void; onToggleSidebar: () => void }> = ({ user, onLogout, theme, onToggleTheme, onToggleSidebar }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    <div className="relative flex items-center gap-3 lg:gap-4" ref={dropdownRef}>
      <button 
        onClick={onToggleSidebar}
        className="lg:hidden p-2 text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-all"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>

      <div className="hidden sm:flex -space-x-1.5 mr-2">
         {MOCK_USERS.slice(0, 3).map((u, i) => (
           <img key={i} src={u.avatar_url} className="w-6 h-6 rounded-full border-2 border-white dark:border-neutral-900 shadow-sm" alt="" />
         ))}
      </div>
      
      <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-9 h-9 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-sm transition-all hover:ring-2 hover:ring-teal-500/20"
      >
        <img src={user.avatar_url} alt="Profile" className="w-full h-full object-cover" />
      </button>

      {isOpen && (
        <div className="absolute top-12 right-0 w-48 bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-2xl border border-neutral-100 dark:border-neutral-800 py-2 animate-in slide-in-from-top-2 z-[70]">
          <Link 
            to="/profile" 
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 text-[13px] text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white transition-all"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Profile
          </Link>
          <Link 
            to="/settings" 
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 text-[13px] text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white transition-all"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Settings
          </Link>
          <div className="my-2 border-t border-neutral-100 dark:border-neutral-800" />
          <button 
            onClick={() => { setIsOpen(false); onLogout(); }}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // Load profile
    const storedProfile = localStorage.getItem('ub_user_profile');
    if (storedProfile) {
      setCurrentUser(JSON.parse(storedProfile));
    }

    // Load theme
    const storedTheme = localStorage.getItem('ub_theme') as 'light' | 'dark' | null;
    const initialTheme = storedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('ub_theme', theme);
  }, [theme]);

  const handleOnboardingComplete = (profile: UserProfile) => {
    setCurrentUser(profile);
    localStorage.setItem('ub_user_profile', JSON.stringify(profile));
  };

  const handleProfileUpdate = (profile: UserProfile) => {
    setCurrentUser(profile);
    localStorage.setItem('ub_user_profile', JSON.stringify(profile));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('ub_user_profile');
    setIsSidebarOpen(false);
  };

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

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
          {/* Header Actions for authenticated users */}
          {currentUser && (
            <div className="sticky top-0 lg:absolute lg:top-4 lg:right-8 z-[50] p-4 lg:p-0 flex justify-end bg-neutral-50/80 dark:bg-[#0a0a0a]/80 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none border-b lg:border-none border-neutral-100 dark:border-neutral-800">
              <UserMenu 
                user={currentUser} 
                onLogout={handleLogout} 
                theme={theme} 
                onToggleTheme={toggleTheme} 
                onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
              />
            </div>
          )}

          <div className="flex-1 overflow-hidden relative">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route 
                path="/onboarding" 
                element={
                  currentUser 
                    ? <Navigate to="/matches" /> 
                    : <Onboarding onComplete={handleOnboardingComplete} />
                } 
              />
              <Route 
                path="/matches" 
                element={
                  currentUser 
                    ? <Dashboard currentUser={currentUser} /> 
                    : <Navigate to="/onboarding" />
                } 
              />
              <Route 
                path="/network" 
                element={
                  currentUser 
                    ? <Network /> 
                    : <Navigate to="/onboarding" />
                } 
              />
              <Route 
                path="/projects" 
                element={
                  currentUser 
                    ? <Projects /> 
                    : <Navigate to="/onboarding" />
                } 
              />
              <Route 
                path="/settings" 
                element={
                  currentUser 
                    ? <Settings user={currentUser} onUpdate={handleProfileUpdate} /> 
                    : <Navigate to="/onboarding" />
                } 
              />
              <Route path="/community/blog" element={<Blog />} />
              <Route path="/community/manifesto" element={<Manifesto />} />
              <Route path="/community/support" element={<Support />} />
              <Route 
                path="/profile" 
                element={
                  currentUser ? (
                    <div className="h-full bg-neutral-50 dark:bg-[#0a0a0a] overflow-y-auto p-6 lg:p-12">
                      <div className="max-w-4xl mx-auto space-y-8 lg:space-y-12 animate-in">
                        <header className="flex flex-col lg:flex-row items-center lg:items-end gap-6 lg:gap-10">
                          <img 
                            src={currentUser.avatar_url} 
                            className="w-32 h-32 lg:w-48 lg:h-48 rounded-[2rem] lg:rounded-[3rem] object-cover shadow-2xl border-4 border-white dark:border-neutral-800" 
                            alt="Profile"
                          />
                          <div className="space-y-3 lg:space-y-4 pb-4 text-center lg:text-left">
                             <div className="inline-block px-3 py-1 bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 text-[10px] font-bold tracking-widest uppercase rounded-full">Member Profile</div>
                             <h1 className="text-3xl lg:text-5xl font-light text-neutral-900 dark:text-white tracking-tighter">{currentUser.name}</h1>
                             <p className="text-base lg:text-lg text-neutral-400 font-light">@{currentUser.alias} — {currentUser.profession} in {currentUser.country}</p>
                          </div>
                        </header>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                          <div className="lg:col-span-2 space-y-6 lg:space-y-8">
                            <section className="bg-white dark:bg-[#121212] p-8 lg:p-10 rounded-[2rem] lg:rounded-[2.5rem] border border-neutral-100 dark:border-neutral-800 card-shadow space-y-4">
                              <h3 className="text-[11px] font-bold text-neutral-400 tracking-widest uppercase">Builder Bio</h3>
                              <p className="text-lg lg:text-xl text-neutral-800 dark:text-neutral-200 font-light leading-relaxed">
                                {currentUser.bio || "Crafting the next generation of ethical technology for the global network."}
                              </p>
                            </section>
                            
                            <section className="bg-white dark:bg-[#121212] p-8 lg:p-10 rounded-[2rem] lg:rounded-[2.5rem] border border-neutral-100 dark:border-neutral-800 card-shadow space-y-6">
                              <h3 className="text-[11px] font-bold text-neutral-400 tracking-widest uppercase">Domain Tags</h3>
                              <div className="flex flex-wrap gap-2 lg:gap-3">
                                {currentUser.tags.map(t => (
                                  <span key={t} className="px-4 py-2 bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-400 rounded-xl text-xs font-medium border border-neutral-100 dark:border-neutral-800">
                                    {t}
                                  </span>
                                ))}
                              </div>
                            </section>
                          </div>
                          
                          <div className="space-y-6 lg:space-y-8">
                            <section className="bg-neutral-900 dark:bg-[#1a1a1a] p-8 rounded-[2rem] lg:rounded-[2.5rem] text-white space-y-4">
                              <h3 className="text-[10px] font-bold text-neutral-500 tracking-widest uppercase">Visibility Stats</h3>
                              <div className="space-y-4">
                                 <div className="flex justify-between items-center">
                                    <span className="text-sm font-light">Discoverable</span>
                                    <span className={`text-xs font-bold uppercase ${currentUser.is_matchable ? 'text-teal-400' : 'text-neutral-500'}`}>
                                      {currentUser.is_matchable ? 'Active' : 'Private'}
                                    </span>
                                 </div>
                                 <div className="flex justify-between items-center">
                                    <span className="text-sm font-light">Matches Made</span>
                                    <span className="text-white text-xs font-bold uppercase">12</span>
                                 </div>
                              </div>
                            </section>
                            
                            <Link to="/settings" className="block w-full text-center py-4 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white rounded-[2rem] text-[12px] font-bold tracking-widest uppercase hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-all">
                               Edit Profile
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : <Navigate to="/onboarding" />
                } 
              />
              <Route path="/about" element={
                <div className="h-full bg-white dark:bg-[#0a0a0a] overflow-y-auto pt-24 lg:pt-32 pb-20 transition-colors duration-200 px-6">
                  <div className="max-w-3xl mx-auto space-y-12 lg:space-y-16 animate-in">
                    <header className="space-y-6">
                      <h1 className="text-4xl lg:text-7xl font-light text-neutral-900 dark:text-white tracking-tighter leading-tight">
                        The <span className="font-serif italic text-teal-600">Manifesto</span> for Independence.
                      </h1>
                      <div className="w-24 h-1.5 bg-neutral-900 dark:bg-neutral-100 rounded-full" />
                    </header>
                    
                    <div className="space-y-8 text-lg lg:text-2xl text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                      <p>
                        The digital infrastructure of the 21st century has been built upon foundations that are often indifferent, if not hostile, to the values and survival of the global Ummah.
                      </p>
                      <p>
                        We refuse to be perpetual recipients of biased technology. We are the architects. We are the builders.
                      </p>
                      <p className="border-l-4 border-teal-500 pl-6 lg:pl-8 italic text-neutral-800 dark:text-neutral-200">
                        Our mission is to turn scattered talent into resilient infrastructure. We build ethical finance, private communication, and education platforms that belong to us.
                      </p>
                    </div>
                    
                    <div className="pt-12 border-t border-neutral-100 dark:border-neutral-800 flex justify-between items-center">
                      <Logo size="sm" />
                      <Link to="/onboarding" className="text-xs font-bold tracking-widest text-teal-600 hover:text-teal-700 uppercase">
                        Join →
                      </Link>
                    </div>
                  </div>
                </div>
              } />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
