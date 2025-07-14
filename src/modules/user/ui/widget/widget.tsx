import type { ReactNode } from 'react';
import { Card, Flex, Text } from '@radix-ui/themes';
import { Show } from '@shared/components';

interface WidgetProps {
  title: string;
  description?: string;
  children: ReactNode;
}
export function Widget({ title, description, children }: WidgetProps) {
  return (
    <Card>
      <Flex direction="column">
        <Text weight="bold" mb="1" size="3">{title}</Text>
        <Show when={description}>
          <Text size="2" mb="4" color="gray">
            {description}
          </Text>
        </Show>
      </Flex>

      {children}
    </Card>
  );
}
