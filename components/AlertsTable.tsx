import Link from 'next/link';
import type { DispatchAlert } from '@/types';
import { SeverityBadge, AlertStatusBadge } from './Badges';
import styles from './AlertsTable.module.css';

export default function AlertsTable({ alerts }: { alerts: DispatchAlert[] }) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Alert</th>
          <th>Region</th>
          <th>Severity</th>
          <th>Status</th>
          <th>Issued</th>
        </tr>
      </thead>
      <tbody>
        {alerts.map((alert) => (
          <tr key={alert.id}>
            <td>
              <Link href={`/dashboard/alerts/${alert.id}`} className={styles.alertLink}>
                <span className="mono">{alert.id}</span>
                <span className={styles.alertType}>{alert.type}</span>
              </Link>
            </td>
            <td>{alert.region}</td>
            <td><SeverityBadge severity={alert.severity} /></td>
            <td><AlertStatusBadge status={alert.status} /></td>
            <td className={styles.timeCell}>{new Date(alert.issuedAt).toLocaleString()}</td>
          </tr>
        ))}
        {alerts.length === 0 && (
          <tr><td colSpan={5} className={styles.empty}>No alerts to show.</td></tr>
        )}
      </tbody>
    </table>
  );
}
