import { Avatar, Badge, Box, Flex, Heading, Section, Separator, Text, Tooltip } from '@radix-ui/themes';
import { Image, Show } from '@shared/components';
import { CalendarDays, HandHeart, HeartHandshake, Hop, MessageCircleReply, Signature } from 'lucide-react';
import { dateFormat } from '@kernel/index';
import styles from './post-preview.module.scss';

interface ArticleTag {
  id: string;
  name: string;
}

interface Article {
  id: string;
  title: string;
  shortDescription: string;
  image: string;
  author: {
    id: string,
    firstName: string;
    lastName: string;
    avatar: string;
  },
  likesCount: number;
  commentsCount: number;
  createdAt: string;

  tags: ArticleTag[]
}
interface Props {
  post: Article
  withSeparator?: boolean;
}

export function PostPreview({ post, withSeparator = true }: Props) {
  return (
    <Section className={styles.postPreviewSection} data-preview-section>
      <Flex className={styles.postPreview}>

        <Flex className={styles.postContent} direction="column" flexBasis="1" align="stretch">
          <Heading size="7" mb="2" className="playfair-bold">
            {post.title}
          </Heading>
          <Text size="4" mb="2" color="gray">
            {post.shortDescription}
          </Text>

          <Flex direction="row" wrap="wrap" gap="2" mb="4">
            {post.tags.map(tag => (

              <Badge key={tag.name} color="bronze" variant="soft" highContrast>
                <Flex direction="row" align="center" gap="1">
                  <Hop size={16} color="gray" />
                  <Text size="2" color="gray">
                    {tag.name}
                  </Text>
                </Flex>
              </Badge>

            ))}
          </Flex>

          <Flex direction="row" gap="4" flexBasis="1" flexGrow="1" align="end">

            <Flex direction="row" align="center" gap="2">
              <CalendarDays size={16} color="gray" />
              <Text size="2" color="gray">
                {dateFormat(post.createdAt)}
              </Text>
            </Flex>

            <Tooltip content="written by">
              <Flex direction="row" align="center" gap="2">
                <Signature size={16} color="gray" />
                <Text size="2" color="gray">
                  {post.author.firstName}
                  {' '}
                  {post.author.lastName}
                </Text>
              </Flex>
            </Tooltip>

            <Tooltip content={`${post.likesCount} ${post.likesCount === 1 ? 'clap' : 'claps'}`}>
              <Flex direction="row" align="center" gap="2">
                <HandHeart size={16} color="gray" />
                <Text size="2" color="gray">
                  {post.likesCount}
                  {' '}
                  likes
                </Text>
              </Flex>
            </Tooltip>

            <Tooltip content={`${post.commentsCount} ${post.commentsCount === 1 ? 'response' : 'responses'}`}>
              <Flex direction="row" align="center" gap="2">
                <MessageCircleReply size={16} color="gray" />
                <Text size="2" color="gray">
                  {post.commentsCount}
                </Text>
              </Flex>
            </Tooltip>

          </Flex>

        </Flex>
        <Image
          alt="post preview"
          className={styles.postImg}
          containerClassName={styles.imageContainer}
          src={post.image}
          lazy={false}
          blurOnLoad
        />

      </Flex>

      <Show when={withSeparator}>
        <Separator
          orientation="horizontal"
          mb="4"
          mt="2"
          decorative
          size="4"
        />
      </Show>
    </Section>
  );
}
