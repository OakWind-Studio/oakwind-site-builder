import { useRef, useState, useEffect } from 'react';

/**
 * Tracks which chapter element is closest to the viewport center.
 * Unlike usePinnedScroll (which maps container scroll progress to steps),
 * this directly measures each chapter's position — so activation always
 * matches where the text physically sits on screen.
 *
 * @param {number} count - Number of chapters
 * @param {number} targetPosition - Where in the viewport to activate (0-1, default 0.45 = slightly above center)
 * @returns {{ activeStep: number, setRef: (i: number) => (el: HTMLElement) => void }}
 */
export function useChapterScroll(count, targetPosition = 0.45) {
  const chapterRefs = useRef([]);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    function onScroll() {
      const viewportTarget = window.innerHeight * targetPosition;
      let closest = 0;
      let closestDist = Infinity;

      chapterRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const elCenter = rect.top + rect.height / 2;
        const dist = Math.abs(elCenter - viewportTarget);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      });

      setActiveStep(closest);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [count, targetPosition]);

  const setRef = (i) => (el) => { chapterRefs.current[i] = el; };
  return { activeStep, setRef };
}
