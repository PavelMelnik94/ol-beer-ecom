import { useUiStore } from '@kernel/index'
import { useEffect } from 'react';

export function useTheme() {
  const { setTheme, theme } = useUiStore(store => ({ theme: store.theme, setTheme: store.setTheme }))

  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name=theme-color]');
    if (metaThemeColor) {
      const computedColor = getComputedStyle(document.body).getPropertyValue('--color-background');
      metaThemeColor.setAttribute('content', computedColor.trim() || '#fff');
    }
  }, [theme]);
  return { theme, setTheme, toggleTheme: () => setTheme(theme === 'light' ? 'dark' : 'light') }
}
