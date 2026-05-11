import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchProductById } from '../services/productService';
import Badge from '../components/ui/Badge';
import Spinner from '../components/ui/Spinner';
import styles from './ProductDetailPage.module.css';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchProductById(id)
      .then((data) => { if (!cancelled) setProduct(data); })
      .catch((err) => { if (!cancelled) setError(err.message || 'Failed to load product.'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [id]);

  const discount =
    product?.originalPrice && product?.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  const handleGetDeal = () => {
    if (product?.affiliateUrl) {
      window.open(product.affiliateUrl, '_blank', 'noopener,noreferrer');
    }
  };

  if (loading) {
    return (
      <div className={styles.center}>
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className={styles.center}>
        <div className={styles.errorBox}>
          <h2>Product not found</h2>
          <p>{error}</p>
          <Link to="/browse" className={styles.backLink}>← Back to Browse</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className="container">
        <button className={styles.back} onClick={() => navigate(-1)}>
          ← Back
        </button>

        <div className={styles.layout}>
          {/* Image */}
          <div className={styles.imageCol}>
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.title}
                className={styles.image}
              />
            ) : (
              <div className={styles.imagePlaceholder}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </div>
            )}
          </div>

          {/* Info */}
          <div className={styles.infoCol}>
            {product.category && (
              <Badge variant="category">{product.category}</Badge>
            )}
            <h1 className={styles.title}>{product.title}</h1>

            {product.retailer && (
              <p className={styles.retailer}>Sold by <strong>{product.retailer}</strong></p>
            )}

            <div className={styles.pricing}>
              <span className={styles.price}>
                {product.price != null ? `$${Number(product.price).toFixed(2)}` : 'See deal'}
              </span>
              {product.originalPrice && (
                <>
                  <span className={styles.originalPrice}>
                    ${Number(product.originalPrice).toFixed(2)}
                  </span>
                  {discount > 0 && (
                    <Badge variant="sale">Save {discount}%</Badge>
                  )}
                </>
              )}
            </div>

            {product.description && (
              <p className={styles.description}>{product.description}</p>
            )}

            <button className={styles.dealBtn} onClick={handleGetDeal}>
              Get This Deal
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>

            <p className={styles.disclaimer}>
              * You will be redirected to the retailer's website. Prices may vary.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
