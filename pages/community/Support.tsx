
import React from 'react';
import { GlassPanel } from '../../components/GlassPanel';

export const Support: React.FC = () => {
  return (
    <div className="h-full bg-neutral-50 dark:bg-[#0a0a0a] overflow-y-auto p-12">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="space-y-2">
          <h1 className="text-4xl font-light text-neutral-900 dark:text-white tracking-tighter">Support & Funding</h1>
          <p className="text-sm text-neutral-500 font-light">Resources for builders and opportunities for aligned capital.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <GlassPanel className="bg-white dark:bg-[#121212] border border-neutral-100 dark:border-neutral-800 p-10 space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center text-teal-600">
               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-medium text-neutral-900 dark:text-white">For VCs & Funders</h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 font-light leading-relaxed">
                We are connecting with ethical capital looking to support the next wave of sovereign infrastructure. If you represent a fund or are an individual investor:
              </p>
            </div>
            <button className="w-full py-4 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-2xl text-[11px] font-bold tracking-widest uppercase hover:opacity-90 transition-all">Get in Touch</button>
          </GlassPanel>

          <GlassPanel className="bg-white dark:bg-[#121212] border border-neutral-100 dark:border-neutral-800 p-10 space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center text-teal-600">
               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
               </svg>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-medium text-neutral-900 dark:text-white">Collaborator Network</h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 font-light leading-relaxed">
                Invite talented builders to the network. Every connection strengthens the global collective and opens new paths for collaboration.
              </p>
            </div>
            <button className="w-full py-4 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 rounded-2xl text-[11px] font-bold tracking-widest uppercase hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all">Generate Invite Link</button>
          </GlassPanel>
        </div>

        <section className="bg-neutral-900 dark:bg-[#1a1a1a] rounded-[2.5rem] p-12 text-white text-center space-y-8">
           <div className="max-w-xl mx-auto space-y-4">
              <h2 className="text-3xl font-light tracking-tight">Support the Collective</h2>
              <p className="text-neutral-400 font-light leading-relaxed">
                Ummah Builders is a non-profit collective. All support goes directly towards cloud credits for member projects, hosting infrastructure, and organizing regional hackathons.
              </p>
           </div>
           <button className="px-10 py-5 bg-teal-500 text-white rounded-2xl text-[12px] font-bold tracking-widest uppercase hover:bg-teal-600 transition-all shadow-xl shadow-teal-500/20">Donate to the Treasury</button>
        </section>
      </div>
    </div>
  );
};
