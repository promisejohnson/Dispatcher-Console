import type { DispatchAlert, NewAlertInput } from '@/types';



let alerts: DispatchAlert[] = [
  {
    id: 'WA-3001', type: 'Flash Flood', severity: 'critical', status: 'active',
    region: 'Accra', message: 'Water levels rising rapidly near the Odaw river bridge. Avoid the area and move to higher ground.',
    issuedAt: hoursAgo(1), issuedBy: 'A. Mensah',
  },
  {
    id: 'WA-3000', type: 'Severe Thunderstorm', severity: 'high', status: 'active',
    region: 'Kumasi', message: 'Lightning and high winds expected over the next 6 hours. Secure loose outdoor items.',
    issuedAt: hoursAgo(3), issuedBy: 'K. Owusu',
  },
  {
    id: 'WA-2999', type: 'Road Closure', severity: 'medium', status: 'active',
    region: 'Takoradi', message: 'Main coastal road closed due to a collapsed culvert. Use the inland bypass.',
    issuedAt: hoursAgo(5), issuedBy: 'A. Mensah',
  },
  {
    id: 'WA-2998', type: 'Structure Fire', severity: 'critical', status: 'resolved',
    region: 'Tamale', message: 'Fire at the central market has been contained. Area remains cordoned for cleanup.',
    issuedAt: hoursAgo(20), issuedBy: 'E. Darko',
  },
  {
    id: 'WA-2997', type: 'Public Health Advisory', severity: 'low', status: 'resolved',
    region: 'Cape Coast', message: 'Precautionary water advisory has been lifted following testing.',
    issuedAt: hoursAgo(30), issuedBy: 'K. Owusu',
  },
  {
    id: 'WA-2996', type: 'Security Incident', severity: 'high', status: 'cancelled',
    region: 'Ho', message: 'Reported disturbance downgraded after investigation — false alarm.',
    issuedAt: hoursAgo(40), issuedBy: 'A. Mensah',
  },
];

function hoursAgo(n: number): string {
  const d = new Date();
  d.setHours(d.getHours() - n);
  return d.toISOString();
}

function delay<T>(value: T, ms = 120): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export async function getAlerts(): Promise<DispatchAlert[]> {
  return delay([...alerts].sort((a, b) => +new Date(b.issuedAt) - +new Date(a.issuedAt)));
}

export async function getAlertById(id: string): Promise<DispatchAlert | null> {
  return delay(alerts.find((a) => a.id === id) ?? null);
}

export async function createAlert(input: NewAlertInput, issuedBy: string): Promise<DispatchAlert> {
  const alert: DispatchAlert = {
    id: 'WA-' + Math.floor(3000 + Math.random() * 900),
    status: 'active',
    issuedAt: new Date().toISOString(),
    issuedBy,
    ...input,
  };
  alerts = [alert, ...alerts];
  return delay(alert);
}

export async function updateAlertStatus(id: string, status: DispatchAlert['status']): Promise<DispatchAlert | null> {
  alerts = alerts.map((a) => (a.id === id ? { ...a, status } : a));
  return delay(alerts.find((a) => a.id === id) ?? null);
}

export async function getStats() {
  const active = alerts.filter((a) => a.status === 'active').length;
  const critical = alerts.filter((a) => a.status === 'active' && a.severity === 'critical').length;
  const resolvedToday = alerts.filter(
    (a) => a.status === 'resolved' && +new Date(a.issuedAt) > Date.now() - 1000 * 60 * 60 * 24
  ).length;
  const regions = new Set(alerts.filter((a) => a.status === 'active').map((a) => a.region)).size;
  return delay({ active, critical, resolvedToday, regions });
}
