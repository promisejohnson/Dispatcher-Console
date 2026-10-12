import Link from 'next/link';
import { getStats, getAlerts } from '@/lib/data';
import StatCard from '@/components/StatCard';
import AlertsTable from '@/components/AlertsTable';
import styles from './page.module.css';

export default async function DashboardPage() {
  const [stats, alerts] = await Promise.all([getStats(), getAlerts()]);
  const recent = alerts.slice(0, 6);

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.title}>Overview</h1>
        <p className={styles.subtitle}>Live status across all active WASK alerts.</p>
      </div>

      <div className={styles.statGrid}>
        <StatCard label="Active alerts" value={stats.active} />
        <StatCard label="Critical, active" value={stats.critical} tone={stats.critical > 0 ? 'critical' : 'default'} />
        <StatCard label="Regions affected" value={stats.regions} />
        <StatCard label="Resolved (24h)" value={stats.resolvedToday} />
      </div>

      <div className={styles.tableSection}>
        <div className={styles.tableSectionHeader}>
          <h2 className={styles.tableTitle}>Recent alerts</h2>
          <Link href="/dashboard/alerts" className={styles.viewAll}>View all →</Link>
        </div>
        <AlertsTable alerts={recent} />
      </div>
    </div>
  );
}
