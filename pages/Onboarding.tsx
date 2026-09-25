
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { OnboardingStep, Profession, Topic, UserProfile } from '../types';
import { PROFESSIONS, TOPICS } from '../constants.tsx';
import { Logo } from '../components/Logo';
import { useLang } from '../i18n/LanguageContext';
import { AuthError, isEmailTaken } from '../services/auth';

const STEP_COUNT = 5;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const Onboarding: React.FC<{ onComplete: (email: string, password: string, profile: UserProfile) => Promise<AuthError | null> }> = ({ onComplete }) => {
  const { t } = useLang();
  const o = t.onboarding;
  const a = t.auth;
  const [step, setStep] = useState<OnboardingStep>(OnboardingStep.ACCOUNT);
  const [account, setAccount] = useState({ email: '', password: '', repeat: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    profession: 'Engineering',
    tags: [],
    is_matchable: true,
    country: ''
  });
  const navigate = useNavigate();

  const update = (patch: Partial<UserProfile>) => setFormData(prev => ({ ...prev, ...patch }));

  const validateAccount = (): string | null => {
    if (!EMAIL_RE.test(account.email.trim())) return a.emailInvalid;
    if (isEmailTaken(account.email)) return a.emailTaken;
    if (account.password.length < 8) return a.passwordTooShort;
    if (account.password !== account.repeat) return a.passwordMismatch;
    return null;
  };

  const nextStep = () => {
    if (submitting) return;
    if (step === OnboardingStep.ACCOUNT) {
      const accountError = validateAccount();
      if (accountError) {
        setError(accountError);
        return;
      }
      if (!formData.contact_email) update({ contact_email: account.email.trim() });
    }
    if (step === OnboardingStep.IDENTITY && !formData.name?.trim()) {
      setError(o.nameRequired);
      return;
    }
    setError('');
    if (step < OnboardingStep.CONTACT) {
      setStep(prev => prev + 1);
    } else {
      handleFinish();
    }
  };

  const prevStep = () => setStep(prev => prev - 1);

  const toggleTag = (tag: Topic) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.includes(tag)
        ? prev.tags.filter(x => x !== tag)
        : [...(prev.tags || []), tag]
    }));
  };

  const handleFinish = async () => {
    const name = formData.name!.trim();
    const finalProfile: UserProfile = {
      id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`,
      name,
      alias: formData.alias?.trim() || name.toLowerCase().replace(/\s+/g, '_'),
      country: formData.country?.trim() || '—',
      city_region: formData.city_region?.trim() || undefined,
      profession: formData.profession as Profession,
      bio: formData.bio?.trim() || undefined,
      tags: formData.tags || [],
      contact_email: formData.contact_email?.trim() || undefined,
      contact_telegram: formData.contact_telegram?.trim() || undefined,
      is_matchable: formData.is_matchable ?? true,
      avatar_url: `https://picsum.photos/seed/${encodeURIComponent(name)}/400`
    };
    setSubmitting(true);
    const result = await onComplete(account.email, account.password, finalProfile);
    setSubmitting(false);
    if (result) {
      setError(a[result]);
      setStep(OnboardingStep.ACCOUNT);
      return;
    }
    navigate('/matches');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !(e.target instanceof HTMLTextAreaElement)) {
      e.preventDefault();
      nextStep();
    }
  };

  const labelClasses = "text-[10px] font-bold text-neutral-400 tracking-widest uppercase";
  const inputClasses = "w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl px-5 py-4 text-sm focus:ring-1 focus:ring-teal-500/50 focus:border-teal-500/50 outline-none transition-all shadow-sm dark:text-white dark:placeholder:text-neutral-600";

  return (
    <div className="h-full bg-neutral-50 dark:bg-[#0a0a0a] flex flex-col lg:flex-row items-stretch overflow-hidden transition-colors duration-200">
      {/* Visual column */}
      <div className="hidden lg:flex lg:w-[40%] bg-neutral-900 p-20 flex-col justify-between items-start relative overflow-hidden shrink-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-teal-600/10 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2" />

        <Logo size="sm" inverted />

        <div className="space-y-10 relative z-10">
          <div className="space-y-4">
            <h2 className="text-5xl font-light text-white leading-tight">{o.sideTitle}</h2>
            <div className="w-20 h-1 bg-teal-500 rounded-full" />
          </div>
          <p className="text-neutral-400 font-light text-lg leading-relaxed max-w-sm">{o.sideText}</p>
        </div>

        <div />
      </div>

      {/* Form column */}
      <div className="flex-1 flex flex-col items-center justify-start lg:justify-center p-6 md:p-12 lg:p-24 overflow-y-auto" onKeyDown={handleKeyDown}>
        <div className="max-w-md w-full space-y-8 lg:space-y-10 animate-in">
          <div className="space-y-2">
            <div className="flex gap-1">
              {Array.from({ length: STEP_COUNT }, (_, i) => i + 1).map(i => (
                <div key={i} className={`h-1 flex-1 rounded-full ${step >= i ? 'bg-neutral-900 dark:bg-white' : 'bg-neutral-200 dark:bg-neutral-800'}`} />
              ))}
            </div>
            <p className={labelClasses}>{o.stepOf(step, STEP_COUNT)}</p>
          </div>

          <header className="space-y-2">
            <h1 className="text-2xl lg:text-3xl font-light text-neutral-900 dark:text-white tracking-tight">{o.titles[step - 1]}</h1>
            <p className="text-sm text-neutral-500 font-light">{o.subtitles[step - 1]}</p>
          </header>

          <main className="space-y-6 min-h-[300px]">
            {step === OnboardingStep.ACCOUNT && (
              <div className="space-y-6 animate-in">
                <div className="space-y-2">
                  <label htmlFor="ob-acc-email" className={labelClasses}>{a.email}</label>
                  <input id="ob-acc-email" type="email" autoComplete="email" value={account.email} onChange={e => setAccount({ ...account, email: e.target.value })} className={inputClasses} placeholder={o.emailPlaceholder} autoFocus />
                </div>
                <div className="space-y-2">
                  <label htmlFor="ob-acc-pw" className={labelClasses}>{a.password}</label>
                  <input id="ob-acc-pw" type="password" autoComplete="new-password" value={account.password} onChange={e => setAccount({ ...account, password: e.target.value })} className={inputClasses} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="ob-acc-pw2" className={labelClasses}>{a.passwordRepeat}</label>
                  <input id="ob-acc-pw2" type="password" autoComplete="new-password" value={account.repeat} onChange={e => setAccount({ ...account, repeat: e.target.value })} className={inputClasses} />
                </div>
                {error && <p className="text-xs text-red-500">{error}</p>}
                <p className="text-sm text-neutral-500">
                  {a.haveAccount}{' '}
                  <Link to="/login" className="text-teal-600 hover:underline font-medium">{a.submit}</Link>
                </p>
              </div>
            )}

            {step === OnboardingStep.IDENTITY && (
              <div className="space-y-6 animate-in">
                <div className="space-y-2">
                  <label htmlFor="ob-name" className={labelClasses}>{o.name}</label>
                  <input id="ob-name" type="text" value={formData.name || ''} onChange={e => update({ name: e.target.value })} className={inputClasses} placeholder={o.namePlaceholder} autoFocus />
                  {error && <p className="text-xs text-red-500">{error}</p>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="ob-alias" className={labelClasses}>{o.alias}</label>
                  <input id="ob-alias" type="text" value={formData.alias || ''} onChange={e => update({ alias: e.target.value })} className={inputClasses} placeholder={o.aliasPlaceholder} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="ob-country" className={labelClasses}>{o.country}</label>
                    <input id="ob-country" type="text" value={formData.country || ''} onChange={e => update({ country: e.target.value })} className={inputClasses} placeholder={o.countryPlaceholder} />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="ob-city" className={labelClasses}>{o.city}</label>
                    <input id="ob-city" type="text" value={formData.city_region || ''} onChange={e => update({ city_region: e.target.value })} className={inputClasses} placeholder={o.cityPlaceholder} />
                  </div>
                </div>
              </div>
            )}

            {step === OnboardingStep.CRAFT && (
              <div className="space-y-6 animate-in">
                <div className="space-y-2">
                  <span className={labelClasses}>{o.profession}</span>
                  <div className="grid grid-cols-2 gap-2">
                    {PROFESSIONS.map(p => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => update({ profession: p })}
                        aria-pressed={formData.profession === p}
                        className={`px-4 py-3 rounded-xl text-[12px] font-medium transition-all text-left ${
                          formData.profession === p
                            ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-lg'
                            : 'bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 text-neutral-500 hover:border-neutral-300 dark:hover:border-neutral-600'
                        }`}
                      >
                        {t.professions[p]}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="ob-bio" className={labelClasses}>{o.bio}</label>
                  <textarea id="ob-bio" value={formData.bio || ''} onChange={e => update({ bio: e.target.value })} className={`${inputClasses} h-28 resize-none`} placeholder={o.bioPlaceholder} />
                </div>
              </div>
            )}

            {step === OnboardingStep.INTERESTS && (
              <div className="space-y-4 animate-in">
                <span className={`${labelClasses} block`}>{o.topics}</span>
                <div className="flex flex-wrap gap-2 lg:gap-3">
                  {TOPICS.map(tag => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      aria-pressed={formData.tags?.includes(tag)}
                      className={`px-4 py-2 rounded-xl text-[12px] font-medium transition-all ${
                        formData.tags?.includes(tag)
                          ? 'bg-teal-600 text-white shadow-lg'
                          : 'bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:border-teal-300'
                      }`}
                    >
                      {t.topics[tag]}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === OnboardingStep.CONTACT && (
              <div className="space-y-6 animate-in">
                <div className="space-y-2">
                  <label htmlFor="ob-email" className={labelClasses}>{o.email}</label>
                  <input id="ob-email" type="email" value={formData.contact_email || ''} onChange={e => update({ contact_email: e.target.value })} className={inputClasses} placeholder={o.emailPlaceholder} autoFocus />
                </div>
                <div className="space-y-2">
                  <label htmlFor="ob-telegram" className={labelClasses}>{o.telegram}</label>
                  <input id="ob-telegram" type="text" value={formData.contact_telegram || ''} onChange={e => update({ contact_telegram: e.target.value })} className={inputClasses} placeholder={o.telegramPlaceholder} />
                </div>
                <label className="flex items-center justify-between gap-4 p-6 bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 cursor-pointer">
                  <span className="space-y-1">
                    <span className="block text-sm font-semibold text-neutral-900 dark:text-white">{o.discoverable}</span>
                    <span className="block text-xs text-neutral-500 font-light leading-relaxed">{o.discoverableDesc}</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={formData.is_matchable}
                    onChange={e => update({ is_matchable: e.target.checked })}
                    className="w-6 h-6 shrink-0 rounded-lg accent-neutral-900 dark:accent-teal-500 cursor-pointer"
                  />
                </label>
              </div>
            )}
          </main>

          <footer className="pt-2 flex gap-4">
            {step > OnboardingStep.ACCOUNT && (
              <button
                type="button"
                onClick={() => { setError(''); prevStep(); }}
                className="px-6 lg:px-8 py-4 border border-neutral-200 dark:border-neutral-800 rounded-2xl text-[11px] font-bold tracking-widest text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all uppercase"
              >
                {t.common.back}
              </button>
            )}
            <button
              type="button"
              onClick={nextStep}
              className={`flex-1 px-8 py-4 text-white rounded-2xl text-[11px] font-bold tracking-widest transition-all active:scale-95 uppercase ${
                step === OnboardingStep.CONTACT
                  ? 'bg-teal-600 hover:bg-teal-700'
                  : 'bg-neutral-900 dark:bg-white dark:text-neutral-900 hover:opacity-90'
              }`}
            >
              {step === OnboardingStep.CONTACT ? o.finish : t.common.next}
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};
