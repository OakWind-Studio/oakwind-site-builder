import { useState, useCallback } from 'react';

export function useToggle(initial = false) {
  const [isOpen, setOpen] = useState(initial);
  const toggle = useCallback(() => setOpen((v) => !v), []);
  return [isOpen, toggle, setOpen];
}
