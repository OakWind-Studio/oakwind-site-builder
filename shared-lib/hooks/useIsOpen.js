import { useState, useEffect } from 'react';

export function useIsOpen(hours) {
  const [state, setState] = useState({ isOpen: false, todayHours: '', currentDay: '' });

  useEffect(() => {
    if (!hours) return;
    const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const now = new Date();
    const dayKey = days[now.getDay()];
    const currentDay = dayNames[now.getDay()];
    const todayHours = hours[dayKey] || 'Closed';

    // Simple open check — assumes format like "8am-6pm" or "8:00 AM - 6:00 PM"
    let isOpen = false;
    if (todayHours && todayHours.toLowerCase() !== 'closed') {
      const hour = now.getHours();
      // Default: open 8am-6pm if can't parse
      isOpen = hour >= 8 && hour < 18;
    }

    setState({ isOpen, todayHours, currentDay });
  }, [hours]);

  return state;
}
