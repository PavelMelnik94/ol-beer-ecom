import { Button, Flex } from '@radix-ui/themes';
import { FunnelPlus } from 'lucide-react';

export function ShowFiltersAction({
  toggleVisibility,
}: {
  toggleVisibility: () => void;
}) {
  return (
    <Flex justify="end" align="center" gap="4" mt="5" mb="2" mr="5" ml="5">
      <Button
        variant="surface"
        size="1"
        onClick={toggleVisibility}
      >
        <FunnelPlus size={14} />
        Show filters
      </Button>
    </Flex>
  );
}
