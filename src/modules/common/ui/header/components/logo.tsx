import { useHeaderContext } from '../context/header-context';
import { Box, Text } from '@radix-ui/themes';
import styles from './header.module.scss';

export function Logo() {
  const { navigationHandlers: { onHome } } = useHeaderContext();

  return (
    <Box onClick={onHome} className={styles.logo}>
      <Text as="span" size="7" weight="bold">
        ØL
      </Text>
    </Box>
  );
}
