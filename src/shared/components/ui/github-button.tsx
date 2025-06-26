import { Button } from '@radix-ui/themes';
import { Github } from 'lucide-react';

export function GithubButton() {
  return (
    <Button
      style={{ padding: '6px' }}
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
    </Button>
  )
}
