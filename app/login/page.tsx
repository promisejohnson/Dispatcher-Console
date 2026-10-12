import LoginForm from '@/components/LoginForm';
import styles from './page.module.css';

export default function LoginPage() {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.brand}>
          <div className={styles.brandMark}>C</div>
          <div className={styles.brandText}>
            <span className={styles.brandName}>Console</span>
            <span className={styles.brandSub}>Dispatcher Console</span>
          </div>
        </div>

        <h1 className={styles.title}>Sign in</h1>
        <p className={styles.subtitle}>Authorized dispatch personnel only.</p>

        <LoginForm />

        <div className={styles.demoBox}>
          <span className={styles.demoLabel}>Demo credentials</span>
          <span className="mono">dispatcher@wask.africa</span>
          <span className="mono">wask-demo-2026</span>
        </div>
      </div>
    </div>
  );
}
