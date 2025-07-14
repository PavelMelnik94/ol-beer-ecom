import { Widget } from '@modules/user/ui/widget/widget';
import { Button, Flex } from '@radix-ui/themes';

export function QuickActionsWidget() {
  return (
    <Widget title="Quick Actions">
      <Flex direction="column" gap="2" mt="3">
        <Button variant="soft">Edit Profile</Button>
        <Button variant="soft">Add Address</Button>
        <Button variant="soft">Security Settings</Button>
      </Flex>
    </Widget>
  );
}
