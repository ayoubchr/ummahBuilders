import React from 'react';
import { Link } from 'react-router-dom';
import { UserProfile } from '../types';
import { useLang } from '../i18n/LanguageContext';

export const Profile: React.FC<{ user: UserProfile }> = ({ user }) => {
  const { t } = useLang();
  const p = t.profile;
  const location = [user.city_region, user.country].filter(Boolean).join(', ');
  const card = "bg-white dark:bg-[#121212] p-6 sm:p-8 lg:p-10 rounded-[2rem] lg:rounded-[2.5rem] border border-neutral-100 dark:border-neutral-800 card-shadow";
  const heading = "text-[11px] font-bold text-neutral-400 tracking-widest uppercase";

  return (
    <div className="h-full bg-neutral-50 dark:bg-[#0a0a0a] overflow-y-auto p-4 sm:p-6 lg:p-12">
      <div className="max-w-4xl mx-auto space-y-8 lg:space-y-12 animate-in">
        <header className="flex flex-col lg:flex-row items-center lg:items-end gap-6 lg:gap-10">
          <img
            src={user.avatar_url}
            className="w-32 h-32 lg:w-48 lg:h-48 rounded-[2rem] lg:rounded-[3rem] object-cover shadow-2xl border-4 border-white dark:border-neutral-800"
            alt=""
          />
          <div className="space-y-3 lg:space-y-4 pb-4 text-center lg:text-left">
            <div className="inline-block px-3 py-1 bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 text-[10px] font-bold tracking-widest uppercase rounded-full">{p.badge}</div>
            <h1 className="text-3xl lg:text-5xl font-light text-neutral-900 dark:text-white tracking-tighter">{user.name}</h1>
            <p className="text-base lg:text-lg text-neutral-400 font-light">
              @{user.alias} — {t.professions[user.profession]}{location && ` · ${location}`}
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-6 lg:space-y-8">
            <section className={`${card} space-y-4`}>
              <h3 className={heading}>{p.about}</h3>
              <p className={`text-lg font-light leading-relaxed ${user.bio ? 'text-neutral-800 dark:text-neutral-200' : 'text-neutral-400'}`}>
                {user.bio || t.detail.noBio}
              </p>
            </section>

            <section className={`${card} space-y-6`}>
              <h3 className={heading}>{p.topics}</h3>
              {user.tags.length > 0 ? (
                <div className="flex flex-wrap gap-2 lg:gap-3">
                  {user.tags.map(tag => (
                    <span key={tag} className="px-4 py-2 bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-400 rounded-xl text-xs font-medium border border-neutral-100 dark:border-neutral-800">
                      {t.topics[tag]}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-neutral-400">{t.settings.noTopics}</p>
              )}
            </section>
          </div>

          <div className="space-y-6 lg:space-y-8">
            <section className={`${card} space-y-3`}>
              <h3 className={heading}>{p.contact}</h3>
              {user.contact_email || user.contact_telegram ? (
                <>
                  {user.contact_email && <p className="text-sm text-neutral-800 dark:text-neutral-200 break-words">{user.contact_email}</p>}
                  {user.contact_telegram && <p className="text-sm text-neutral-800 dark:text-neutral-200">Telegram: {user.contact_telegram}</p>}
                </>
              ) : (
                <p className="text-sm text-neutral-400">{t.common.notSet}</p>
              )}
            </section>

            <section className="bg-neutral-900 dark:bg-[#1a1a1a] p-8 rounded-[2rem] lg:rounded-[2.5rem] text-white space-y-4">
              <h3 className="text-[10px] font-bold text-neutral-500 tracking-widest uppercase">{p.visibility}</h3>
              <div className="flex justify-between items-center">
                <span className="text-sm font-light">{p.discoverable}</span>
                <span className={`text-xs font-bold uppercase ${user.is_matchable ? 'text-teal-400' : 'text-neutral-500'}`}>
                  {user.is_matchable ? p.visible : p.hidden}
                </span>
              </div>
            </section>

            <Link to="/settings" className="block w-full text-center py-4 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white rounded-[2rem] text-[12px] font-bold tracking-widest uppercase hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-all">
              {p.edit}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
