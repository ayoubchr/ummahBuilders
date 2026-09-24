
import React from 'react';

export const Manifesto: React.FC = () => {
  return (
    <div className="h-full bg-white dark:bg-[#0a0a0a] overflow-y-auto p-12">
      <div className="max-w-2xl mx-auto space-y-16 py-12">
        <header className="space-y-6 text-center">
          <div className="w-12 h-12 rounded-2xl bg-teal-500 flex items-center justify-center text-white font-serif text-2xl mx-auto">م</div>
          <h1 className="text-5xl font-light text-neutral-900 dark:text-white tracking-tighter">The Ummah Builders Manifesto</h1>
          <p className="text-lg text-neutral-500 dark:text-neutral-400 italic">For a sovereign, ethical, and connected future.</p>
        </header>

        <div className="prose dark:prose-invert max-w-none space-y-8 text-neutral-700 dark:text-neutral-300 font-light text-lg leading-relaxed">
          <p>
            The world's digital infrastructure has been built upon foundations that are often indifferent, if not hostile, to the values and survival of the global Ummah. We find ourselves building on platforms that can de-bank us, de-platform us, or monitor us without oversight.
          </p>

          <section className="space-y-4">
            <h2 className="text-2xl font-medium text-neutral-900 dark:text-white">I. Sovereignty</h2>
            <p>
              We believe in building tools that are independent. Our Rails must be our own. We prioritize peer-to-peer protocols, open-source code, and decentralized authentication to ensure that no central authority can silence the voice of the builders.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-medium text-neutral-900 dark:text-white">II. Ethical Alignment</h2>
            <p>
              Islamic principles of fairness, privacy, and community benefit are not just values—they are technical requirements. We build algorithms that are transparent, financial tools that are Sharia-compliant, and social spaces that respect human dignity.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-medium text-neutral-900 dark:text-white">III. Coordination</h2>
            <p>
              The talent of the Ummah is vast but scattered. We exist to turn individual brilliance into collective impact. By matching engineers with founders and designers with researchers, we create the teams that ship the next layer of world-changing infrastructure.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-medium text-neutral-900 dark:text-white">IV. Allyship</h2>
            <p>
              We welcome all allies who sincerely share the vision of a more Muslim-friendly world. We build bridges of construction, inviting those with skills and sincerity to architect a fairer digital landscape alongside us.
            </p>
          </section>
        </div>

        <footer className="pt-16 border-t border-neutral-100 dark:border-neutral-800 space-y-8">
          <div className="text-center">
            <p className="text-sm text-neutral-400 uppercase tracking-widest font-bold mb-6">Will you build with us?</p>
            <div className="flex gap-4 justify-center">
               <button className="px-8 py-4 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-2xl text-[12px] font-bold tracking-widest uppercase hover:opacity-90 transition-all">Join the Collective</button>
               <button className="px-8 py-4 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 rounded-2xl text-[12px] font-bold tracking-widest uppercase hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all">Share Manifesto</button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
