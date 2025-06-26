import { Badge, Flex, Heading, Section, Separator, Text, Tooltip } from '@radix-ui/themes';
import { Image } from '@shared/components';
import { CalendarDays, HandHeart, Hop, MessageCircleReply, Signature } from 'lucide-react';
import { ROUTES, dateFormat } from '@kernel/index';
import { useNavigate } from 'react-router-dom';
import type { Article as ArticleType } from '../../../types';
import styles from './article-preview.module.scss';

interface Props {
  post: ArticleType
}

export function ArticlePreview({ post }: Props) {
  const navigate = useNavigate()
  return (
    <Section className={styles.section} data-preview-section onClick={() => navigate(`${ROUTES.articles.article(post.id)}`)}>
      <Flex className={styles.article}>

        <Flex className={styles.articleContent} direction="column" flexBasis="1" align="stretch">
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

      <Separator
        orientation="horizontal"
        mb="4"
        mt="2"
        decorative
        size="4"
      />
    </Section>
  );
}
