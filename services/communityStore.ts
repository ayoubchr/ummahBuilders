import { useCallback, useState } from 'react';

// Browser-local list storage until there is a shared backend.
export const useStoredList = <T extends { id: string }>(key: string) => {
  const [items, setItems] = useState<T[]>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const write = useCallback((updater: (prev: T[]) => T[]) => {
    setItems(prev => {
      const next = updater(prev);
      try {
        localStorage.setItem(key, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, [key]);

  const add = useCallback((item: T) => write(prev => [item, ...prev]), [write]);
  const update = useCallback((id: string, patch: Partial<T>) => write(prev => prev.map(i => (i.id === id ? { ...i, ...patch } : i))), [write]);
  const remove = useCallback((id: string) => write(prev => prev.filter(i => i.id !== id)), [write]);

  return { items, add, update, remove };
};

export const newId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
