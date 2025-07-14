import { Widget } from '@modules/user/ui/widget/widget';
import { Badge, Flex, Text } from '@radix-ui/themes';
import { dateParser } from '@shared/lib';

interface Props {
  id: string;
  updatedAt: string;
}
export function AccountInfoWidget({ id, updatedAt }: Props) {
  return (
    <Widget
      title="Account Information"
    >
      <Flex gap="4" wrap="wrap">
        <Flex direction="column">
          <Text size="2" mb="1" color="gray">User ID</Text>

          <Badge color="gray" size="1">
            {id}
          </Badge>
        </Flex>
        <Flex direction="column">
          <Text size="2" mb="1" color="gray">Last Updated</Text>

          <Badge color="gray" size="1">
            {dateParser.toFormat(updatedAt, 'MMMM dd yyyy')}
          </Badge>
        </Flex>
      </Flex>
    </Widget>
  );
}
