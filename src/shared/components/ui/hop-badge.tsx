import { Badge, Text } from '@radix-ui/themes';
import { Flex } from '@radix-ui/themes/src/index.js';
import { Hop } from 'lucide-react';

interface HopBadgeProps {
  text: string;
  size?: 'small' | 'medium' | 'large';
}

function getIconSize(size: HopBadgeProps['size']): 12 | 16 | 18 {
  switch (size) {
    case 'small':
      return 12;
    case 'medium':
      return 16;
    case 'large':
      return 18;
    default:
      return 16;
  }
}

function getTextSize(size: HopBadgeProps['size']): '1' | '2' | '3' {
  switch (size) {
    case 'small':
      return '1';
    case 'medium':
      return '2';
    case 'large':
      return '3';
    default:
      return '2';
  }
}
export function HopBadge({ text, size }: HopBadgeProps) {
  const iconSize = getIconSize(size);
  const textSize = getTextSize(size);

  return (
    <Badge key={text} color="bronze" variant="soft" highContrast>
      <Flex direction="row" align="center" gap="1">
        <Hop size={iconSize} color="gray" />
        <Text size={textSize} color="gray">
          {text}
        </Text>
      </Flex>
    </Badge>
  );
}
