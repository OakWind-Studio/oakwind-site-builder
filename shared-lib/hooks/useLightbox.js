import { useState, useEffect, useCallback } from 'react';

export function useLightbox(images = []) {
  const [state, setState] = useState({ isOpen: false, currentIndex: 0 });

  const open = useCallback((index) => setState({ isOpen: true, currentIndex: index }), []);
  const close = useCallback(() => setState((s) => ({ ...s, isOpen: false })), []);
  const next = useCallback(() => setState((s) => ({
    ...s, currentIndex: (s.currentIndex + 1) % images.length
  })), [images.length]);
  const prev = useCallback(() => setState((s) => ({
    ...s, currentIndex: (s.currentIndex - 1 + images.length) % images.length
  })), [images.length]);

  useEffect(() => {
    if (!state.isOpen) return;
    function onKey(e) {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [state.isOpen, close, next, prev]);

  return {
    isOpen: state.isOpen,
    current: images[state.currentIndex] || null,
    currentIndex: state.currentIndex,
    open, close, next, prev,
  };
}
