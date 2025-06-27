import React from 'react';
import { Flex, Heading, Section, Skeleton, Text } from '@radix-ui/themes';
import styles from './article-skeleton.module.css';

export const ArticleSkeleton: React.FC = () => (
  <Section>
    <Heading size="9" mb="4" className="playfair-bold">
      <Skeleton className={styles.skeletonTitle} />
    </Heading>

    <Flex direction="row" justify="start" align="center" gap="4" mb="4">
      <Skeleton className={styles.skeletonDate} />
      <Skeleton className={styles.skeletonLikes} />
    </Flex>

    <Heading size="5" mb="6" wrap="pretty">
      <Skeleton className={styles.skeletonShortDesc} />
    </Heading>

    <div className={styles.imageContainer}>
      <Skeleton className={styles.skeletonImage} />
    </div>

    <Text size="5" mt="4" mb="9" as="p">
      <Skeleton className={styles.skeletonLongDesc} />
      <Skeleton className={styles.skeletonLongDesc} />
      <Skeleton className={styles.skeletonLongDesc} />
    </Text>

    <Skeleton className={styles.skeletonMeta} />

    <Skeleton className={styles.skeletonLikeComment} />

    <Skeleton className={styles.skeletonComments} />
  </Section>
);
