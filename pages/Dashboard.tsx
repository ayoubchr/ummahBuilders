
import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { MatchReason, UserProfile } from '../types';
import { MOCK_USERS } from '../constants.tsx';
import { calculateMatches } from '../services/matchingEngine';
import { useSavedMembers } from '../services/savedMembers';
import { GlassPanel } from '../components/GlassPanel';
import { MatchDetail } from '../components/MatchDetail';
import { formatMatchReason } from '../components/matchReason';
import { useLang } from '../i18n/LanguageContext';

export const Dashboard: React.FC<{ currentUser: UserProfile }> = ({ currentUser }) => {
  const { t } = useLang();
  const d = t.dashboard;
  const [activeTab, setActiveTab] = useState<'all' | 'saved'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMatch, setSelectedMatch] = useState<{ user: UserProfile; reason: MatchReason | null } | null>(null);
  const { savedIds, isSaved, toggleSaved } = useSavedMembers();

  const allMatches = useMemo(() => {
    return calculateMatches(currentUser, MOCK_USERS).map(s => ({
      user: MOCK_USERS.find(u => u.id === s.profileId)!,
      score: s.score,
      reason: s.reason
    }));
  }, [currentUser]);

  const matches = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return allMatches
      .filter(m => activeTab === 'all' || savedIds.includes(m.user.id))
      .filter(m =>
        !q ||
        m.user.name?.toLowerCase().includes(q) ||
        t.professions[m.user.profession].toLowerCase().includes(q) ||
        m.user.tags.some(tag => t.topics[tag].toLowerCase().includes(q))
      );
  }, [allMatches, activeTab, savedIds, searchQuery, t]);

  const stats = [
    { label: d.statMatches, value: allMatches.filter(m => m.score > 0).length },
    { label: d.statSaved, value: savedIds.length },
    { label: d.statTopics, value: currentUser.tags.length },
    { label: d.statMembers, value: MOCK_USERS.length + 1 },
  ];

  const tabs: { id: 'all' | 'saved'; label: string }[] = [
    { id: 'all', label: d.tabAll },
    { id: 'saved', label: d.tabSaved },
  ];

  return (
    <div className="h-full flex flex-col overflow-hidden bg-neutral-50 dark:bg-[#0a0a0a]">
      <header className="px-4 py-4 lg:px-8 border-b border-neutral-100 dark:border-neutral-800 bg-white dark:bg-[#121212] shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center gap-4">
          <div className="relative w-full sm:w-64 lg:w-80">
            <input
              type="search"
              aria-label={d.search}
              placeholder={d.search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-neutral-100 dark:bg-neutral-800 rounded-xl text-sm border-transparent focus:ring-1 focus:ring-teal-500/30 outline-none transition-all dark:text-white"
            />
            <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="flex items-center gap-6 w-full sm:w-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                aria-pressed={activeTab === tab.id}
                className={`text-[11px] font-bold tracking-widest uppercase transition-all pb-1 border-b-2 whitespace-nowrap ${
                  activeTab === tab.id ? 'text-neutral-900 dark:text-white border-neutral-900 dark:border-white' : 'text-neutral-400 border-transparent hover:text-neutral-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6 lg:space-y-10">
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {stats.map(stat => (
              <div key={stat.label} className="bg-white dark:bg-[#121212] p-4 lg:p-5 rounded-2xl card-shadow border border-neutral-100 dark:border-neutral-800">
                <span className="text-[10px] font-bold text-neutral-400 tracking-widest uppercase">{stat.label}</span>
                <div className="mt-1 lg:mt-2 text-xl lg:text-2xl font-light text-neutral-900 dark:text-white tabular-nums">{stat.value}</div>
              </div>
            ))}
          </section>

          {currentUser.tags.length === 0 && (
            <p className="text-sm text-neutral-500">
              <Link to="/settings" className="text-teal-600 hover:underline">{d.noTopicsHint}</Link>
            </p>
          )}

          <section className="space-y-4 lg:space-y-6">
            <h2 className="text-[11px] font-bold text-neutral-400 tracking-[0.2em] uppercase px-1">{d.recommended}</h2>
            {matches.length === 0 ? (
              <p className="py-16 text-center text-sm text-neutral-400">{activeTab === 'saved' ? d.emptySaved : d.empty}</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
                {matches.map(({ user, reason }) => {
                  const saved = isSaved(user.id);
                  const reasonText = formatMatchReason(reason, t);
                  return (
                    <GlassPanel
                      key={user.id}
                      onClick={() => setSelectedMatch({ user, reason })}
                      className="group cursor-pointer hover:border-neutral-300 dark:hover:border-neutral-700 transition-all flex flex-col justify-between h-full bg-white dark:bg-[#121212]"
                    >
                      <div className="space-y-3 lg:space-y-4">
                        <img src={user.avatar_url} className="w-12 h-12 rounded-xl object-cover ring-1 ring-neutral-100 dark:ring-neutral-800" alt="" />
                        <div>
                          <h3 className="text-base font-semibold text-neutral-900 dark:text-white leading-tight">{user.name}</h3>
                          <p className="text-[12px] text-neutral-500 dark:text-neutral-400 font-medium mt-0.5">
                            {t.professions[user.profession]} — {user.city_region || user.country}
                          </p>
                        </div>
                        <p className="text-[12px] text-neutral-400 dark:text-neutral-500 font-light leading-relaxed line-clamp-2">
                          {user.bio || t.detail.noBio}
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-neutral-50 dark:border-neutral-800 flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 tracking-widest uppercase">{reasonText}</span>
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleSaved(user.id); }}
                          aria-pressed={saved}
                          aria-label={saved ? d.unsave : d.save}
                          title={saved ? d.unsave : d.save}
                          className={`p-1.5 rounded-lg transition-all hover:bg-neutral-50 dark:hover:bg-neutral-800 ${saved ? 'text-teal-600' : 'text-neutral-400'}`}
                        >
                          <svg className="w-4 h-4" fill={saved ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                          </svg>
                        </button>
                      </div>
                    </GlassPanel>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </main>

      {selectedMatch && (
        <MatchDetail
          user={selectedMatch.user}
          reason={selectedMatch.reason}
          isSaved={isSaved(selectedMatch.user.id)}
          onToggleSave={() => toggleSaved(selectedMatch.user.id)}
          onClose={() => setSelectedMatch(null)}
        />
      )}
    </div>
  );
};
