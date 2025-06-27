import { Badge, Flex, Text } from '@radix-ui/themes';
import { For } from '@shared/components';
import { Hop } from 'lucide-react';
import type { Article } from './../../types';

export function TagList({ tags }: { tags: Article['tags'] }) {
  return (
    <Flex direction="row" wrap="wrap" gap="2">

      <For each={tags} fallback={<Text size="2" color="gray">No tags available</Text>}>
        {tag => (
          <Badge key={tag.name} color="bronze" variant="soft" highContrast>
            <Flex direction="row" align="center" gap="1">
              <Hop size={16} color="gray" />
              <Text size="2" color="gray">
                {tag.name}
              </Text>
            </Flex>
          </Badge>
        )}
      </For>

    </Flex>
  )
}
