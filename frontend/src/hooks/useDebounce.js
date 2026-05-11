import { useState, useEffect, useRef } from 'react';

/**
 * Debounce a rapidly-changing value.
 * @param {*} value   - The value to debounce
 * @param {number} delay - Milliseconds to wait
 */
export function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);
  const timer = useRef(null);

  useEffect(() => {
    timer.current = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer.current);
  }, [value, delay]);

  return debounced;
}
