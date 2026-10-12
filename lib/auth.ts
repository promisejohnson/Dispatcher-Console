import { cookies } from 'next/headers';
import type { DispatchUser } from '@/types';


const SESSION_COOKIE = 'wask_session';

const DEMO_USER: DispatchUser = {
  id: 'u1',
  name: 'Promise Johnson',
  email: 'dispatcher@promise.africa',
  role: 'dispatcher',
};

const DEMO_CREDENTIALS = {
  email: 'dispatcher@promise.africa',
  password: 'promise-2026',
};

export function validateCredentials(email: string, password: string): boolean {
  return email.trim().toLowerCase() === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password;
}

export async function getSession(): Promise<DispatchUser | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  return DEMO_USER;
}

export async function createSession(): Promise<void> {
  const store = await cookies();
  store.set(SESSION_COOKIE, 'demo-session-token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8, // 8 hours
  });
}

export async function destroySession(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

export { SESSION_COOKIE };
