import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import { APP_NAME } from '../../../config/constants';

export default function Header() {
  const [open, setOpen] = useState(false);

  const navLink = ({ isActive }) =>
    [styles.navLink, isActive ? styles.navLinkActive : ''].join(' ');

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {/* Brand */}
        <Link to="/" className={styles.brand} onClick={() => setOpen(false)}>
          <span className={styles.brandIcon}>⚡</span>
          {APP_NAME}
        </Link>

        {/* Desktop nav */}
        <nav className={styles.nav} aria-label="Main navigation">
          <NavLink to="/" end className={navLink}>Home</NavLink>
          <NavLink to="/browse" className={navLink}>Browse Deals</NavLink>
        </nav>

        {/* Hamburger (mobile only) */}
        <button
          className={styles.hamburger}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={[styles.bar, open ? styles.barTop : ''].join(' ')} />
          <span className={[styles.bar, open ? styles.barMid : ''].join(' ')} />
          <span className={[styles.bar, open ? styles.barBot : ''].join(' ')} />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <nav className={styles.mobileMenu} aria-label="Mobile navigation">
          <NavLink to="/" end className={navLink} onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/browse" className={navLink} onClick={() => setOpen(false)}>Browse Deals</NavLink>
        </nav>
      )}
    </header>
  );
}
