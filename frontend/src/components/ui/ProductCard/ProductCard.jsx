import { Link } from 'react-router-dom';
import Badge from '../Badge';
import styles from './ProductCard.module.css';

/**
 * Renders a single product deal card.
 *
 * Expected product shape:
 *   { id, title, description, price, originalPrice, imageUrl,
 *     affiliateUrl, retailer, category }
 */
export default function ProductCard({ product }) {
  const {
    id,
    title,
    description,
    price,
    originalPrice,
    imageUrl,
    affiliateUrl,
    retailer,
    category,
  } = product;

  const discount =
    originalPrice && price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : null;

  const handleGetDeal = (e) => {
    e.preventDefault();
    if (affiliateUrl) window.open(affiliateUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <article className={styles.card}>
      {/* Image */}
      <Link to={`/product/${id}`} className={styles.imageWrapper} aria-label={title}>
        {imageUrl ? (
          <img src={imageUrl} alt={title} className={styles.image} loading="lazy" />
        ) : (
          <div className={styles.imagePlaceholder}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        )}
        {discount !== null && discount > 0 && (
          <Badge variant="sale" className={styles.discountBadge}>
            -{discount}%
          </Badge>
        )}
      </Link>

      {/* Content */}
      <div className={styles.body}>
        {category && <Badge variant="category">{category}</Badge>}

        <Link to={`/product/${id}`} className={styles.titleLink}>
          <h3 className={styles.title}>{title}</h3>
        </Link>

        {description && (
          <p className={styles.description}>{description}</p>
        )}

        {retailer && (
          <p className={styles.retailer}>via {retailer}</p>
        )}

        {/* Pricing */}
        <div className={styles.pricing}>
          <span className={styles.price}>
            {price != null ? `$${Number(price).toFixed(2)}` : 'See deal'}
          </span>
          {originalPrice && (
            <span className={styles.originalPrice}>
              ${Number(originalPrice).toFixed(2)}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <button className={styles.dealBtn} onClick={handleGetDeal}>
            Get Deal
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
          <Link to={`/product/${id}`} className={styles.detailsLink}>
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}
