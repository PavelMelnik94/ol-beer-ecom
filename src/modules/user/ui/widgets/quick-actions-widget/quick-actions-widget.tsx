import { Widget } from '@modules/user/ui/widget/widget';
import { AddAddressAction } from '@modules/user/ui/widgets/quick-actions-widget/actions/add-address';
import { ChangePasswordAction } from '@modules/user/ui/widgets/quick-actions-widget/actions/change-password';
import { EditProfileAction } from '@modules/user/ui/widgets/quick-actions-widget/actions/edit-profile';
import { Flex } from '@radix-ui/themes';

interface Props {
  firstName: string;
  lastName: string;
  email: string;
}
export function QuickActionsWidget({ firstName, lastName, email }: Props) {
  return (
    <Widget title="Quick Actions">
      <Flex direction="column" gap="2" mt="3">

        <EditProfileAction
          initialState={{
            firstName,
            lastName,
            email,
          }}
        />

        <ChangePasswordAction />

        <AddAddressAction />

      </Flex>

    </Widget>
  );
}
