import React, { useMemo, useState } from 'react';
import { Resource, ResourceKind, Topic, UserProfile } from '../types';
import { TOPICS } from '../constants.tsx';
import { newId, useStoredList } from '../services/communityStore';
import { useLang } from '../i18n/LanguageContext';

const KINDS: ResourceKind[] = ['link', 'document', 'summary'];

const labelClasses = "text-[10px] font-bold text-neutral-400 uppercase tracking-widest";
const inputClasses = "w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-teal-500/50 focus:border-teal-500/50 outline-none transition-all dark:text-white dark:placeholder:text-neutral-600";

const isValidUrl = (value: string) => {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
};

const emptyDraft = { title: '', kind: 'link' as ResourceKind, url: '', topic: 'Tech' as Topic, description: '' };

export const Knowledge: React.FC<{ currentUser: UserProfile }> = ({ currentUser }) => {
  const { t, lang } = useLang();
  const k = t.knowledge;
  const { items, add, remove } = useStoredList<Resource>('ub_resources');
  const [search, setSearch] = useState('');
  const [topicFilter, setTopicFilter] = useState<Topic | 'All'>('All');
  const [showForm, setShowForm] = useState(false);
  const [draft, setDraft] = useState(emptyDraft);
  const [error, setError] = useState('');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return items.filter(r =>
      (topicFilter === 'All' || r.topic === topicFilter) &&
      (!q || r.title.toLowerCase().includes(q) || r.description?.toLowerCase().includes(q))
    );
  }, [items, search, topicFilter]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.title.trim()) return setError(k.titleRequired);
    const url = draft.url.trim();
    if (draft.kind !== 'summary' && !isValidUrl(url)) return setError(k.urlRequired);
    add({
      id: newId(),
      title: draft.title.trim(),
      kind: draft.kind,
      url: url || undefined,
      description: draft.description.trim() || undefined,
      topic: draft.topic,
      authorId: currentUser.id,
      authorName: currentUser.name || '—',
      createdAt: new Date().toISOString(),
    });
    setDraft(emptyDraft);
    setError('');
    setShowForm(false);
  };

  const dateFormat = new Intl.DateTimeFormat(lang === 'nl' ? 'nl-BE' : 'en-GB', { dateStyle: 'medium' });

  return (
    <div className="h-full flex flex-col bg-neutral-50 dark:bg-[#0a0a0a] overflow-hidden">
      <header className="px-4 lg:px-8 py-6 border-b border-neutral-100 dark:border-neutral-800 bg-white dark:bg-[#121212] space-y-4 shrink-0">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-light text-neutral-900 dark:text-white tracking-tight">{k.title}</h1>
            <p className="text-xs text-neutral-500 font-light">{k.subtitle}</p>
          </div>
          <div className="flex gap-3">
            <input
              type="search"
              aria-label={k.search}
              placeholder={k.search}
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="flex-1 sm:w-64 px-4 py-2 bg-neutral-100 dark:bg-neutral-800 rounded-xl text-xs outline-none dark:text-white focus:ring-1 focus:ring-teal-500/30"
            />
            <button
              onClick={() => setShowForm(v => !v)}
              aria-expanded={showForm}
              className="px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-xl text-[11px] font-bold tracking-widest uppercase hover:opacity-90 whitespace-nowrap"
            >
              {showForm ? t.common.cancel : `+ ${k.add}`}
            </button>
          </div>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {(['All', ...TOPICS] as const).map(topic => (
            <button
              key={topic}
              onClick={() => setTopicFilter(topic)}
              aria-pressed={topicFilter === topic}
              className={`px-4 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase whitespace-nowrap transition-all ${
                topicFilter === topic
                  ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
            >
              {topic === 'All' ? k.all : t.topics[topic]}
            </button>
          ))}
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 lg:p-8">
        <div className="max-w-5xl mx-auto space-y-6">
          {showForm && (
            <form onSubmit={handleSubmit} className="bg-white dark:bg-[#121212] rounded-[2rem] border border-neutral-100 dark:border-neutral-800 p-6 sm:p-8 space-y-5 animate-in">
              <h2 className="text-lg font-medium text-neutral-900 dark:text-white">{k.formTitle}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="kb-title" className={labelClasses}>{k.fieldTitle}</label>
                  <input id="kb-title" className={inputClasses} value={draft.title} onChange={e => setDraft({ ...draft, title: e.target.value })} autoFocus />
                </div>
                <div className="space-y-2">
                  <label htmlFor="kb-kind" className={labelClasses}>{k.fieldKind}</label>
                  <select id="kb-kind" className={inputClasses} value={draft.kind} onChange={e => setDraft({ ...draft, kind: e.target.value as ResourceKind })}>
                    {KINDS.map(kind => <option key={kind} value={kind}>{k.kinds[kind]}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="kb-topic" className={labelClasses}>{k.fieldTopic}</label>
                  <select id="kb-topic" className={inputClasses} value={draft.topic} onChange={e => setDraft({ ...draft, topic: e.target.value as Topic })}>
                    {TOPICS.map(topic => <option key={topic} value={topic}>{t.topics[topic]}</option>)}
                  </select>
                </div>
                {draft.kind !== 'summary' && (
                  <div className="space-y-2 md:col-span-2">
                    <label htmlFor="kb-url" className={labelClasses}>{k.fieldUrl}</label>
                    <input id="kb-url" type="url" className={inputClasses} value={draft.url} onChange={e => setDraft({ ...draft, url: e.target.value })} placeholder="https://" />
                  </div>
                )}
                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="kb-desc" className={labelClasses}>{k.fieldDescription}</label>
                  <textarea id="kb-desc" className={`${inputClasses} h-28 resize-none`} value={draft.description} onChange={e => setDraft({ ...draft, description: e.target.value })} />
                </div>
              </div>
              {error && <p className="text-xs text-red-500">{error}</p>}
              <div className="flex justify-end">
                <button type="submit" className="px-6 py-2.5 bg-teal-600 text-white rounded-xl text-[11px] font-bold tracking-widest uppercase hover:bg-teal-700">
                  {t.common.save}
                </button>
              </div>
            </form>
          )}

          {filtered.length === 0 ? (
            <p className="py-16 text-center text-sm text-neutral-400">{items.length === 0 ? k.empty : k.emptyFiltered}</p>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.map(r => (
                <li key={r.id} className="bg-white dark:bg-[#121212] rounded-2xl border border-neutral-100 dark:border-neutral-800 p-6 space-y-3 flex flex-col">
                  <div className="flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-widest">
                    <span className="text-teal-600 dark:text-teal-400">{t.topics[r.topic]}</span>
                    <span className="text-neutral-300 dark:text-neutral-600">·</span>
                    <span className="text-neutral-400">{k.kinds[r.kind]}</span>
                  </div>
                  <h3 className="text-base font-semibold text-neutral-900 dark:text-white break-words">{r.title}</h3>
                  {r.description && <p className="text-sm text-neutral-500 dark:text-neutral-400 font-light leading-relaxed whitespace-pre-line flex-1">{r.description}</p>}
                  <div className="pt-3 border-t border-neutral-50 dark:border-neutral-800 flex items-center justify-between gap-3 text-[11px] text-neutral-400">
                    <span>{k.sharedBy(r.authorName)} · {dateFormat.format(new Date(r.createdAt))}</span>
                    <span className="flex gap-3">
                      {r.url && (
                        <a href={r.url} target="_blank" rel="noopener noreferrer" className="font-bold text-teal-600 dark:text-teal-400 hover:underline">
                          {k.open} ↗
                        </a>
                      )}
                      {r.authorId === currentUser.id && (
                        <button onClick={() => remove(r.id)} className="font-bold text-red-500 hover:underline">{k.delete}</button>
                      )}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <p className="text-center text-[11px] text-neutral-400">{k.localNote}</p>
        </div>
      </main>
    </div>
  );
};
