import { Widget } from '@modules/user/ui/widget/widget';
import { Badge, Box, Flex, Text } from '@radix-ui/themes';
import { Beer, HandHeart, MessageCircleHeart } from 'lucide-react';

interface Props {
  likedPostsCount?: number;
  likedCommentsCount?: number;
  ordersCount?: number;
}
export function ActivityWidget({ likedCommentsCount, likedPostsCount, ordersCount }: Props) {
  return (
    <Widget
      title="Activity"
      description="Interaction statistics"
    >
      <Flex direction="column" gap="2">

        <Flex align="center" gap="2">
          <HandHeart color="green" size={20} strokeWidth="1.5" />
          <Text size="2">posts</Text>
          <Badge color="gray" size="1">
            {likedPostsCount}
            {' '}
            {likedPostsCount === 1 ? 'like' : 'likes'}
          </Badge>
        </Flex>

        <Flex align="center" gap="2">
          <MessageCircleHeart color="green" size={20} strokeWidth="1.5" />
          <Text size="2">comments</Text>
          <Badge color="gray" size="1">
            {likedCommentsCount}
            {' '}
            {likedCommentsCount === 1 ? 'like' : 'likes'}
          </Badge>
        </Flex>

        <Flex align="center" gap="2">
          <Beer color="green" size={20} strokeWidth="1.5" />
          <Text size="2">total orders</Text>
          <Badge color="gray" size="1">
            {ordersCount}
            {' '}
            {ordersCount === 1 ? 'order' : 'orders'}
          </Badge>
        </Flex>

      </Flex>
    </Widget>
  );
}
