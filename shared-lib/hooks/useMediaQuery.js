import { useState, useEffect } from 'react';

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (!query) return;
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    function onChange(e) { setMatches(e.matches); }
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}
