import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useDebounce } from '../hooks/useDebounce';
import { useSeo } from '../hooks/useSeo';
import ProductCard from '../components/ui/ProductCard';
import SearchBar from '../components/ui/SearchBar';
import CategoryFilter from '../components/ui/CategoryFilter';
import Pagination from '../components/ui/Pagination';
import Spinner from '../components/ui/Spinner';
import { PRODUCT_CATEGORIES, SORT_OPTIONS } from '../config/constants';
import styles from './BrowseDealsPage.module.css';

export default function BrowseDealsPage() {
  useSeo('Browse Deals', 'Browse and filter hundreds of curated affiliate deals by category, price, and discount.');

  const [searchParams, setSearchParams] = useSearchParams();

  // Initialise from URL on first render
  const [rawQuery, setRawQuery] = useState(searchParams.get('q') ?? '');
  const debouncedQuery = useDebounce(rawQuery, 400);

  const {
    products, loading, error,
    page, totalPages, setPage,
    category, setCategory,
    sort, setSort,
    setQuery,
  } = useProducts({
    initialCategory: searchParams.get('category') ?? 'All',
    initialQuery:    searchParams.get('q')        ?? '',
    initialSort:     searchParams.get('sort')     ?? 'latest',
  });

  // Sync debounced query into hook
  useEffect(() => { setQuery(debouncedQuery); }, [debouncedQuery, setQuery]);

  // Keep URL in sync whenever filters change
  useEffect(() => {
    const params = {};
    if (debouncedQuery) params.q        = debouncedQuery;
    if (category !== 'All') params.category = category;
    if (sort !== 'latest')  params.sort     = sort;
    if (page > 1)           params.page     = page;
    setSearchParams(params, { replace: true });
  }, [debouncedQuery, category, sort, page, setSearchParams]);

  const handleCategoryChange = (cat) => {
    setRawQuery('');
    setCategory(cat); // resets query state and page internally
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

        {!loading && !error && products.length === 0 && (
          <p className={styles.empty}>
            No deals found{rawQuery ? ` for "${rawQuery}"` : ''}.
          </p>
        )}

        {!loading && !error && products.length > 0 && (
          <>
            <div className={styles.grid}>
              {products.map((product) => (
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
