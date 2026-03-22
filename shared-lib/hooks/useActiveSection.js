import { useState, useEffect } from 'react';

export function useActiveSection(sectionIds = []) {
  const [active, setActive] = useState(sectionIds[0] || '');

  useEffect(() => {
    if (!sectionIds.length) return;
    const observers = [];
    const visibilityMap = {};

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          visibilityMap[id] = entry.intersectionRatio;
          const mostVisible = Object.entries(visibilityMap)
            .sort(([, a], [, b]) => b - a)[0];
          if (mostVisible && mostVisible[1] > 0) setActive(mostVisible[0]);
        },
        { threshold: [0, 0.25, 0.5, 0.75, 1] }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [sectionIds.join(',')]);

  return active;
}
