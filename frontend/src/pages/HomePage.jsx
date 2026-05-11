import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ui/ProductCard';
import Spinner from '../components/ui/Spinner';
import styles from './HomePage.module.css';

export default function HomePage() {
  const { products, loading, error } = useProducts({ initialCategory: 'All' });
  const featured = products.slice(0, 8);

  return (
    <div className={styles.page}>
      {/* ── Hero ─────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.heroEyebrow}>⚡ Hot deals, updated daily</span>
          <h1 className={styles.heroTitle}>
            Find the Best<br />
            <span className={styles.heroAccent}>Everyday Deals</span>
          </h1>
          <p className={styles.heroSub}>
            Curated affiliate deals from top retailers — electronics, home, fashion, and more.
          </p>
          <div className={styles.heroActions}>
            <Link to="/browse" className={styles.heroCta}>
              Browse All Deals
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>
        <div className={styles.heroVisual} aria-hidden="true">
          <div className={styles.heroBlobA} />
          <div className={styles.heroBlobB} />
        </div>
      </section>

      {/* ── Featured deals ───────────────────────────── */}
      <section className={styles.featured}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Featured Deals</h2>
            <Link to="/browse" className={styles.seeAll}>See all →</Link>
          </div>

          {loading && (
            <div className={styles.center}>
              <Spinner size="lg" />
            </div>
          )}

          {error && (
            <p className={styles.error}>
              Could not load deals. Make sure the backend is running.
            </p>
          )}

          {!loading && !error && featured.length === 0 && (
            <p className={styles.empty}>No deals found. Add some products via the backend.</p>
          )}

          {!loading && !error && featured.length > 0 && (
            <div className={styles.grid}>
              {featured.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
