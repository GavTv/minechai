import { createPersistentStore, useStore } from '@/shared/lib';

export interface Account {
  name: string;
  email: string;
  password: string;
}

export interface SessionUser {
  name: string;
  email: string;
}

const usersStore = createPersistentStore<Account[]>('teaboom:users', []);
const sessionStore = createPersistentStore<SessionUser | null>('teaboom:session', null);

const normalizeEmail = (email: string) => email.trim().toLowerCase();

export function registerAccount(name: string, email: string, password: string): string | null {
  const nextEmail = normalizeEmail(email);
  const users = usersStore.get();
  if (users.some((account) => account.email === nextEmail)) return 'Этот email уже зарегистрирован';
  const account: Account = { name: name.trim(), email: nextEmail, password };
  usersStore.set([...users, account]);
  sessionStore.set({ name: account.name, email: account.email });
  return null;
}

export function loginAccount(email: string, password: string): string | null {
  const account = usersStore.get().find((item) => item.email === normalizeEmail(email) && item.password === password);
  if (!account) return 'Неверный email или пароль';
  sessionStore.set({ name: account.name, email: account.email });
  return null;
}

export function logoutAccount() {
  sessionStore.set(null);
}

export function useSession() {
  return useStore(sessionStore);
}
