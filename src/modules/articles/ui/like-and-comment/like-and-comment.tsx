import { Flex, Text } from '@radix-ui/themes';
import { Image } from '@shared/components';
import { useMediaQuery } from 'react-responsive';
import { LikesCounterWithAuthorizePopup } from '../likes-counter/likes-counter-with-auth-popup';
import styles from './like-and-comment.module.scss';

interface Props {
  likesCount: number;
  likePost: () => void;
}
export function LikeAndComment({ likesCount, likePost }: Props) {
  const isColumnLayout = useMediaQuery({
    query: '(max-width: 900px)',
  });
  return (
    <Flex
      direction={isColumnLayout ? 'column' : 'row'}
      justify="center"
      align="center"
      mt="4"
      gap="1"
      mb="4"
      wrap="wrap"
    >
      <Flex
        direction={isColumnLayout ? 'row' : 'column'}
        mb={isColumnLayout ? '3' : '0'}
        gap="1"
        wrap={isColumnLayout ? 'wrap' : 'nowrap'}
        justify="center"
        align="center"
      >
        <Text
          size={isColumnLayout ? '2' : '5'}
          color="gray"
        >
          Support the article with a like
        </Text>
        <LikesCounterWithAuthorizePopup
          likesCount={likesCount}
          onClick={likePost}
          heartSize={isColumnLayout ? 16 : 24}
          textSize={isColumnLayout ? '2' : '5'}
        />
        <Text
          size={isColumnLayout ? '2' : '5'}
          color="gray"
        >
          and a comment
        </Text>
      </Flex>

      <Image
        alt="comments illustration"
        src="/illustrations/u_comments.svg"
        containerClassName={styles.commentsImageContainer}
      />
    </Flex>
  )
}
