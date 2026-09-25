import React, { useMemo, useState } from 'react';
import { CommunityEvent, EventKind, UserProfile } from '../types';
import { newId, useStoredList } from '../services/communityStore';
import { useLang } from '../i18n/LanguageContext';

const KINDS: EventKind[] = ['talk', 'hackathon', 'sharktank', 'meetup'];

const labelClasses = "text-[10px] font-bold text-neutral-400 uppercase tracking-widest";
const inputClasses = "w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-teal-500/50 focus:border-teal-500/50 outline-none transition-all dark:text-white dark:placeholder:text-neutral-600";

const emptyDraft = { title: '', kind: 'talk' as EventKind, date: '', location: '', description: '' };

export const Events: React.FC<{ currentUser: UserProfile }> = ({ currentUser }) => {
  const { t, lang } = useLang();
  const ev = t.events;
  const { items, add, update, remove } = useStoredList<CommunityEvent>('ub_events');
  const [showForm, setShowForm] = useState(false);
  const [draft, setDraft] = useState(emptyDraft);
  const [error, setError] = useState('');

  const { upcoming, past } = useMemo(() => {
    const now = Date.now();
    const sorted = [...items].sort((a, b) => a.date.localeCompare(b.date));
    return {
      upcoming: sorted.filter(e => new Date(e.date).getTime() >= now),
      past: sorted.filter(e => new Date(e.date).getTime() < now).reverse(),
    };
  }, [items]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.title.trim() || !draft.date || !draft.location.trim()) return setError(ev.required);
    add({
      id: newId(),
      title: draft.title.trim(),
      kind: draft.kind,
      date: draft.date,
      location: draft.location.trim(),
      description: draft.description.trim() || undefined,
      organizerId: currentUser.id,
      organizerName: currentUser.name || '—',
      attendeeIds: [currentUser.id],
    });
    setDraft(emptyDraft);
    setError('');
    setShowForm(false);
  };

  const toggleAttend = (event: CommunityEvent) => {
    const attending = event.attendeeIds.includes(currentUser.id);
    update(event.id, {
      attendeeIds: attending ? event.attendeeIds.filter(id => id !== currentUser.id) : [...event.attendeeIds, currentUser.id],
    });
  };

  const locale = lang === 'nl' ? 'nl-BE' : 'en-GB';
  const dayFormat = new Intl.DateTimeFormat(locale, { day: 'numeric' });
  const monthFormat = new Intl.DateTimeFormat(locale, { month: 'short' });
  const fullFormat = new Intl.DateTimeFormat(locale, { weekday: 'long', hour: '2-digit', minute: '2-digit' });

  const renderEvent = (event: CommunityEvent, isPast: boolean) => {
    const date = new Date(event.date);
    const attending = event.attendeeIds.includes(currentUser.id);
    return (
      <li key={event.id} className={`bg-white dark:bg-[#121212] rounded-2xl border border-neutral-100 dark:border-neutral-800 p-5 sm:p-6 flex gap-5 ${isPast ? 'opacity-60' : ''}`}>
        <div className="w-14 shrink-0 text-center">
          <div className="text-2xl font-light text-neutral-900 dark:text-white tabular-nums">{dayFormat.format(date)}</div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-teal-600">{monthFormat.format(date)}</div>
        </div>
        <div className="flex-1 min-w-0 space-y-2">
          <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
            {ev.kinds[event.kind]} · {fullFormat.format(date)}
          </div>
          <h3 className="text-base font-semibold text-neutral-900 dark:text-white break-words">{event.title}</h3>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">📍 {event.location}</p>
          {event.description && <p className="text-sm text-neutral-500 dark:text-neutral-400 font-light leading-relaxed whitespace-pre-line">{event.description}</p>}
          <div className="pt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-neutral-400">
            <span>{ev.organizedBy(event.organizerName)}</span>
            <span>{ev.attendees(event.attendeeIds.length)}</span>
            {!isPast && (
              <button
                onClick={() => toggleAttend(event)}
                aria-pressed={attending}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${
                  attending ? 'bg-teal-600 text-white' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                }`}
              >
                {attending ? `✓ ${ev.attending}` : ev.attend}
              </button>
            )}
            {event.organizerId === currentUser.id && (
              <button onClick={() => remove(event.id)} className="font-bold text-red-500 hover:underline">{ev.delete}</button>
            )}
          </div>
        </div>
      </li>
    );
  };

  return (
    <div className="h-full flex flex-col bg-neutral-50 dark:bg-[#0a0a0a] overflow-hidden">
      <header className="px-4 lg:px-8 py-6 border-b border-neutral-100 dark:border-neutral-800 bg-white dark:bg-[#121212] shrink-0">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-light text-neutral-900 dark:text-white tracking-tight">{ev.title}</h1>
            <p className="text-xs text-neutral-500 font-light">{ev.subtitle}</p>
          </div>
          <button
            onClick={() => setShowForm(v => !v)}
            aria-expanded={showForm}
            className="self-start sm:self-auto px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-xl text-[11px] font-bold tracking-widest uppercase hover:opacity-90"
          >
            {showForm ? t.common.cancel : `+ ${ev.add}`}
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 lg:p-8">
        <div className="max-w-3xl mx-auto space-y-8">
          {showForm && (
            <form onSubmit={handleSubmit} className="bg-white dark:bg-[#121212] rounded-[2rem] border border-neutral-100 dark:border-neutral-800 p-6 sm:p-8 space-y-5 animate-in">
              <h2 className="text-lg font-medium text-neutral-900 dark:text-white">{ev.formTitle}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="ev-title" className={labelClasses}>{ev.fieldTitle}</label>
                  <input id="ev-title" className={inputClasses} value={draft.title} onChange={e => setDraft({ ...draft, title: e.target.value })} autoFocus />
                </div>
                <div className="space-y-2">
                  <label htmlFor="ev-kind" className={labelClasses}>{ev.fieldKind}</label>
                  <select id="ev-kind" className={inputClasses} value={draft.kind} onChange={e => setDraft({ ...draft, kind: e.target.value as EventKind })}>
                    {KINDS.map(kind => <option key={kind} value={kind}>{ev.kinds[kind]}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="ev-date" className={labelClasses}>{ev.fieldDate}</label>
                  <input id="ev-date" type="datetime-local" className={inputClasses} value={draft.date} onChange={e => setDraft({ ...draft, date: e.target.value })} />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="ev-loc" className={labelClasses}>{ev.fieldLocation}</label>
                  <input id="ev-loc" className={inputClasses} value={draft.location} onChange={e => setDraft({ ...draft, location: e.target.value })} placeholder={ev.fieldLocationPlaceholder} />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="ev-desc" className={labelClasses}>{ev.fieldDescription}</label>
                  <textarea id="ev-desc" className={`${inputClasses} h-28 resize-none`} value={draft.description} onChange={e => setDraft({ ...draft, description: e.target.value })} />
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

          <section className="space-y-4">
            <h2 className="text-[11px] font-bold text-neutral-400 tracking-[0.2em] uppercase px-1">{ev.upcoming}</h2>
            {upcoming.length === 0 ? (
              <p className="py-12 text-center text-sm text-neutral-400">{ev.empty}</p>
            ) : (
              <ul className="space-y-4">{upcoming.map(e => renderEvent(e, false))}</ul>
            )}
          </section>

          {past.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-[11px] font-bold text-neutral-400 tracking-[0.2em] uppercase px-1">{ev.past}</h2>
              <ul className="space-y-4">{past.map(e => renderEvent(e, true))}</ul>
            </section>
          )}

          <p className="text-center text-[11px] text-neutral-400">{ev.localNote}</p>
        </div>
      </main>
    </div>
  );
};
