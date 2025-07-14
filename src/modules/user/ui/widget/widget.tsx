import type { ReactNode } from 'react';
import { Badge, Box, Flex, Text } from '@radix-ui/themes';
import { Show } from '@shared/components';
import { HandHeart, MessageCircleHeart } from 'lucide-react';
import styles from './widget.module.scss';

interface WidgetProps {
  title: string;
  description?: string;
  children: ReactNode;
}
export function Widget({ title, description, children }: WidgetProps) {
  return (
    <Box className={styles.widget} p="4" mb="4">

      <Flex direction="column">
        <Text weight="bold" mb="1" size="3">{title}</Text>
        <Show when={description}>
          <Text size="2" mb="4" color="gray">
            {description}
          </Text>
        </Show>
      </Flex>

      {children}
    </Box>
  );
}
