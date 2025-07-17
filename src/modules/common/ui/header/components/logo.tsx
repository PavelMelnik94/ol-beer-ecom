import type { LogoProps } from '@modules/common/ui/header/components/header.types';
import { Box, Text } from '@radix-ui/themes';
import styles from './header.module.scss';

export function Logo({ onClick }: LogoProps) {
  return (
    <Box onClick={onClick} className={styles.logo}>
      <Text as="span" size="7" weight="bold">
        ØL
      </Text>
    </Box>
  );
}
