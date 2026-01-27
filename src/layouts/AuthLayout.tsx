import { Outlet } from 'react-router-dom';
import { ThemeSettings } from '../components/ThemeSettings';
import styles from './AuthLayout.module.css';

export const AuthLayout = () => {
  return (
    <div className={styles.authContainer}>
      {/* Theme Settings Button */}
      <ThemeSettings />

      {/* Header */}
      <header className={styles.blueHeader}>
        <div className={styles.logoArea}>
          <div className={styles.trialBadge}>🎁 3 MONTHS FREE TRIAL</div>
          <h1 className={styles.mainTitle}>ShipHub</h1>
          <p className={styles.subTitle}>Global Logistics Made Simple</p>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.formWrapper}>
        <div className={styles.authCard}>
          <Outlet /> {/* Login / Register Page */}
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footerText}>
        © 2026 ShipHub Global. Secure Logistics Platform.
      </footer>
    </div>
  );
};
