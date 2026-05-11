import styles from './Badge.module.css';

/**
 * Small coloured label chip.
 * @param {'default'|'sale'|'new'|'category'} variant
 */
export default function Badge({ children, variant = 'default', className = '' }) {
  return (
    <span className={[styles.badge, styles[variant], className].filter(Boolean).join(' ')}>
      {children}
    </span>
  );
}
