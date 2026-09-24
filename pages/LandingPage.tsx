
import React from 'react';
import { Link } from 'react-router-dom';
import { GlassPanel } from '../components/GlassPanel';
import { Logo } from '../components/Logo';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white overflow-hidden pt-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-32">
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 flex flex-col lg:flex-row items-center gap-16">
          <div className="absolute top-0 left-0 w-[1000px] h-[1000px] bg-teal-500/5 blur-[150px] rounded-full -translate-x-1/2 -translate-y-1/2" />
          
          <div className="flex-1 space-y-10 relative z-10">
            <div className="inline-flex items-center gap-3 px-3 py-1 bg-neutral-900 text-white rounded-full text-[10px] font-bold tracking-[0.2em] uppercase">
              <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse" />
              Now Open for Infrastructure Partners
            </div>
            <h1 className="text-6xl md:text-8xl font-light tracking-tighter text-neutral-900 leading-[0.95]">
              Architecting the <br />
              <span className="text-teal-600 font-serif italic">Independent</span> <br />
              Future.
            </h1>
            <p className="max-w-xl text-xl text-neutral-500 font-light leading-relaxed">
              The world’s infrastructure sidelining the Ummah ends here. Connect with top-tier engineers, designers, and visionaries to build tools that are resilient, ethical, and built for us.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 items-start">
              <Link 
                to="/onboarding" 
                className="px-10 py-5 bg-neutral-900 text-white rounded-2xl text-[12px] font-bold tracking-widest hover:bg-neutral-800 transition-all hover:-translate-y-1 active:scale-95 shadow-2xl shadow-neutral-200 uppercase"
              >
                Join the Network
              </Link>
              <Link 
                to="/about" 
                className="px-10 py-5 bg-white border border-neutral-200 text-neutral-600 rounded-2xl text-[12px] font-bold tracking-widest hover:border-neutral-900 hover:text-neutral-900 transition-all uppercase"
              >
                Read the Manifesto
              </Link>
            </div>
            <div className="flex items-center gap-6 pt-6">
              <div className="flex -space-x-3">
                {[1,2,3,4,5].map(i => <img key={i} src={`https://picsum.photos/seed/${i*20}/100`} className="w-10 h-10 rounded-full border-4 border-white shadow-sm" alt=""/>)}
              </div>
              <p className="text-[11px] font-bold text-neutral-400 tracking-widest uppercase">Trusted by 2.4k Builders Worldwide</p>
            </div>
          </div>

          <div className="flex-1 w-full lg:w-auto relative hidden lg:block">
             <div className="absolute inset-0 bg-neutral-50 rounded-[4rem] -rotate-6 scale-105" />
             <div className="relative bg-white p-8 rounded-[4rem] border border-neutral-100 shadow-2xl space-y-8">
                <div className="flex items-center justify-between border-b border-neutral-50 pb-6">
                   <div className="flex gap-2">
                     <div className="w-3 h-3 rounded-full bg-red-400" />
                     <div className="w-3 h-3 rounded-full bg-amber-400" />
                     <div className="w-3 h-3 rounded-full bg-teal-400" />
                   </div>
                   <span className="text-[10px] font-bold text-neutral-300 tracking-widest uppercase">System Dashboard v1.0</span>
                </div>
                <div className="space-y-6">
                  {[
                    { label: 'Privacy Protocol', value: 'Active', color: 'text-teal-600' },
                    { label: 'Peer Matching', value: 'High Accuracy', color: 'text-teal-600' },
                    { label: 'Infrastructure Nodes', value: '412 Connected', color: 'text-neutral-400' }
                  ].map(stat => (
                    <div key={stat.label} className="flex justify-between items-center bg-neutral-50 p-4 rounded-2xl border border-neutral-100/50">
                       <span className="text-sm font-medium text-neutral-800">{stat.label}</span>
                       <span className={`text-[10px] font-bold tracking-widest uppercase ${stat.color}`}>{stat.value}</span>
                    </div>
                  ))}
                </div>
                <div className="p-6 bg-neutral-900 rounded-3xl space-y-4">
                   <div className="flex gap-3">
                     <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-teal-400">م</div>
                     <div>
                       <p className="text-white text-xs font-bold">Resilient Node Found</p>
                       <p className="text-neutral-500 text-[10px]">Istanbul Corridor Connected</p>
                     </div>
                   </div>
                </div>
             </div>
          </div>
        </section>

        {/* Commitment & Values */}
        <section className="space-y-20 py-20">
          <div className="text-center space-y-6 max-w-2xl mx-auto">
             <h2 className="text-[11px] font-bold text-teal-600 tracking-[0.3em] uppercase">Our Sovereign Commitment</h2>
             <h3 className="text-4xl font-light text-neutral-900 leading-tight">We build for resilience, not reaction. Our infrastructure is sovereign, ethical, and privacy-first.</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: "Decentralized Growth",
                desc: "We don't rely on central authorities that can de-bank or de-platform us. We build our own rails."
              },
              {
                title: "Domain Excellence",
                desc: "Matching happens through skill and vision. We connect world-class engineers with meaningful problems."
              },
              {
                title: "Ethical Alignment",
                desc: "Every tool built through our network is vetted for alignment with universal Islamic ethical principles."
              }
            ].map((v, i) => (
              <div key={i} className="space-y-6 group">
                <div className="w-12 h-12 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-center justify-center text-neutral-400 group-hover:bg-teal-600 group-hover:text-white transition-all duration-500">
                   <span className="text-lg font-bold italic">0{i+1}</span>
                </div>
                <h4 className="text-xl font-medium text-neutral-900">{v.title}</h4>
                <p className="text-neutral-500 font-light leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 relative text-center">
           <div className="absolute inset-0 bg-neutral-900 rounded-[5rem] overflow-hidden">
             <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
             <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-teal-600/20 blur-[150px] rounded-full translate-x-1/2 translate-y-1/2" />
           </div>
           <div className="relative z-10 space-y-10 py-20 px-6">
              <h2 className="text-4xl md:text-6xl font-light text-white leading-tight">
                The Ummah is building.<br />
                <span className="text-teal-400 font-serif italic">Will you architect with us?</span>
              </h2>
              <Link 
                to="/onboarding" 
                className="inline-block px-12 py-6 bg-white text-neutral-900 rounded-3xl text-[14px] font-bold tracking-[0.2em] hover:scale-105 active:scale-95 transition-all uppercase shadow-2xl shadow-teal-900/20"
              >
                Access the Node
              </Link>
              <div className="pt-10 flex flex-col items-center gap-4">
                 <Logo size="sm" />
                 <p className="text-neutral-500 text-[10px] tracking-widest uppercase">&copy; 1445 — Ummah Builders Network</p>
              </div>
           </div>
        </section>
      </div>
      
      {/* Footer Gutter */}
      <footer className="h-20" />
    </div>
  );
};
