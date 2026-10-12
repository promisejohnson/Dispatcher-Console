import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, textAlign: 'center', padding: 24 }}>
      <span className="display" style={{ color: 'var(--text-muted)', fontSize: 12 }}>404</span>
      <h1 style={{ fontSize: 22, margin: 0 }}>We couldn't find that page</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: 14, maxWidth: 360 }}>
        The alert or page you're looking for doesn't exist or may have been removed.
      </p>
      <Link href="/dashboard" style={{ color: 'var(--medium)', fontSize: 14, marginTop: 8 }}>
        ← Back to dashboard
      </Link>
    </div>
  );
}
