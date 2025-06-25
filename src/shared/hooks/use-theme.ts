import { useUiStore } from '@kernel/index'

export function useTheme() {
  const { setTheme, theme } = useUiStore(store => ({ theme: store.theme, setTheme: store.setTheme }))

  return { theme, setTheme, toggleTheme: () => setTheme(theme === 'light' ? 'dark' : 'light') }
}
