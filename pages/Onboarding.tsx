
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OnboardingStep, Profession, UserProfile } from '../types';
import { PROFESSIONS, TOPIC_SUGGESTIONS } from '../constants.tsx';
import { Logo } from '../components/Logo';

export const Onboarding: React.FC<{ onComplete: (profile: UserProfile) => void }> = ({ onComplete }) => {
  const [step, setStep] = useState<OnboardingStep>(OnboardingStep.AUTH);
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    profession: 'Engineering',
    tags: [],
    is_matchable: true,
    country: ''
  });
  const navigate = useNavigate();

  const nextStep = () => {
    if (step < OnboardingStep.VISIBILITY) {
      setStep(prev => prev + 1);
    } else {
      handleFinish();
    }
  };

  const prevStep = () => setStep(prev => prev - 1);

  const toggleTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.includes(tag) 
        ? prev.tags.filter(t => t !== tag)
        : [...(prev.tags || []), tag]
    }));
  };

  const handleFinish = () => {
    const finalProfile: UserProfile = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name || 'Anonymous Builder',
      alias: formData.alias || (formData.name?.toLowerCase().replace(/\s+/g, '_') || 'builder'),
      country: formData.country || 'Global',
      profession: formData.profession as Profession,
      tags: formData.tags || [],
      is_matchable: formData.is_matchable ?? true,
      avatar_url: `https://picsum.photos/seed/${formData.name || 'default'}/400`
    };
    onComplete(finalProfile);
    navigate('/matches');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      nextStep();
    }
  };

  const inputClasses = "w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl px-5 py-4 text-sm focus:ring-1 focus:ring-teal-500/50 focus:border-teal-500/50 outline-none transition-all shadow-sm dark:text-white dark:placeholder:text-neutral-600";

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-[#0a0a0a] flex flex-col lg:flex-row items-stretch overflow-hidden transition-colors duration-200">
      {/* Visual Column */}
      <div className="lg:w-[40%] bg-neutral-900 p-8 lg:p-20 flex lg:flex-col justify-between items-center lg:items-start relative overflow-hidden shrink-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-teal-600/10 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2" />
        
        <Logo size="sm" />

        <div className="hidden lg:block space-y-10 relative z-10">
          <div className="space-y-4">
            <h2 className="text-5xl font-light text-white leading-tight">
               Build resilient<br />
               infrastructure for<br />
               the global Ummah.
            </h2>
            <div className="w-20 h-1 bg-teal-500 rounded-full" />
          </div>
          <p className="text-neutral-400 font-light text-lg leading-relaxed max-w-sm">
            You're not just creating an app. You're building the next layer of digital independence.
          </p>
        </div>

        <div className="flex gap-4 items-center relative z-10">
          <div className="hidden sm:flex -space-x-2">
            {[1, 2, 3, 4].map(i => (
              <img key={i} src={`https://picsum.photos/seed/${i * 10}/100`} className="w-8 h-8 rounded-full border-2 border-neutral-900" alt="" />
            ))}
          </div>
          <span className="text-[10px] text-neutral-500 font-bold tracking-widest uppercase">
            Join 2,400+ builders
          </span>
        </div>
      </div>

      {/* Form Column */}
      <div className="flex-1 flex flex-col items-center justify-start lg:justify-center p-6 md:p-12 lg:p-24 overflow-y-auto" onKeyDown={handleKeyDown}>
        <div className="max-w-md w-full space-y-8 lg:space-y-10 animate-in">
          <div className="space-y-2">
             <div className="flex gap-1">
               {[1, 2, 3, 4].map(i => (
                 <div key={i} className={`h-1 flex-1 rounded-full ${step >= i ? 'bg-neutral-900 dark:bg-white' : 'bg-neutral-200 dark:bg-neutral-800'}`} />
               ))}
             </div>
             <p className="text-[10px] font-bold text-neutral-400 tracking-widest uppercase">Step {step} of 4</p>
          </div>

          <header className="space-y-2">
            <h1 className="text-2xl lg:text-3xl font-light text-neutral-900 dark:text-white tracking-tight">
               {step === 1 && "Start your journey."}
               {step === 2 && "Profile identity."}
               {step === 3 && "Areas of impact."}
               {step === 4 && "Final visibility."}
            </h1>
            <p className="text-sm text-neutral-500 font-light">
               {step === 1 && "Enter your credentials to access the encrypted network."}
               {step === 2 && "Tell us who you are and where you build from."}
               {step === 3 && "Select the domains where you want to contribute."}
               {step === 4 && "Customize how you appear to other network members."}
            </p>
          </header>

          <main className="space-y-6 lg:space-y-8 min-h-[300px]">
            {step === OnboardingStep.AUTH && (
              <div className="space-y-6 animate-in">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-neutral-400 tracking-widest uppercase">Email Address</label>
                  <input 
                    type="email" 
                    className={inputClasses}
                    placeholder="builder@ummah.net"
                    autoFocus
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-neutral-400 tracking-widest uppercase">Create Password</label>
                  <input 
                    type="password" 
                    className={inputClasses}
                    placeholder="••••••••"
                  />
                </div>
              </div>
            )}

            {step === OnboardingStep.PROFILE && (
              <div className="space-y-6 animate-in">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-neutral-400 tracking-widest uppercase">Full Name or Alias</label>
                  <input 
                    type="text" 
                    value={formData.name || ''}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className={inputClasses}
                    placeholder="Ahmed K."
                    autoFocus
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-neutral-400 tracking-widest uppercase">Primary Craft</label>
                  <div className="grid grid-cols-2 gap-2">
                    {PROFESSIONS.map(p => (
                      <button
                        key={p}
                        onClick={() => setFormData({...formData, profession: p})}
                        className={`px-4 py-3 rounded-xl text-[12px] font-medium transition-all text-left ${
                          formData.profession === p 
                          ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-lg' 
                          : 'bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 text-neutral-500 hover:border-neutral-300 dark:hover:border-neutral-600'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-neutral-400 tracking-widest uppercase">Location</label>
                  <input 
                    type="text" 
                    value={formData.country || ''}
                    onChange={(e) => setFormData({...formData, country: e.target.value})}
                    className={inputClasses}
                    placeholder="Istanbul, Türkiye"
                  />
                </div>
              </div>
            )}

            {step === OnboardingStep.INTERESTS && (
              <div className="space-y-6 animate-in">
                <label className="text-[10px] font-bold text-neutral-400 tracking-widest uppercase block mb-4">Select Impact Areas</label>
                <div className="flex flex-wrap gap-2 lg:gap-3">
                  {TOPIC_SUGGESTIONS.map(tag => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-4 py-2 rounded-xl text-[12px] font-medium transition-all ${
                        formData.tags?.includes(tag) 
                        ? 'bg-teal-600 text-white shadow-lg' 
                        : 'bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:border-teal-300'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === OnboardingStep.VISIBILITY && (
              <div className="space-y-8 animate-in">
                 <div className="p-6 bg-neutral-50 dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-neutral-900 dark:text-white">Network Discoverability</p>
                        <p className="text-xs text-neutral-500 font-light leading-relaxed">Allow verified members to match with you based on your expertise.</p>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={formData.is_matchable}
                        onChange={(e) => setFormData({...formData, is_matchable: e.target.checked})}
                        className="w-6 h-6 rounded-lg accent-neutral-900 dark:accent-teal-500 cursor-pointer"
                      />
                    </div>
                 </div>
              </div>
            )}
          </main>

          <footer className="pt-6 flex gap-4">
            {step > OnboardingStep.AUTH && (
              <button 
                onClick={prevStep}
                className="px-6 lg:px-8 py-4 border border-neutral-200 dark:border-neutral-800 rounded-2xl text-[11px] font-bold tracking-widest text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all uppercase"
              >
                Back
              </button>
            )}
            <button 
              onClick={nextStep}
              className={`flex-1 px-8 py-4 text-white rounded-2xl text-[11px] font-bold tracking-widest transition-all active:scale-95 uppercase ${
                step === OnboardingStep.VISIBILITY 
                ? 'bg-teal-600 hover:bg-teal-700 shadow-xl shadow-teal-100 dark:shadow-none' 
                : 'bg-neutral-900 dark:bg-white dark:text-neutral-900 hover:opacity-90 shadow-xl shadow-neutral-200 dark:shadow-none'
              }`}
            >
              {step === OnboardingStep.VISIBILITY ? 'Complete Access' : 'Continue'}
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};
