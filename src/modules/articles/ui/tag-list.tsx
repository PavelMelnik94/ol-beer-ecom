import type { Article } from '../types';
import { Flex, Text } from '@radix-ui/themes';
import { For } from '@shared/components';
import { HopBadge } from '@shared/components/ui/hop-badge';

export function TagList({ tags }: { tags: Article['tags']; }) {
  return (
    <Flex direction="row" wrap="wrap" gap="2">

      <For each={tags} fallback={<Text size="2" color="gray">No tags available</Text>}>
        {tag => <HopBadge key={tag.name} text={tag.name} />}
      </For>

    </Flex>
  );
}
