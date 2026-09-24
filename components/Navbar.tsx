
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Navbar: React.FC<{ isAuthenticated: boolean }> = ({ isAuthenticated }) => {
  const location = useLocation();

  const navLinks = isAuthenticated 
    ? [
        { name: 'MATCHES', path: '/matches' },
        { name: 'TOPICS', path: '/topics' },
        { name: 'PROFILE', path: '/profile' }
      ]
    : [
        { name: 'ABOUT', path: '/about' }
      ];

  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-white/30 backdrop-blur-md border-b border-white/20">
      <Link to="/" className="flex items-center gap-2 group">
        <div className="w-8 h-8 rounded-full bg-teal-500/80 flex items-center justify-center transition-transform group-hover:scale-110">
           <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
        <span className="text-sm font-medium tracking-widest text-neutral-800">UMMAH BUILDERS</span>
      </Link>

      <div className="flex gap-8 items-center">
        {navLinks.map((link) => (
          <Link 
            key={link.path} 
            to={link.path}
            className={`text-[11px] font-medium tracking-widest transition-colors hover:text-teal-600 ${
              location.pathname === link.path ? 'text-teal-600' : 'text-neutral-500'
            }`}
          >
            {link.name}
          </Link>
        ))}
        {!isAuthenticated && (
          <Link 
            to="/onboarding"
            className="px-4 py-2 bg-neutral-900 text-white text-[11px] font-medium tracking-widest rounded-full hover:bg-neutral-800 transition-all active:scale-95"
          >
            JOIN NOW
          </Link>
        )}
      </div>
    </nav>
  );
};
