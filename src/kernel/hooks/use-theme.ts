import { useUiStore } from '@kernel/index'
import { useEffect } from 'react';

export function useTheme() {
  const { setTheme, theme } = useUiStore(store => ({ theme: store.theme, setTheme: store.setTheme }))

  useEffect(() => {
    const updateThemeColor = () => {
      const radixRoot = document.querySelector('[data-is-root-theme="true"]');
      const metaThemeColor = document.querySelector('meta[name=theme-color]');
      if (radixRoot && metaThemeColor) {
        const computedColor = getComputedStyle(radixRoot).getPropertyValue('--color-background');
        metaThemeColor.setAttribute('content', computedColor.trim() || '#fff');
      }
    };
    requestAnimationFrame(updateThemeColor);
  }, [theme]);

  return { theme, setTheme, toggleTheme: () => setTheme(theme === 'light' ? 'dark' : 'light') }
}
