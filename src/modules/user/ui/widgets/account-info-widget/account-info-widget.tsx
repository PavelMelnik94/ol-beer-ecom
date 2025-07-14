import { Widget } from '@modules/user/ui/widget/widget';
import { Badge, Flex, Text } from '@radix-ui/themes';
import styles from './account-info-widget.module.scss';

export function AccountInfoWidget() {
  return (
    <Widget
      title="Account Information"
    >
      <Flex gap="4" wrap="wrap">
        <Flex direction="column">
          <Text size="2" mb="1" color="gray">User ID</Text>

          <Badge color="gray" size="1" className={styles.value}>
            550e8400-e29b-41d4-a716-446655440000
          </Badge>
        </Flex>
        <Flex direction="column">
          <Text size="2" mb="1" color="gray">Last Updated</Text>

          <Badge color="gray" size="1" className={styles.value}>
            June 6, 2025
          </Badge>
        </Flex>
      </Flex>
    </Widget>
  );
}
