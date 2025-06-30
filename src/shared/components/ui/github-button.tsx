import { Button } from '@radix-ui/themes';
import { Github } from 'lucide-react';
import type { CSSProperties } from 'react';

export function GithubButton({ withTitle = false, style }: { withTitle?: boolean, style?: CSSProperties }) {
  return (
    <Button
      style={{ ...(!withTitle ? { padding: '6px' } : {}), ...style }}
      variant="ghost"
      size="1"
      onClick={() => window.open(
        'https://github.com/PavelMelnik94'
        , '_blank',
        'noopener noreferrer',
      )}
    >
      {' '}
      <Github height={16} width={16} />
      {withTitle && 'Github'}
    </Button>
  )
}

GithubButton.displayName = 'GithubButton';
