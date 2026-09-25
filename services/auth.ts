import { UserProfile } from '../types';

// Temporary browser-local accounts until a real auth backend exists.
// This is NOT secure: anyone with access to the browser can read localStorage.

interface StoredAccount {
  email: string;
  salt: string;
  passwordHash: string;
  profile: UserProfile;
}

const ACCOUNTS_KEY = 'ub_accounts';
const SESSION_KEY = 'ub_session';

export type AuthError = 'emailTaken' | 'invalidCredentials';

const normalize = (email: string) => email.trim().toLowerCase();

const readAccounts = (): StoredAccount[] => {
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const writeAccounts = (accounts: StoredAccount[]) => {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
};

const hash = async (password: string, salt: string): Promise<string> => {
  const data = new TextEncoder().encode(`${salt}:${password}`);
  if (crypto.subtle) {
    const digest = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(digest), b => b.toString(16).padStart(2, '0')).join('');
  }
  // crypto.subtle only exists on https/localhost; fall back to FNV-1a for plain-http dev access.
  let h = 0x811c9dc5;
  for (const byte of data) {
    h ^= byte;
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return `fnv-${h.toString(16)}`;
};

const randomSalt = () => Array.from(crypto.getRandomValues(new Uint8Array(16)), b => b.toString(16).padStart(2, '0')).join('');

export const getSessionUser = (): UserProfile | null => {
  try {
    const email = localStorage.getItem(SESSION_KEY);
    if (!email) return null;
    return readAccounts().find(a => a.email === email)?.profile ?? null;
  } catch {
    return null;
  }
};

export const register = async (email: string, password: string, profile: UserProfile): Promise<AuthError | null> => {
  const key = normalize(email);
  const accounts = readAccounts();
  if (accounts.some(a => a.email === key)) return 'emailTaken';
  const salt = randomSalt();
  writeAccounts([...accounts, { email: key, salt, passwordHash: await hash(password, salt), profile }]);
  localStorage.setItem(SESSION_KEY, key);
  return null;
};

export const login = async (email: string, password: string): Promise<UserProfile | AuthError> => {
  const key = normalize(email);
  const account = readAccounts().find(a => a.email === key);
  if (!account || account.passwordHash !== (await hash(password, account.salt))) return 'invalidCredentials';
  localStorage.setItem(SESSION_KEY, key);
  return account.profile;
};

export const logout = () => {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {}
};

export const saveSessionProfile = (profile: UserProfile) => {
  try {
    const email = localStorage.getItem(SESSION_KEY);
    if (!email) return;
    writeAccounts(readAccounts().map(a => (a.email === email ? { ...a, profile } : a)));
  } catch {}
};

export const isEmailTaken = (email: string) => readAccounts().some(a => a.email === normalize(email));
