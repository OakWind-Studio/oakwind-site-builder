import { useState, useRef, useCallback } from 'react';

export function useBeforeAfter(initialPosition = 50) {
  const [position, setPosition] = useState(initialPosition);
  const containerRef = useRef(null);
  const dragging = useRef(false);

  const updatePosition = useCallback((clientX) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(pct);
  }, []);

  const handleMouseDown = useCallback((e) => {
    dragging.current = true;
    updatePosition(e.clientX);
    const onMove = (e) => { if (dragging.current) updatePosition(e.clientX); };
    const onUp = () => { dragging.current = false; window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }, [updatePosition]);

  const handleTouchStart = useCallback((e) => {
    dragging.current = true;
    updatePosition(e.touches[0].clientX);
    const onMove = (e) => { if (dragging.current) updatePosition(e.touches[0].clientX); };
    const onEnd = () => { dragging.current = false; window.removeEventListener('touchmove', onMove); window.removeEventListener('touchend', onEnd); };
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend', onEnd);
  }, [updatePosition]);

  return { position, containerRef, handleMouseDown, handleTouchStart };
}
