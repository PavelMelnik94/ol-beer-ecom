import type { UserProfile } from '@modules/user/types';
import { Widget } from '@modules/user/ui/widget/widget';
import { AddAddressAction } from '@modules/user/ui/widgets/quick-actions-widget/actions/add-address';
import { ChangePasswordAction } from '@modules/user/ui/widgets/quick-actions-widget/actions/change-password';
import { EditProfileAction } from '@modules/user/ui/widgets/quick-actions-widget/actions/edit-profile';
import { Flex } from '@radix-ui/themes';

interface Props {
  profile: UserProfile;
}
export function QuickActionsWidget({ profile }: Props) {
  return (
    <Widget title="Quick Actions">
      <Flex direction="column" gap="2" mt="3">

        <EditProfileAction
          initialState={{
            firstName: profile.firstName,
            lastName: profile.lastName,
            email: profile.email,
          }}
        />

        <ChangePasswordAction />

        <AddAddressAction />

      </Flex>

    </Widget>
  );
}
