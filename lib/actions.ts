'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { validateCredentials, createSession, destroySession, getSession } from '@/lib/auth';
import { createAlert as createAlertRecord, updateAlertStatus as updateAlertStatusRecord } from '@/lib/data';
import type { NewAlertInput, AlertStatus } from '@/types';

export interface LoginState {
  error: string | null;
}

export async function loginAction(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get('email') ?? '');
  const password = String(formData.get('password') ?? '');

  if (!validateCredentials(email, password)) {
    return { error: 'Incorrect email or password.' };
  }

  await createSession();
  redirect('/dashboard');
}

export async function logoutAction(): Promise<void> {
  await destroySession();
  redirect('/login');
}

export interface CreateAlertState {
  error: string | null;
}

export async function createAlertAction(
  _prevState: CreateAlertState,
  formData: FormData
): Promise<CreateAlertState> {
  const session = await getSession();
  if (!session) redirect('/login');

  const input: NewAlertInput = {
    type: String(formData.get('type') ?? '').trim(),
    severity: (String(formData.get('severity') ?? 'medium')) as NewAlertInput['severity'],
    region: String(formData.get('region') ?? '').trim(),
    message: String(formData.get('message') ?? '').trim(),
  };

  if (!input.type || !input.region || !input.message) {
    return { error: 'Type, region, and message are all required.' };
  }

  const alert = await createAlertRecord(input, session.name);
  revalidatePath('/dashboard/alerts');
  revalidatePath('/dashboard');
  redirect(`/dashboard/alerts/${alert.id}`);
}

export async function updateAlertStatusAction(id: string, status: AlertStatus): Promise<void> {
  const session = await getSession();
  if (!session) redirect('/login');

  await updateAlertStatusRecord(id, status);
  revalidatePath(`/dashboard/alerts/${id}`);
  revalidatePath('/dashboard/alerts');
  revalidatePath('/dashboard');
}
