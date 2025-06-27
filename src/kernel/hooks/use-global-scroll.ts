import { useEffect } from 'react';
import { useScrollStore } from './../stores';

export function useGlobalScroll() {
  const { scrollY, scrollDirection, isScrolling, scrollProgress } = useScrollStore();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      const y = window.scrollY;
      const progress = y / (document.documentElement.scrollHeight - window.innerHeight);

      useScrollStore.getState().setScrollY(y);
      useScrollStore.getState().setScrollProgress(progress);
      useScrollStore.getState().setIsScrolling(true);

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        useScrollStore.getState().setIsScrolling(false);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return { scrollY, scrollDirection, isScrolling, scrollProgress, scrollToTop };
}
