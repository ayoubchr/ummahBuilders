
import React from 'react';

export const Projects: React.FC = () => {
  return (
    <div className="h-full flex flex-col bg-neutral-50 dark:bg-[#0a0a0a] overflow-hidden">
      <header className="px-8 py-10 border-b border-neutral-100 dark:border-neutral-800 bg-white dark:bg-[#121212]">
        <h1 className="text-2xl font-light text-neutral-900 dark:text-white tracking-tight">Active Projects</h1>
        <p className="text-sm text-neutral-500 font-light mt-1">Discover what the collective is shipping today.</p>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-6">
        <div className="w-24 h-24 rounded-3xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-300 dark:text-neutral-600">
           <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
           </svg>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-light text-neutral-900 dark:text-white">The Forge is Warming Up</h2>
          <p className="max-w-md text-sm text-neutral-400 font-light leading-relaxed">
            Project coordination is launching in V2. Soon you will be able to propose projects, form teams, and manage development within the Ummah Builders ecosystem.
          </p>
        </div>
        <button className="px-6 py-2.5 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-xl text-[11px] font-bold tracking-widest uppercase hover:opacity-90 transition-all">
          GET NOTIFIED
        </button>
      </main>
    </div>
  );
};
