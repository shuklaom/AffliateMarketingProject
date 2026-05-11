import { useState, useEffect } from 'react';
import { useProducts } from '../hooks/useProducts';
import { useDebounce } from '../hooks/useDebounce';
import ProductCard from '../components/ui/ProductCard';
import SearchBar from '../components/ui/SearchBar';
import CategoryFilter from '../components/ui/CategoryFilter';
import Pagination from '../components/ui/Pagination';
import Spinner from '../components/ui/Spinner';
import { PRODUCT_CATEGORIES, SORT_OPTIONS } from '../config/constants';
import styles from './BrowseDealsPage.module.css';

export default function BrowseDealsPage() {
  const [rawQuery, setRawQuery] = useState('');
  const [sort, setSort] = useState('latest');
  const debouncedQuery = useDebounce(rawQuery, 400);

  const {
    products, loading, error,
    page, totalPages, setPage,
    category, setCategory,
    setQuery,
  } = useProducts({ initialCategory: 'All' });

  // Sync debounced query into hook
  useEffect(() => { setQuery(debouncedQuery); }, [debouncedQuery, setQuery]);

  // Client-side sort (backend sort could be wired later)
  const sorted = [...products].sort((a, b) => {
    if (sort === 'price_asc')  return (a.price ?? 0) - (b.price ?? 0);
    if (sort === 'price_desc') return (b.price ?? 0) - (a.price ?? 0);
    if (sort === 'discount') {
      const discA = a.originalPrice ? (a.originalPrice - a.price) / a.originalPrice : 0;
      const discB = b.originalPrice ? (b.originalPrice - b.price) / b.originalPrice : 0;
      return discB - discA;
    }
    return 0; // latest: keep server order
  });

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    setPage(1);
    setRawQuery('');
    setQuery('');
  };

  return (
    <div className={styles.page}>
      <div className="container">
        {/* ── Page header ───────────────────────────── */}
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>Browse Deals</h1>
          <p className={styles.subtitle}>Explore curated affiliate deals across all categories</p>
        </div>

        {/* ── Controls ──────────────────────────────── */}
        <div className={styles.controls}>
          <SearchBar
            value={rawQuery}
            onChange={(val) => {
              setRawQuery(val);
              setPage(1);
            }}
            placeholder="Search deals…"
            className={styles.search}
          />
          <div className={styles.sortWrapper}>
            <label htmlFor="sort-select" className="sr-only">Sort by</label>
            <select
              id="sort-select"
              className={styles.select}
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* ── Category pills ────────────────────────── */}
        <CategoryFilter
          categories={PRODUCT_CATEGORIES}
          selected={category}
          onSelect={handleCategoryChange}
        />

        {/* ── Grid ──────────────────────────────────── */}
        {loading && (
          <div className={styles.center}>
            <Spinner size="lg" />
          </div>
        )}

        {error && (
          <p className={styles.error}>
            Failed to load products. Make sure the backend server is running at localhost:8080.
          </p>
        )}

        {!loading && !error && sorted.length === 0 && (
          <p className={styles.empty}>
            No deals found{rawQuery ? ` for "${rawQuery}"` : ''}.
          </p>
        )}

        {!loading && !error && sorted.length > 0 && (
          <>
            <div className={styles.grid}>
              {sorted.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
          </>
        )}
      </div>
    </div>
  );
}
