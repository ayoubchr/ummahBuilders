
import React, { useState, useMemo } from 'react';
import { MOCK_USERS, PROFESSIONS } from '../constants.tsx';
import { GlassPanel } from '../components/GlassPanel';
import { MatchDetail } from '../components/MatchDetail';
import { UserProfile } from '../types';

export const Network: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [search, setSearch] = useState('');
  const [filterProfession, setFilterProfession] = useState<string>('All');

  const filteredUsers = useMemo(() => {
    return MOCK_USERS.filter(u => {
      const matchesSearch = u.name?.toLowerCase().includes(search.toLowerCase()) || 
                            u.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
      const matchesProfession = filterProfession === 'All' || u.profession === filterProfession;
      return matchesSearch && matchesProfession;
    });
  }, [search, filterProfession]);

  return (
    <div className="h-full flex flex-col bg-neutral-50 dark:bg-[#0a0a0a] overflow-hidden">
      <header className="px-8 py-6 border-b border-neutral-100 dark:border-neutral-800 bg-white dark:bg-[#121212] space-y-4">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h1 className="text-2xl font-light text-neutral-900 dark:text-white tracking-tight">Network Explorer</h1>
            <p className="text-xs text-neutral-500 font-light">Explore 2.4k builders in the Ummah Builders collective.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-64">
               <input 
                 type="text" 
                 placeholder="Find members by name or skill..." 
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
                 className="w-full pl-10 pr-4 py-2 bg-neutral-100 dark:bg-neutral-800 rounded-xl text-xs outline-none dark:text-white focus:ring-1 focus:ring-teal-500/30"
               />
               <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
               </svg>
            </div>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {['All', ...PROFESSIONS].map(p => (
            <button 
              key={p} 
              onClick={() => setFilterProfession(p)}
              className={`px-4 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase transition-all whitespace-nowrap ${
                filterProfession === p 
                ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900' 
                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredUsers.map(user => (
            <GlassPanel 
              key={user.id} 
              onClick={() => setSelectedUser(user)}
              className="group cursor-pointer hover:border-neutral-300 dark:hover:border-neutral-700 transition-all bg-white dark:bg-[#121212] flex flex-col items-center text-center p-8 space-y-4"
            >
              <img src={user.avatar_url} className="w-20 h-20 rounded-2xl object-cover shadow-lg group-hover:scale-105 transition-all" alt={user.name} />
              <div>
                <h3 className="text-base font-semibold text-neutral-900 dark:text-white">{user.name}</h3>
                <p className="text-[11px] text-teal-600 font-medium tracking-wide uppercase">{user.profession}</p>
              </div>
              <p className="text-[12px] text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                {user.bio || "Building for the independent future of the digital world."}
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {user.tags.slice(0, 2).map(t => (
                  <span key={t} className="px-2 py-0.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-[10px] text-neutral-500 font-medium">
                    {t}
                  </span>
                ))}
              </div>
            </GlassPanel>
          ))}
        </div>
      </main>

      {selectedUser && (
        <MatchDetail 
          user={selectedUser} 
          onClose={() => setSelectedUser(null)} 
        />
      )}
    </div>
  );
};
