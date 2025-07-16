import { AvatarUploader } from '@modules/user/ui/widgets/quick-actions-widget/actions/avatar-uploder';
import { Avatar, Card, Flex, Text } from '@radix-ui/themes';
import { dateParser } from '@shared/lib';

interface Props {
  firstName: string;
  lastName: string;
  createdAt: string;
  avatar?: string;
}
export function HeaderWidget({ firstName, lastName, createdAt, avatar }: Props) {
  return (
    <Card mb="4">
      <Flex align="center" gap="4" wrap="wrap">
        <AvatarUploader avatarUrl={avatar} fallback="ØL" />
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
