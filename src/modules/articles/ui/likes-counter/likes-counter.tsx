import { Flex, Text, Tooltip } from '@radix-ui/themes';
import { Show } from '@shared/components';
import { Heart } from 'lucide-react';
import { useState } from 'react';

function LikedHeart() {
  return <Heart size={16} min={16} color="red" stroke="red" fill="red" />
}

function UnlikedHeart() {
  return <Heart size={16} min={16} color="gray" />
}
export function LikesCounter({ likesCount, onClick }: { likesCount: number, onClick?: (likeState: boolean) => void; }) {
  const [isLiked, setIsLiked] = useState(false);

  const handleClick = () => {
    setIsLiked(!isLiked);
    onClick?.(!isLiked);
  };

  if (likesCount < 0) {
    throw new Error('Likes count cannot be negative');
  }
  return (
    <Tooltip content={`${likesCount} ${likesCount === 1 ? 'clap' : 'claps'}`}>
      <Flex direction="row" align="center" gap="1" onClick={handleClick}>
        <Show when={isLiked} fallback={<UnlikedHeart />}>
          <LikedHeart />
        </Show>

        <Text size="2" color="gray">
          {likesCount}
        </Text>
      </Flex>
    </Tooltip>
  )
}
