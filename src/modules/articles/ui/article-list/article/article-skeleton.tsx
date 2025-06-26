import { Flex, Heading, Section, Separator, Skeleton, Text } from '@radix-ui/themes';
import styles from './article-preview.module.scss';

export function ArticleSkeleton() {
  return (
    <Section className={styles.section} data-preview-section>
      <Flex className={styles.article}>
        <Flex className={styles.articleContent} direction="column" flexBasis="1" align="stretch">
          <Heading size="7" mb="2" className="playfair-bold">
            <Skeleton width="70%" height="2.2rem" />
          </Heading>
          <Text size="4" mb="2" color="gray">
            <Skeleton width="95%" height="1.6rem" />
          </Text>

          <Flex direction="row" gap="2" mb="4">
            {[...Array(3)].map((_, i) => (
              <Flex key={i} direction="row" align="center" gap="1">
                <Skeleton width="2rem" height="1.2rem" />
              </Flex>
            ))}
          </Flex>

          <Flex direction="row" gap="4" flexBasis="1" flexGrow="1" align="end">
            {[...Array(4)].map((_, i) => (
              <Flex key={i} direction="row" align="center" gap="2">
                <Skeleton width="1.5rem" height="1.2rem" />
                <Skeleton width="3rem" height="1.2rem" />
              </Flex>
            ))}
          </Flex>
        </Flex>

        <div className={styles.imageContainer}>
          <Skeleton width="100%" height="100%" />
        </div>
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
