import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import { APP_NAME } from '../../../config/constants';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span className={styles.brand}>⚡ {APP_NAME}</span>
        <nav className={styles.links} aria-label="Footer navigation">
          <Link to="/" className={styles.link}>Home</Link>
          <Link to="/browse" className={styles.link}>Browse Deals</Link>
        </nav>
        <p className={styles.copy}>© {year} {APP_NAME}. All rights reserved.</p>
      </div>
    </footer>
  );
}
