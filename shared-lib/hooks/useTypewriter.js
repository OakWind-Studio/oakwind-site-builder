import { useState, useEffect, useRef } from 'react';

export function useTypewriter(text = '', speed = 50, startWhenVisible = true) {
  const ref = useRef(null);
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [started, setStarted] = useState(!startWhenVisible);

  // IntersectionObserver to trigger start
  useEffect(() => {
    if (!startWhenVisible || !ref.current) { setStarted(true); return; }
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [startWhenVisible]);

  // Character reveal
  useEffect(() => {
    if (!started || !text) return;
    let i = 0;
    setDisplayText('');
    setIsComplete(false);
    const interval = setInterval(() => {
      i++;
      setDisplayText(text.slice(0, i));
      if (i >= text.length) {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [started, text, speed]);

  return { displayText, isComplete, ref };
}
