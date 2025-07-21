import type { CSSProperties } from 'react';
import { useTheme } from '@kernel/hooks';
import { Button } from '@radix-ui/themes';
import { Moon, Sun } from 'lucide-react';

export function ThemeButton({ withTitle = false, style }: { withTitle?: boolean; style?: CSSProperties; }) {
  const { theme, toggleTheme } = useTheme();
  return (
    <Button
      style={{ ...(withTitle ? {} : { padding: '6px' }), ...style }}
      variant="ghost"
      size="1"
      name="theme-button"
      onClick={toggleTheme}
    >
      {theme === 'light' && (
        <>
          <Sun height={16} width={16} />
          {withTitle && 'Light'}
        </>
      ) }
      {theme === 'dark' && (
        <>
          <Moon height={16} width={16} />
          {withTitle && 'Dark'}
        </>
      )}
    </Button>
  );
}
