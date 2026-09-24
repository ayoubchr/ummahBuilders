
import React, { useEffect, useRef } from 'react';
import { UserProfile } from '../types';

interface MatchDetailProps {
  user: UserProfile;
  onClose: () => void;
  reason?: string;
}

export const MatchDetail: React.FC<MatchDetailProps> = ({ user, onClose, reason }) => {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-end animate-in"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-neutral-900/10 dark:bg-black/40 backdrop-blur-sm" />
      
      {/* Panel */}
      <div 
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg h-full bg-white dark:bg-[#121212] shadow-2xl flex flex-col p-10 animate-in slide-in-from-right border-l border-neutral-100 dark:border-neutral-800"
      >
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-all p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="space-y-8 flex-1 overflow-y-auto pr-2">
          <header className="flex items-center gap-6">
            <img src={user.avatar_url} className="w-24 h-24 rounded-3xl object-cover shadow-xl border-4 border-white dark:border-neutral-800" alt="" />
            <div className="space-y-1">
              <h2 className="text-3xl font-light text-neutral-900 dark:text-white tracking-tight">{user.name}</h2>
              <p className="text-sm text-teal-600 font-medium tracking-wide">@{user.alias} — {user.profession}</p>
            </div>
          </header>

          <section className="space-y-4">
            <h4 className="text-[11px] font-bold text-neutral-400 tracking-widest uppercase">Mission Statement</h4>
            <p className="text-neutral-600 dark:text-neutral-400 font-light leading-relaxed text-lg italic">
              "{user.bio || "Dedicated to building a resilient, private, and ethically-aligned future for the global ummah through superior craft and coordinated action."}"
            </p>
          </section>

          <div className="grid grid-cols-2 gap-8">
             <div className="space-y-2">
               <h4 className="text-[11px] font-bold text-neutral-400 tracking-widest uppercase">Location</h4>
               <p className="text-neutral-800 dark:text-neutral-200 font-medium">{user.country}</p>
             </div>
             <div className="space-y-2">
               <h4 className="text-[11px] font-bold text-neutral-400 tracking-widest uppercase">Member Since</h4>
               <p className="text-neutral-800 dark:text-neutral-200 font-medium">Ramadan 1445</p>
             </div>
          </div>

          <section className="space-y-4">
            <h4 className="text-[11px] font-bold text-neutral-400 tracking-widest uppercase">Domain Expertise</h4>
            <div className="flex flex-wrap gap-3">
              {user.tags.map(tag => (
                <span key={tag} className="px-4 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 text-neutral-600 dark:text-neutral-400 text-xs font-medium border border-neutral-100 dark:border-neutral-800">
                  {tag}
                </span>
              ))}
            </div>
          </section>

          {reason && (
            <section className="p-6 bg-teal-50 dark:bg-teal-900/10 rounded-2xl border border-teal-100 dark:border-teal-900/30 space-y-3">
               <h4 className="text-[11px] font-bold text-teal-700 dark:text-teal-400 tracking-widest uppercase">The Connection Opportunity</h4>
               <p className="text-sm text-teal-800 dark:text-teal-300 font-light leading-relaxed">
                 {reason}
               </p>
            </section>
          )}
        </div>

        <div className="pt-8 border-t border-neutral-100 dark:border-neutral-800 grid grid-cols-2 gap-4">
           <button className="py-4 border border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 rounded-2xl text-[12px] font-bold tracking-widest uppercase hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all">
             SAVE TO NETWORK
           </button>
           <button 
            onClick={() => alert(`Connecting you to ${user.name}... Messaging opens in V2.`)}
            className="py-4 bg-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 text-white rounded-2xl text-[12px] font-bold tracking-widest uppercase hover:bg-neutral-800 dark:hover:bg-white transition-all shadow-xl shadow-neutral-200 dark:shadow-none"
           >
             INITIATE CONTACT
           </button>
        </div>
      </div>
    </div>
  );
};
