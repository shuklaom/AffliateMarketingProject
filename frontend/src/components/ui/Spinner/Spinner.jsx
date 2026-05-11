import styles from './Spinner.module.css';

/**
 * Loading spinner.
 * @param {'sm'|'md'|'lg'} size
 */
export default function Spinner({ size = 'md', label = 'Loading…' }) {
  return (
    <span role="status" aria-label={label} className={[styles.spinner, styles[size]].join(' ')} />
  );
}
