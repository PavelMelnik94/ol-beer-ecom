import { Box, DataList, Flex, Separator, Skeleton, Text } from '@radix-ui/themes';
import styles from './product-details.module.scss';

export function ProductDetailsSkeleton() {
  const isMobile = window.innerWidth < 768;
  return (
    <Flex className={styles.container}>
      {isMobile && (
        <Box
          className={styles.productImagesContainer}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Skeleton
            width="100%"
            height="100%"
            style={{
              width: '100%',
              height: '400px',
              maxWidth: '100%',
              maxHeight: '60vw',
              minWidth: '160px',
              minHeight: '220px',
              borderRadius: 'unset',
              objectFit: 'cover',
            }}
          />
        </Box>
      )}
      <Box className={styles.productDetails} style={{ width: isMobile ? '95%' : '100%' }}>
        <div className={styles.scrollThumb} />
        <Text as="div" size="7" weight="bold" align="center" className={styles.productTitle} mt="4" mb="5">
          <Skeleton width="60%" height="2.2em" mx="auto" />
        </Text>
        <Text size="3" className={styles.productDescription}>
          <Skeleton width="100%" height="3em" />
        </Text>
        <DataList.Root mt="5">
          {[...Array.from({ length: 5 })].map((_, i) => (
            <DataList.Item key={i} align="center">
              <DataList.Label minWidth="88px">
                <Skeleton width="60px" height="1em" />
              </DataList.Label>
              <DataList.Value>
                <Skeleton width="80px" height="1em" />
              </DataList.Value>
            </DataList.Item>
          ))}
        </DataList.Root>
        <Separator mt="5" mb="5" size="4" />
        <Text size="3" as="div">
          <Skeleton width="40%" height="1em" />
        </Text>
        <Text size="2" color="gray">
          <Skeleton width="80%" height="1em" />
        </Text>
      </Box>
    </Flex>
  );
}
