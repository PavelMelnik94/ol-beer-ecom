import { Widget } from '@modules/user/ui/widget/widget';
import { Badge, Flex, Text } from '@radix-ui/themes';
import { HandHeart, MessageCircleHeart } from 'lucide-react';

export function ActivityWidget() {
  return (
    <Widget
      title="Activity"
      description="Interaction statistics"
    >
      <Flex direction="column" gap="2">
        <Flex align="center" gap="2">
          <HandHeart color="teal" size={20} strokeWidth="1.5" />
          <Text size="2">Liked posts</Text>
          <Badge color="gray" size="1">5</Badge>
        </Flex>
        <Flex align="center" gap="2">
          <MessageCircleHeart color="teal" size={20} strokeWidth="1.5" />
          <Text size="2">Liked comments</Text>
          <Badge color="gray" size="1">3</Badge>
        </Flex>
      </Flex>
    </Widget>
  );
}
