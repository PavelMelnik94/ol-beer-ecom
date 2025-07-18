import { useUserStore } from '@kernel/stores';
import { Hero } from '@pages/orders/ui/hero';
import { Avatar, Container, Flex, Section, Table, Text } from '@radix-ui/themes';
import { format } from 'date-fns';

export function OrdersPage() {
  const orders = useUserStore(s => s.profile?.orders ?? []);

  if (!orders.length) {
    return <Section><Text size="1">No orders found</Text></Section>;
  }

  return (
    <>
    <Container>
      <Hero />
    </Container>


    <Container mr="5" ml="5">
      <Section>
        <Table.Root variant="surface" size="3">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell><Text size="1">User</Text></Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell><Text size="1">Order ID</Text></Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell><Text size="1">Total</Text></Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell><Text size="1">Status</Text></Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell><Text size="1">Date</Text></Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell><Text size="1">Shipping Address</Text></Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {orders.map(order => (
              <Table.Row key={order.id}>
                <Table.Cell>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Avatar src={order.userSnapshot.avatar ?? undefined} fallback={order.userSnapshot.firstName[0]} size="2" radius="full" />
                    <Text size="1">
                      {order.userSnapshot.firstName}
                      {' '}
                      {order.userSnapshot.lastName}
                    </Text>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <Text size="1" weight="bold">{order.id}</Text>
                </Table.Cell>
                <Table.Cell>
                  <Flex direction="column" gap="1">
                    <Text size="1" weight="bold" color="green">
                    {order.total?.toFixed(2) ?? '0.00'}
                    {' '}
                    $
                  </Text>
                  {order.discountedTotal && (
                    <Text size="1" color="amber">
                      {order.discountedTotal.toFixed(2)}
                      {' '}
                      $
                    </Text>
                  )}
                  </Flex>
                </Table.Cell>
                <Table.Cell>
                  <Text size="1" color={order.status === 'completed' ? 'green' : 'amber'}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Text>
                </Table.Cell>
                <Table.Cell>
                  <Text size="1">{format(new Date(order.createdAt), 'dd.MM.yyyy HH:mm')}</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text size="1">
                    {order.shippingAddress ? `${order.shippingAddress.country}, ${order.shippingAddress.city}, ${order.shippingAddress.streetName}, ${order.shippingAddress.zip}` : '—'}
                  </Text>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Section>
    </Container>
    </>

  );
}
