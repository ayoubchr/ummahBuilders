
import React, { useState } from 'react';
import { UserProfile, Profession, Topic } from '../types';
import { PROFESSIONS, TOPICS } from '../constants.tsx';
import { useLang } from '../i18n/LanguageContext';
import { Lang } from '../i18n/translations';

type SectionId = 'identity' | 'bio' | 'topics' | 'contact';
type Theme = 'light' | 'dark';

interface SettingsProps {
  user: UserProfile;
  onUpdate: (profile: UserProfile) => void;
  theme: Theme;
  onSetTheme: (theme: Theme) => void;
}

const labelClasses = "text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest";
const inputClasses = "w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-teal-500/50 focus:border-teal-500/50 outline-none transition-all dark:text-white dark:placeholder:text-neutral-600";

// Defined outside Settings so its identity is stable and inputs keep focus while typing.
const Section: React.FC<{
  title: string;
  isEditing: boolean;
  onToggleEdit: () => void;
  onSave: () => void;
  children?: React.ReactNode;
}> = ({ title, isEditing, onToggleEdit, onSave, children }) => {
  const { t } = useLang();
  return (
    <div className="bg-white dark:bg-[#121212] rounded-[2rem] border border-neutral-100 dark:border-neutral-800 p-6 sm:p-8 space-y-6 transition-colors duration-200 shadow-sm">
      <div className="flex justify-between items-center">
        <h3 className="text-[11px] font-bold text-neutral-400 dark:text-neutral-500 tracking-widest uppercase">{title}</h3>
        <button
          onClick={onToggleEdit}
          className="text-[10px] font-bold text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 tracking-widest uppercase transition-all"
        >
          {isEditing ? t.common.cancel : t.common.edit}
        </button>
      </div>
      <div className="space-y-4">{children}</div>
      {isEditing && (
        <div className="pt-6 border-t border-neutral-50 dark:border-neutral-800 flex justify-end animate-in">
          <button
            onClick={onSave}
            className="px-6 py-2.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-xl text-[10px] font-bold tracking-widest uppercase hover:opacity-90 transition-all shadow-lg"
          >
            {t.common.save}
          </button>
        </div>
      )}
    </div>
  );
};

const Field: React.FC<{ label: string; value?: string }> = ({ label, value }) => {
  const { t } = useLang();
  return (
    <div>
      <p className={`${labelClasses} mb-1`}>{label}</p>
      <p className={`text-sm font-medium break-words ${value ? 'dark:text-white' : 'text-neutral-400'}`}>{value || t.common.notSet}</p>
    </div>
  );
};

export const Settings: React.FC<SettingsProps> = ({ user, onUpdate, theme, onSetTheme }) => {
  const { t, lang, setLang } = useLang();
  const s = t.settings;
  const o = t.onboarding;
  const [editingSection, setEditingSection] = useState<SectionId | null>(null);
  const [editData, setEditData] = useState<UserProfile>(user);

  const update = (patch: Partial<UserProfile>) => setEditData(prev => ({ ...prev, ...patch }));

  const sectionProps = (id: SectionId) => ({
    isEditing: editingSection === id,
    onToggleEdit: () => {
      setEditData(user);
      setEditingSection(editingSection === id ? null : id);
    },
    onSave: () => {
      onUpdate(editData);
      setEditingSection(null);
    },
  });

  const toggleTag = (tag: Topic) =>
    update({ tags: editData.tags.includes(tag) ? editData.tags.filter(x => x !== tag) : [...editData.tags, tag] });

  const segmented = <T extends string>(options: { value: T; label: string }[], current: T, onChange: (v: T) => void) => (
    <div className="flex p-1 rounded-xl bg-neutral-100 dark:bg-neutral-800">
      {options.map(opt => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          aria-pressed={current === opt.value}
          className={`px-3 py-1.5 rounded-lg text-[11px] font-bold tracking-widest uppercase transition-all ${
            current === opt.value ? 'bg-white dark:bg-neutral-600 text-neutral-900 dark:text-white shadow-sm' : 'text-neutral-400'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );

  return (
    <div className="h-full bg-neutral-50 dark:bg-[#0a0a0a] overflow-y-auto p-4 sm:p-8 lg:p-12 transition-colors duration-200">
      <div className="max-w-3xl mx-auto space-y-10">
        <header className="space-y-2">
          <h1 className="text-3xl lg:text-4xl font-light text-neutral-900 dark:text-white tracking-tighter">{s.title}</h1>
          <p className="text-sm text-neutral-500 font-light">{s.subtitle}</p>
        </header>

        <div className="space-y-6 pb-12">
          <Section title={s.identity} {...sectionProps('identity')}>
            {editingSection === 'identity' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="st-name" className={labelClasses}>{o.name}</label>
                  <input id="st-name" type="text" value={editData.name || ''} onChange={e => update({ name: e.target.value })} className={inputClasses} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="st-alias" className={labelClasses}>{o.alias}</label>
                  <input id="st-alias" type="text" value={editData.alias || ''} onChange={e => update({ alias: e.target.value })} className={inputClasses} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="st-profession" className={labelClasses}>{o.profession}</label>
                  <select
                    id="st-profession"
                    value={editData.profession}
                    onChange={e => update({ profession: e.target.value as Profession })}
                    className={`${inputClasses} cursor-pointer`}
                  >
                    {PROFESSIONS.map(p => <option key={p} value={p}>{t.professions[p]}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="st-country" className={labelClasses}>{o.country}</label>
                  <input id="st-country" type="text" value={editData.country} onChange={e => update({ country: e.target.value })} className={inputClasses} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="st-city" className={labelClasses}>{o.city}</label>
                  <input id="st-city" type="text" value={editData.city_region || ''} onChange={e => update({ city_region: e.target.value })} className={inputClasses} />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Field label={o.name} value={user.name} />
                <Field label={o.alias} value={user.alias && `@${user.alias}`} />
                <Field label={o.profession} value={t.professions[user.profession]} />
                <Field label={o.country} value={user.country} />
                <Field label={o.city} value={user.city_region} />
              </div>
            )}
          </Section>

          <Section title={s.bio} {...sectionProps('bio')}>
            {editingSection === 'bio' ? (
              <textarea
                aria-label={s.bio}
                value={editData.bio || ''}
                onChange={e => update({ bio: e.target.value })}
                className={`${inputClasses} h-32 resize-none`}
                placeholder={o.bioPlaceholder}
              />
            ) : (
              <p className={`text-sm leading-relaxed ${user.bio ? 'text-neutral-600 dark:text-neutral-400' : 'text-neutral-400'}`}>
                {user.bio || t.common.notSet}
              </p>
            )}
          </Section>

          <Section title={s.topics} {...sectionProps('topics')}>
            {editingSection === 'topics' ? (
              <div className="flex flex-wrap gap-2">
                {TOPICS.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    aria-pressed={editData.tags.includes(tag)}
                    className={`px-4 py-2 rounded-xl text-[12px] font-medium transition-all ${
                      editData.tags.includes(tag)
                        ? 'bg-teal-600 text-white'
                        : 'bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:border-teal-300'
                    }`}
                  >
                    {t.topics[tag]}
                  </button>
                ))}
              </div>
            ) : user.tags.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {user.tags.map(tag => (
                  <span key={tag} className="px-3 py-1.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 text-xs font-medium">
                    {t.topics[tag]}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-neutral-400">{s.noTopics}</p>
            )}
          </Section>

          <Section title={s.contact} {...sectionProps('contact')}>
            {editingSection === 'contact' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="st-email" className={labelClasses}>{o.email}</label>
                  <input id="st-email" type="email" value={editData.contact_email || ''} onChange={e => update({ contact_email: e.target.value })} className={inputClasses} placeholder={o.emailPlaceholder} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="st-telegram" className={labelClasses}>{o.telegram}</label>
                  <input id="st-telegram" type="text" value={editData.contact_telegram || ''} onChange={e => update({ contact_telegram: e.target.value })} className={inputClasses} placeholder={o.telegramPlaceholder} />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Field label={o.email} value={user.contact_email} />
                <Field label={o.telegram} value={user.contact_telegram} />
              </div>
            )}
          </Section>

          <div className="bg-white dark:bg-[#121212] rounded-[2rem] border border-neutral-100 dark:border-neutral-800 p-6 sm:p-8 flex items-center justify-between gap-4 shadow-sm">
            <div className="space-y-1">
              <h3 className="text-[11px] font-bold text-neutral-400 dark:text-neutral-500 tracking-widest uppercase">{s.visibility}</h3>
              <p className="text-sm text-neutral-800 dark:text-white font-medium">{s.visibilityDesc}</p>
            </div>
            <button
              role="switch"
              aria-checked={user.is_matchable}
              aria-label={s.visibilityDesc}
              onClick={() => onUpdate({ ...user, is_matchable: !user.is_matchable })}
              className={`w-12 h-6 shrink-0 rounded-full transition-all relative ${user.is_matchable ? 'bg-teal-500' : 'bg-neutral-200 dark:bg-neutral-800'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${user.is_matchable ? 'left-7' : 'left-1 shadow-sm'}`} />
            </button>
          </div>

          <div className="bg-white dark:bg-[#121212] rounded-[2rem] border border-neutral-100 dark:border-neutral-800 p-6 sm:p-8 space-y-6 shadow-sm">
            <h3 className="text-[11px] font-bold text-neutral-400 dark:text-neutral-500 tracking-widest uppercase">{s.preferences}</h3>
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-neutral-800 dark:text-white font-medium">{s.language}</span>
              {segmented<Lang>([{ value: 'nl', label: 'Nederlands' }, { value: 'en', label: 'English' }], lang, setLang)}
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-neutral-800 dark:text-white font-medium">{s.theme}</span>
              {segmented<Theme>([{ value: 'light', label: s.light }, { value: 'dark', label: s.dark }], theme, onSetTheme)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
