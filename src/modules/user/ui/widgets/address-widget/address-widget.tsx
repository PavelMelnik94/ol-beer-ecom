import type { Address } from '@kernel/types';
import { Widget } from '@modules/user/ui/widget/widget';
import { Badge, Card, Flex, Text } from '@radix-ui/themes';
import { For } from '@shared/components';
import styles from './address-widget.module.scss';

interface Props {
  addresses: Address[];
}
export function AddressesWidget({ addresses }: Props) {
  return (
    <Widget
      title="Addresses"
      description="Manage shipping and billing addresses"
    >
      <Flex direction="column" gap="3">

        <For each={addresses}>
          {address => (
            <Card key={address.id} data-card className={styles.addressWrapper}>
              <Flex direction="column">
                <Flex gap="2" mb="3">
                  {address.type === 'billing' && <Badge color="indigo">Billing</Badge>}
                  {address.type === 'shipping' && <Badge color="indigo">Shipping</Badge>}
                  {address.isPrimaryAddress && <Badge color="sky">Primary</Badge>}
                </Flex>
                <Text size="2">{address.streetName}</Text>
                <Text size="2">
                  {address.city}
                  ,
                  {' '}
                  {address.zip}
                </Text>
                <Text size="2">{address.country}</Text>
              </Flex>
            </Card>
          )}
        </For>

      </Flex>

    </Widget>
  );
}
