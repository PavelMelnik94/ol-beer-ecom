import type { CSSProperties } from 'react';
import type { Article as ArticleType } from '../../types';
import { dateFormat, getIsLiked, useGoTo } from '@kernel/index';
import { LikesCounter } from '@modules/common';
import { Flex, Heading, Section, Separator, Text, Tooltip } from '@radix-ui/themes';
import { Image } from '@shared/components';
import { CalendarDays, MessageCircleReply, Signature } from 'lucide-react';
import { TagList } from '../tag-list';
import styles from './article-preview.module.scss';

interface Properties {
  article: ArticleType;
  sectionStyles?: CSSProperties;
}

export function ArticlePreview({ article, sectionStyles }: Properties) {
  const { navigateToArticle } = useGoTo();

  const isLiked = getIsLiked(article.likedByUserIds);

  return (
    <Section className={styles.section} style={sectionStyles} data-preview-section onClick={() => navigateToArticle(article.id)}>
      <Flex className={styles.article}>

        <Flex className={styles.articleContent} direction="column" flexBasis="1" align="stretch">
          <Heading size="7" mb="2" className="playfair-bold">
            {article.title}
          </Heading>
          <Image
            alt="article preview"
            className={styles.articleImg}
            containerClassName={styles.mobileImageContainer}
            src={article.image}
            lazy={false}
            blurOnLoad
          />
          <Text size="4" mb="4" color="gray">
            {article.shortDescription}
          </Text>

          <TagList tags={article.tags} />

          <Flex direction="row" gap="3" mt="4" flexBasis="1" flexGrow="1" align="end">

            <Flex direction="row" align="center" gap="1">
              <CalendarDays size={16} color="gray" />
              <Text size="2" color="gray" wrap="nowrap">
                {dateFormat(article.createdAt)}
              </Text>
            </Flex>

            <Tooltip content="written by">
              <Flex direction="row" align="center" gap="1">
                <Signature size={16} min={16} color="gray" />
                <Text size="2" color="gray" wrap="nowrap">
                  {article.author.firstName}
                  {' '}
                  {article.author.lastName}
                </Text>
              </Flex>
            </Tooltip>

            <LikesCounter likesCount={article.likesCount} isLiked={isLiked} />

            <Tooltip content={`${article.commentsCount} ${article.commentsCount === 1 ? 'response' : 'responses'}`}>
              <Flex direction="row" align="center" gap="2">
                <MessageCircleReply size={16} color="gray" />
                <Text size="2" color="gray">
                  {article.commentsCount}
                </Text>
              </Flex>
            </Tooltip>

          </Flex>

        </Flex>
        <Image
          alt="article preview"
          className={styles.articleImg}
          containerClassName={styles.imageContainer}
          src={article.image}
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
