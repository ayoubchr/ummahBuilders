
import React, { useState, useMemo } from 'react';
import { MOCK_USERS, PROFESSIONS } from '../constants.tsx';
import { GlassPanel } from '../components/GlassPanel';
import { MatchDetail } from '../components/MatchDetail';
import { useSavedMembers } from '../services/savedMembers';
import { Profession, UserProfile } from '../types';
import { useLang } from '../i18n/LanguageContext';

export const Network: React.FC<{ currentUser: UserProfile }> = ({ currentUser }) => {
  const { t } = useLang();
  const n = t.network;
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [search, setSearch] = useState('');
  const [filterProfession, setFilterProfession] = useState<Profession | 'All'>('All');
  const { isSaved, toggleSaved } = useSavedMembers();

  const members = useMemo(
    () => [currentUser, ...MOCK_USERS.filter(u => u.is_matchable && u.id !== currentUser.id)],
    [currentUser]
  );

  const filteredUsers = useMemo(() => {
    const q = search.trim().toLowerCase();
    return members.filter(u => {
      const matchesSearch = !q ||
        u.name?.toLowerCase().includes(q) ||
        u.tags.some(tag => t.topics[tag].toLowerCase().includes(q));
      const matchesProfession = filterProfession === 'All' || u.profession === filterProfession;
      return matchesSearch && matchesProfession;
    });
  }, [members, search, filterProfession, t]);

  return (
    <div className="h-full flex flex-col bg-neutral-50 dark:bg-[#0a0a0a] overflow-hidden">
      <header className="px-4 lg:px-8 py-6 border-b border-neutral-100 dark:border-neutral-800 bg-white dark:bg-[#121212] space-y-4 shrink-0">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-light text-neutral-900 dark:text-white tracking-tight">{n.title}</h1>
            <p className="text-xs text-neutral-500 font-light">{n.subtitle(members.length)}</p>
          </div>
          <div className="relative w-full sm:w-64">
            <input
              type="search"
              aria-label={n.search}
              placeholder={n.search}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-neutral-100 dark:bg-neutral-800 rounded-xl text-xs outline-none dark:text-white focus:ring-1 focus:ring-teal-500/30"
            />
            <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {(['All', ...PROFESSIONS] as const).map(p => (
            <button
              key={p}
              onClick={() => setFilterProfession(p)}
              aria-pressed={filterProfession === p}
              className={`px-4 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase transition-all whitespace-nowrap ${
                filterProfession === p
                  ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
            >
              {p === 'All' ? n.all : t.professions[p]}
            </button>
          ))}
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 lg:p-8">
        {filteredUsers.length === 0 ? (
          <p className="py-16 text-center text-sm text-neutral-400">{n.empty}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredUsers.map(user => (
              <GlassPanel
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className="group cursor-pointer hover:border-neutral-300 dark:hover:border-neutral-700 transition-all bg-white dark:bg-[#121212] flex flex-col items-center text-center p-8 space-y-4"
              >
                <img src={user.avatar_url} className="w-20 h-20 rounded-2xl object-cover shadow-lg group-hover:scale-105 transition-all" alt="" />
                <div>
                  <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
                    {user.name}
                    {user.id === currentUser.id && (
                      <span className="ml-2 px-2 py-0.5 rounded-md bg-teal-50 dark:bg-teal-900/30 text-teal-600 text-[10px] font-bold uppercase tracking-widest align-middle">{n.you}</span>
                    )}
                  </h3>
                  <p className="text-[11px] text-teal-600 font-medium tracking-wide uppercase">{t.professions[user.profession]}</p>
                </div>
                <p className="text-[12px] text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                  {user.bio || t.detail.noBio}
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {user.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="px-2 py-0.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-[10px] text-neutral-500 font-medium">
                      {t.topics[tag]}
                    </span>
                  ))}
                </div>
              </GlassPanel>
            ))}
          </div>
        )}
      </main>

      {selectedUser && (
        <MatchDetail
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          isSaved={isSaved(selectedUser.id)}
          onToggleSave={selectedUser.id === currentUser.id ? undefined : () => toggleSaved(selectedUser.id)}
        />
      )}
    </div>
  );
};
