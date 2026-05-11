import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import { APP_NAME } from '../../../config/constants';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {/* Brand */}
        <Link to="/" className={styles.brand}>
          <span className={styles.brandIcon}>⚡</span>
          {APP_NAME}
        </Link>

        {/* Nav */}
        <nav className={styles.nav} aria-label="Main navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              [styles.navLink, isActive ? styles.navLinkActive : ''].join(' ')
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/browse"
            className={({ isActive }) =>
              [styles.navLink, isActive ? styles.navLinkActive : ''].join(' ')
            }
          >
            Browse Deals
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
