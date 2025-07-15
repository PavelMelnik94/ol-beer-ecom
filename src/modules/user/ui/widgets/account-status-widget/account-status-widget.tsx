import { Widget } from '@modules/user/ui/widget/widget';
import { Box, Flex, Text } from '@radix-ui/themes';
import styles from './account-status-widget.module.scss';

export const AccountStatusWidget: React.FC = () => (
  <Widget
    title="Account Status"
  >
    <Flex align="center" gap="2" wrap="wrap">
      <Box className={styles.statusDot} />
      <Text size="2" color="grass">Active</Text>
    </Flex>
    <Text size="2">Account is verified and active</Text>
  </Widget>
);
