import { Avatar, Box, Flex, Text } from '@radix-ui/themes';
import styles from './header-widget.module.scss';

export const HeaderWidget: React.FC = () => (
  <Box className={styles.header} p="4" mb="4">
    <Flex align="center" gap="4" wrap="wrap">
      <Avatar fallback="OL" size="8" />
      <Flex direction="column">
        <Text size="2">John Doe</Text>
        <Text size="2">john.doe@example.com</Text>
        <Text size="1" color="gray" mt="2">Registered on June 6, 2025</Text>
      </Flex>
    </Flex>
  </Box>
);
