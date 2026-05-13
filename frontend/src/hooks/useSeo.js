import { useEffect } from 'react';

const DEFAULT_DESCRIPTION =
  'Curated affiliate deals from top retailers — electronics, home, fashion, books, toys, and more.';

/**
 * Sets document.title and the meta description on mount / when deps change.
 *
 * @param {string} title       - Page-specific title (appended with site name)
 * @param {string} [description] - Meta description for this page
 */
export function useSeo(title, description = DEFAULT_DESCRIPTION) {
  useEffect(() => {
    const prev = document.title;
    document.title = title ? `${title} | Everyday Deals` : 'Everyday Deals';

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    const prevContent = meta.getAttribute('content');
    meta.setAttribute('content', description);

    return () => {
      document.title = prev;
      if (meta) meta.setAttribute('content', prevContent ?? '');
    };
  }, [title, description]);
}
