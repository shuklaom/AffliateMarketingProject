import { Link } from 'react-router-dom';
import { useSeo } from '../hooks/useSeo';
import styles from './NotFoundPage.module.css';

export default function NotFoundPage() {
  useSeo('Page Not Found');
  return (
    <div className={styles.page}>
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>Page not found</h1>
      <p className={styles.sub}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className={styles.home}>← Back to Home</Link>
    </div>
  );
}
