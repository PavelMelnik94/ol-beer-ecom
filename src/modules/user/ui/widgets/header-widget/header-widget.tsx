import { Avatar, Card, Flex, Text } from '@radix-ui/themes';
import { dateParser } from '@shared/lib';

interface Props {
  firstName: string;
  lastName: string;
  createdAt: string;
}
export function HeaderWidget({ firstName, lastName, createdAt }: Props) {
  return (
    <Card mb="4">
      <Flex align="center" gap="4" wrap="wrap">
        <Avatar fallback="OL" size="6" />
        <Flex direction="column">
          <Text size="4">{firstName}</Text>
          <Text size="4">{lastName}</Text>
          <Text size="1" color="gray" mt="2">
            Registered on
            {' '}
            {dateParser.toFormat(createdAt, 'MMMM dd yyyy')}
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
}
