import { useCallback, useState } from 'react';

const KEY = 'ub_saved_members';

const read = (): string[] => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const useSavedMembers = () => {
  const [savedIds, setSavedIds] = useState<string[]>(read);

  const toggleSaved = useCallback((id: string) => {
    setSavedIds(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  return { savedIds, isSaved: (id: string) => savedIds.includes(id), toggleSaved };
};
