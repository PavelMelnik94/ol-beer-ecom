import { Button } from '@radix-ui/themes';
import { useTheme } from '@shared/hooks/use-theme';
import { Moon, Sun } from 'lucide-react';

export function ThemeButton() {
  const { theme, toggleTheme } = useTheme()
  return <Button style={{ padding: '6px' }} variant="ghost" size="1" onClick={toggleTheme}>{theme === 'light' ? <Sun height={16} width={16} /> : <Moon height={16} width={16} />}</Button>
}
