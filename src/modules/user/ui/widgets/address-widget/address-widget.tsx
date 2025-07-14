import { Widget } from '@modules/user/ui/widget/widget';
import { Badge, Card, Flex, Text } from '@radix-ui/themes';
import styles from './address-widget.module.scss';

export function AddressesWidget() {
  return (
    <Widget
      title="Addresses"
      description="Manage shipping and billing addresses"
    >
      <Flex direction="column" gap="3">
        <Card data-card className={styles.addressWrapper}>
          <Flex direction="column">
            <Flex gap="2" mb="3">
              <Badge>Billing</Badge>
              <Badge color="sky">Primary</Badge>
            </Flex>
            <Text size="2">123 Main Street</Text>
            <Text size="2">New York, 10001</Text>
            <Text size="2">USA</Text>
          </Flex>
        </Card>

        <Card data-card className={styles.addressWrapper}>
          <Flex direction="column">
            <Flex gap="2" mb="3">
              <Badge>Shipping</Badge>
            </Flex>
            <Text size="2">456 Oak Avenue</Text>
            <Text size="2">Los Angeles, 90210</Text>
            <Text size="2">USA</Text>
          </Flex>
        </Card>
      </Flex>

    </Widget>
  );
}
