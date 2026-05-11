import styles from './CategoryFilter.module.css';

/**
 * Horizontal scrollable pill category filter.
 */
export default function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <nav className={styles.wrapper} aria-label="Filter by category">
      {categories.map((cat) => (
        <button
          key={cat}
          className={[styles.pill, selected === cat ? styles.active : ''].join(' ')}
          onClick={() => onSelect(cat)}
          aria-pressed={selected === cat}
        >
          {cat}
        </button>
      ))}
    </nav>
  );
}
