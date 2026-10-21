import { useSyncExternalStore } from 'react';

export function readStorage<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key);
    return value === null ? fallback : (JSON.parse(value) as T);
  } catch {
    return fallback;
  }
}

export function writeStorage(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage may be unavailable (private mode, quota) — state stays in memory.
  }
}

/** Observable value persisted in localStorage, usable from any component via `useStore`. */
export function createPersistentStore<T>(key: string, initial: T) {
  let state = readStorage<T>(key, initial);
  const listeners = new Set<() => void>();

  const store = {
    get: () => state,
    set(next: T | ((prev: T) => T)) {
      state = typeof next === 'function' ? (next as (prev: T) => T)(state) : next;
      writeStorage(key, state);
      listeners.forEach((listener) => listener());
    },
    subscribe(listener: () => void) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };

  window.addEventListener('storage', (event) => {
    if (event.key !== key) return;
    state = readStorage<T>(key, initial);
    listeners.forEach((listener) => listener());
  });

  return store;
}

export function useStore<T>(store: { get: () => T; subscribe: (listener: () => void) => () => void }): T {
  return useSyncExternalStore(store.subscribe, store.get);
}
