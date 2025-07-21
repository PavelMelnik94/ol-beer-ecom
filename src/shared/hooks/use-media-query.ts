import { useSyncExternalStore } from 'react';

function subscribe(callback: () => void) {
  const mediaQueryList = window.matchMedia('(max-width: 670px)');
  mediaQueryList.addEventListener('change', callback);
  return () => mediaQueryList.removeEventListener('change', callback);
}

export function useMediaQuery(query: string): boolean {
  const getSnapshot = () => window.matchMedia(query).matches;
  return useSyncExternalStore(subscribe, getSnapshot);
}
