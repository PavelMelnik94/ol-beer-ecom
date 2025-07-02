import { useAuthStore } from '@kernel/stores';
import { LoginCTA } from '@modules/auth/';
import { Container, Flex, Text } from '@radix-ui/themes';
import { LikesCounterWithAuthorizePopup } from '../../common';

interface Props {
  likesCount: number;
  isLiked: boolean;
  likePost: () => void;
}
export function LikeAndComment({ likesCount, isLiked, likePost }: Props) {
  const isAuth = useAuthStore(s => s.isAuth)

  return (
    <Container pr="5" pl="5">
      <Flex
        direction="column"
        justify="center"
        align="center"
        mt="4"
        gap="1"
        mb="4"
        wrap="wrap"
      >
        <Flex
          direction="row"
          gap="1"
          wrap="wrap"
          justify="center"
          align="center"
        >
          <Text
            size="2"
            color="gray"
          >
            Support the article with a like
          </Text>
          <LikesCounterWithAuthorizePopup
            isLiked={isLiked}
            likesCount={likesCount}
            onClick={likePost}
            heartSize={16}
            textSize="2"
          />
          <Text
            size="2"
            color="gray"
          >
            and a comment
          </Text>
        </Flex>

        {!isAuth && <LoginCTA>Login</LoginCTA>}

      </Flex>
    </Container>

  )
}
