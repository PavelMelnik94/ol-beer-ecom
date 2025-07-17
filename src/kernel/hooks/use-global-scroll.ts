import { useEffect } from 'react';
import { useScrollStore } from './../stores';

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export function useGlobalScroll() {
  const {
    scrollY,
    scrollDirection,
    isScrolling,
    scrollProgress,
    scrollVelocity,
    setScrollY,
    setScrollDirection,
    setIsScrolling,
    setScrollProgress,
    setScrollVelocity,
  } = useScrollStore();

  useEffect(() => {
    let lastY = window.scrollY;
    let lastTime = performance.now();
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      const y = window.scrollY;
      const now = performance.now();
      const dt = (now - lastTime) / 1000;

      let velocity = dt > 0 ? (y - lastY) / dt : 0;
      velocity = clamp(velocity, -3000, 3000);

      setScrollY(y);
      setScrollProgress(
        y / (document.documentElement.scrollHeight - window.innerHeight),
      );
      setIsScrolling(true);
      setScrollVelocity(velocity);
      setScrollDirection(y > lastY ? 'down' : y < lastY ? 'up' : null);

      lastY = y;
      lastTime = now;

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsScrolling(false);
        setScrollVelocity(0);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, [
    setScrollY,
    setScrollProgress,
    setIsScrolling,
    setScrollDirection,
    setScrollVelocity,
  ]);

  const scrollToTop = () => { window.scrollTo({ top: 0, behavior: 'smooth' }); };

  return {
    scrollY,
    scrollDirection,
    isScrolling,
    scrollProgress,
    scrollVelocity,
    scrollToTop,
  };
}
