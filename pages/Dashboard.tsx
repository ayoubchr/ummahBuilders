
import React, { useMemo, useState } from 'react';
import { UserProfile } from '../types';
import { MOCK_USERS } from '../constants.tsx';
import { calculateMatches } from '../services/matchingEngine';
import { GlassPanel } from '../components/GlassPanel';
import { MatchDetail } from '../components/MatchDetail';

export const Dashboard: React.FC<{ currentUser: UserProfile }> = ({ currentUser }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'saved' | 'recent'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMatch, setSelectedMatch] = useState<{user: UserProfile, reason: string} | null>(null);

  const matches = useMemo(() => {
    const scores = calculateMatches(currentUser, MOCK_USERS);
    return scores.map(s => ({
      user: MOCK_USERS.find(u => u.id === s.profileId)!,
      score: s.score,
      reason: s.reason
    })).filter(m => 
      m.user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.user.profession.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.user.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [currentUser, searchQuery]);

  return (
    <div className="h-full flex flex-col overflow-hidden bg-neutral-50 dark:bg-[#0a0a0a]">
      {/* Search Header */}
      <header className="px-6 py-4 lg:px-8 lg:py-4 border-b border-neutral-100 dark:border-neutral-800 bg-white dark:bg-[#121212] shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center gap-4">
          <div className="relative w-full sm:w-64 lg:w-80">
            <input 
              type="text" 
              placeholder="Search builders..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-neutral-100 dark:bg-neutral-800 rounded-xl text-sm border-transparent focus:bg-white dark:focus:bg-neutral-700 focus:ring-1 focus:ring-teal-500/30 outline-none transition-all dark:text-white"
            />
            <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="flex items-center gap-6 overflow-x-auto w-full sm:w-auto scrollbar-hide pb-1 lg:pb-0">
            {['all', 'saved', 'recent'].map(t => (
              <button 
                key={t}
                onClick={() => setActiveTab(t as any)}
                className={`text-[10px] lg:text-[11px] font-bold tracking-widest uppercase transition-all pb-1 border-b-2 whitespace-nowrap ${
                  activeTab === t ? 'text-neutral-900 dark:text-white border-neutral-900 dark:border-white' : 'text-neutral-400 border-transparent hover:text-neutral-600'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-6 lg:space-y-10">
        {/* Stats Section */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {[
            { label: 'POTENTIALS', value: matches.length, delta: '+2' },
            { label: 'OVERLAP', value: 'Eng', delta: '85%' },
            { label: 'VISIONS', value: '12', delta: 'Active' },
            { label: 'BUILT', value: '4', delta: '100%' },
          ].map((stat, i) => (
            <div key={i} className="bg-white dark:bg-[#121212] p-4 lg:p-5 rounded-2xl card-shadow border border-neutral-100 dark:border-neutral-800">
              <span className="text-[9px] lg:text-[10px] font-bold text-neutral-400 tracking-widest uppercase">{stat.label}</span>
              <div className="flex items-end justify-between mt-1 lg:mt-2">
                <span className="text-xl lg:text-2xl font-light text-neutral-900 dark:text-white">{stat.value}</span>
                <span className="text-[9px] text-teal-600 font-medium mb-1">{stat.delta}</span>
              </div>
            </div>
          ))}
        </section>

        {/* Builder Grid */}
        <section className="space-y-4 lg:space-y-6">
          <h2 className="text-[10px] lg:text-[11px] font-bold text-neutral-400 tracking-[0.2em] uppercase px-1">Recommended</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
            {matches.map(({ user, score, reason }) => (
              <GlassPanel 
                key={user.id} 
                onClick={() => setSelectedMatch({ user, reason })}
                className="group cursor-pointer hover:border-neutral-300 dark:hover:border-neutral-700 transition-all flex flex-col justify-between h-full bg-white dark:bg-[#121212]"
              >
                <div className="space-y-3 lg:space-y-4">
                  <div className="flex justify-between items-start">
                    <img src={user.avatar_url} className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl object-cover ring-1 ring-neutral-100 dark:ring-neutral-800" alt={user.name} />
                    <div className="w-8 h-8 rounded-lg bg-neutral-50 dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 flex items-center justify-center text-[10px] font-bold text-neutral-400">
                      {score}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm lg:text-base font-semibold text-neutral-900 dark:text-white leading-tight transition-colors">
                      {user.name}
                    </h3>
                    <p className="text-[11px] lg:text-[12px] text-neutral-500 dark:text-neutral-400 font-medium mt-0.5">{user.profession} — {user.country}</p>
                  </div>
                  <p className="text-[11px] lg:text-[12px] text-neutral-400 dark:text-neutral-500 font-light leading-relaxed line-clamp-2">
                    {user.bio || "Building resilient tools and decentralized infrastructure."}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-neutral-50 dark:border-neutral-800 flex items-center justify-between">
                  <span className="text-[9px] font-bold text-teal-600 dark:text-teal-400 tracking-widest uppercase">{reason}</span>
                  <div className="flex gap-2">
                     <button className="p-1.5 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg text-neutral-400 transition-all">
                       <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                       </svg>
                     </button>
                  </div>
                </div>
              </GlassPanel>
            ))}
          </div>
        </section>
      </main>

      {/* Match Detail Slide-over */}
      {selectedMatch && (
        <MatchDetail 
          user={selectedMatch.user} 
          reason={selectedMatch.reason} 
          onClose={() => setSelectedMatch(null)} 
        />
      )}
    </div>
  );
};
