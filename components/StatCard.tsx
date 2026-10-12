import styles from './StatCard.module.css';

export default function StatCard({ label, value, tone }: { label: string; value: string | number; tone?: 'critical' | 'default' }) {
  return (
    <div className={styles.card}>
      <span className={styles.label}>{label}</span>
      <span className={`${styles.value} ${tone === 'critical' ? styles.valueCritical : ''}`}>{value}</span>
    </div>
  );
}
