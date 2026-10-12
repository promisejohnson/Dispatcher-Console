export type Severity = 'critical' | 'high' | 'medium' | 'low';
export type AlertStatus = 'draft' | 'active' | 'resolved' | 'cancelled';

export interface DispatchAlert {
  id: string;
  type: string;
  severity: Severity;
  status: AlertStatus;
  region: string;
  message: string;
  issuedAt: string; // ISO date
  issuedBy: string; // dispatcher name
}

export interface DispatchUser {
  id: string;
  name: string;
  email: string;
  role: 'dispatcher' | 'admin';
}

export interface NewAlertInput {
  type: string;
  severity: Severity;
  region: string;
  message: string;
}
