import { useGoTo } from '@kernel/hooks';
import { Box, Text } from '@radix-ui/themes';
import styles from './logo.module.scss';

export function Logo() {
  const { navigateToHome } = useGoTo();

  return (
    <Box onClick={navigateToHome} className={styles.logo}>
      <Text as="span" size="7" weight="bold">
        ØL
      </Text>
    </Box>
  );
}
