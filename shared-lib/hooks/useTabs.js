import { useState } from 'react';

export function useTabs(initialTab = '') {
  const [activeTab, setActiveTab] = useState(initialTab);
  return { activeTab, setActiveTab };
}
