import { useUiStore } from '@kernel/index';
import { useEffect } from 'react';
import { themeStorage } from './../storage/';

function updateMetaColor(): void {
  const radixRoot = document.querySelector('[data-is-root-theme="true"]');
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (radixRoot && metaThemeColor) {
    const computedColor = getComputedStyle(radixRoot).getPropertyValue('--color-background');
    metaThemeColor.setAttribute('content', computedColor.trim() || '#fff');
  }
}

export function useTheme() {
  const theme = useUiStore(store => store.theme);
  const setTheme = useUiStore(store => store.setTheme);

  useEffect(() => {
    const themeInStorage = themeStorage.get();
    if (!themeInStorage) {
      const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      themeStorage.set(isDarkMode ? 'dark' : 'light');
    }
    else {
      themeStorage.set(theme);
    }
  }, [theme]);

  useEffect(() => {
    const radixRoot = document.querySelector('[data-is-root-theme="true"]');
    if (!radixRoot) return;

    const observer = new MutationObserver(() => {
      updateMetaColor();
    });
    observer.observe(radixRoot, { attributes: true, attributeFilter: ['data-theme', 'class'] });

    updateMetaColor();

    return () => { observer.disconnect(); };
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return { theme, setTheme, toggleTheme };
}
