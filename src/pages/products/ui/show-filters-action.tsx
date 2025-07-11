import { Button } from '@radix-ui/themes';
import { FunnelPlus } from 'lucide-react';

export function ShowFiltersAction({
  toggleVisibility,
}: {
  toggleVisibility: () => void;
}) {
  return (
    <Button
      variant="surface"
      size="1"
      onClick={toggleVisibility}
    >
      <FunnelPlus size={14} />
      Show filters
    </Button>
  );
}
