
import React, { useEffect } from 'react';
import { MatchReason, UserProfile } from '../types';
import { useLang } from '../i18n/LanguageContext';
import { formatMatchReason } from './matchReason';

interface MatchDetailProps {
  user: UserProfile;
  onClose: () => void;
  reason?: MatchReason | null;
  isSaved?: boolean;
  onToggleSave?: () => void;
}

export const MatchDetail: React.FC<MatchDetailProps> = ({ user, onClose, reason, isSaved, onToggleSave }) => {
  const { t } = useLang();
  const reasonText = formatMatchReason(reason, t);
  const location = [user.city_region, user.country].filter(Boolean).join(', ');
  const telegramHandle = user.contact_telegram?.replace(/^@/, '');

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-end animate-in"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-neutral-900/10 dark:bg-black/40 backdrop-blur-sm" />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg h-full bg-white dark:bg-[#121212] shadow-2xl flex flex-col p-6 sm:p-10 slide-in-from-right border-l border-neutral-100 dark:border-neutral-800"
      >
        <button
          onClick={onClose}
          aria-label={t.common.close}
          className="absolute top-6 right-6 text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-all p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="space-y-8 flex-1 overflow-y-auto pr-2">
          <header className="flex items-center gap-6">
            <img src={user.avatar_url} className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover shadow-xl border-4 border-white dark:border-neutral-800" alt="" />
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-light text-neutral-900 dark:text-white tracking-tight">{user.name}</h2>
              <p className="text-sm text-teal-600 font-medium tracking-wide">@{user.alias} — {t.professions[user.profession]}</p>
            </div>
          </header>

          <section className="space-y-4">
            <h4 className="text-[11px] font-bold text-neutral-400 tracking-widest uppercase">{t.detail.about}</h4>
            <p className="text-neutral-600 dark:text-neutral-400 font-light leading-relaxed text-lg">
              {user.bio || t.detail.noBio}
            </p>
          </section>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-2">
              <h4 className="text-[11px] font-bold text-neutral-400 tracking-widest uppercase">{t.detail.location}</h4>
              <p className="text-neutral-800 dark:text-neutral-200 font-medium">{location}</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-[11px] font-bold text-neutral-400 tracking-widest uppercase">{t.detail.profession}</h4>
              <p className="text-neutral-800 dark:text-neutral-200 font-medium">{t.professions[user.profession]}</p>
            </div>
          </div>

          {user.tags.length > 0 && (
            <section className="space-y-4">
              <h4 className="text-[11px] font-bold text-neutral-400 tracking-widest uppercase">{t.detail.topics}</h4>
              <div className="flex flex-wrap gap-3">
                {user.tags.map(tag => (
                  <span key={tag} className="px-4 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 text-neutral-600 dark:text-neutral-400 text-xs font-medium border border-neutral-100 dark:border-neutral-800">
                    {t.topics[tag]}
                  </span>
                ))}
              </div>
            </section>
          )}

          {reasonText && (
            <section className="p-6 bg-teal-50 dark:bg-teal-900/10 rounded-2xl border border-teal-100 dark:border-teal-900/30 space-y-3">
              <h4 className="text-[11px] font-bold text-teal-700 dark:text-teal-400 tracking-widest uppercase">{t.detail.why}</h4>
              <p className="text-sm text-teal-800 dark:text-teal-300 font-light leading-relaxed">{reasonText}</p>
            </section>
          )}

          <section className="space-y-3">
            <h4 className="text-[11px] font-bold text-neutral-400 tracking-widest uppercase">{t.detail.contact}</h4>
            {user.contact_email || telegramHandle ? (
              <div className="space-y-2">
                {user.contact_email && (
                  <a href={`mailto:${user.contact_email}`} className="block text-sm text-teal-600 dark:text-teal-400 hover:underline">
                    {user.contact_email}
                  </a>
                )}
                {telegramHandle && (
                  <a href={`https://t.me/${telegramHandle}`} target="_blank" rel="noopener noreferrer" className="block text-sm text-teal-600 dark:text-teal-400 hover:underline">
                    Telegram: @{telegramHandle}
                  </a>
                )}
              </div>
            ) : (
              <p className="text-sm text-neutral-400 font-light">{t.detail.noContact}</p>
            )}
          </section>
        </div>

        {onToggleSave && (
          <div className="pt-6 border-t border-neutral-100 dark:border-neutral-800">
            <button
              onClick={onToggleSave}
              aria-pressed={isSaved}
              className={`w-full py-4 rounded-2xl text-[12px] font-bold tracking-widest uppercase transition-all ${
                isSaved
                  ? 'bg-teal-600 text-white hover:bg-teal-700'
                  : 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:opacity-90'
              }`}
            >
              {isSaved ? t.detail.saved : t.detail.save}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
