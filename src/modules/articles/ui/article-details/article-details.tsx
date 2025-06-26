import { Avatar, Box, Card, Flex, Heading, Section, Text } from '@radix-ui/themes';
import { Image } from '@shared/components';
import { useGlobalScroll } from '@shared/hooks';
import { useLayoutEffect } from 'react';
import { useArticlesDetails } from './../../hooks/useArticleDetails';
import styles from './article-details.module.scss';

export function ArticleDetails({ id }: { id: string }) {
  const { article, isLoading } = useArticlesDetails(id as string)
  const { scrollToTop } = useGlobalScroll();

  useLayoutEffect(() => {
    scrollToTop();
  }, []);

  if (isLoading || !article?.title) {
    return <Section>Loading...</Section>;
  }

  console.log(article, 'article')
  return (
    <Section>
      <Heading size="9" mb="4" className="playfair-bold">
        {article.title}
      </Heading>

      <Heading size="5" mb="6" wrap="pretty">
        {article.shortDescription}
      </Heading>
      <Image
        alt="image"
        src={article.image}
        containerClassName={styles.imageContainer}
      />

      <Text size="5" mt="4" mb="9" as="p">
        {article.longDescription}
      </Text>

      <Box>
        <Card>
          <Flex gap="3" align="center">
            <Avatar
              size="3"
              src={article.author.avatar}
              radius="full"
              fallback="T"
            />
            <Box>
              <Text as="div" size="2" weight="bold">
                {article.author.firstName}
                {' '}
                {article.author.lastName}
              </Text>
              <Text as="div" size="2" color="gray">
                Writer, Brewster
              </Text>
            </Box>
          </Flex>
        </Card>
      </Box>
      {/* Here you would typically fetch and display the article details */}
      {/* For example, using a custom hook like useArticlesDetails(id) */}
    </Section>
  );
}
