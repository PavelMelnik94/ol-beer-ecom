import { useUserProfile } from '@modules/user/hooks';
import { ProfileSkeleton } from '@modules/user/ui/skeleton/skeleton';
import { AccountInfoWidget } from '@modules/user/ui/widgets/account-info-widget/account-info-widget';
import { AccountStatusWidget } from '@modules/user/ui/widgets/account-status-widget/account-status-widget';
import { ActivityWidget } from '@modules/user/ui/widgets/activity-widget/activity-widget';
import { AddressesWidget } from '@modules/user/ui/widgets/address-widget/address-widget';
import { HeaderWidget } from '@modules/user/ui/widgets/header-widget/header-widget';
import { QuickActionsWidget } from '@modules/user/ui/widgets/quick-actions-widget/quick-actions-widget';
import { Flex } from '@radix-ui/themes';
import { useMediaQuery } from 'react-responsive';
import styles from './profile.module.scss';

export function ProfileMediator() {
  const isOneColumn = useMediaQuery({ query: '(max-width: 610px)' });

  const { profile } = useUserProfile();

  if (typeof profile !== 'object' || Object.keys(profile).length === 0) {
    return <ProfileSkeleton isOneColumn={isOneColumn} />;
  }

  const accountInfoWidget = (
    <AccountInfoWidget
      id={profile.id}
      updatedAt={profile.updatedAt}
    />
  );

  const activityWidget = (
    <ActivityWidget
      ordersCount={profile.ordersCount}
      likedCommentsCount={profile.likedCommentsCount}
      likedPostsCount={profile.likedPostsCount}
    />
  );

  const addressesWidget = <AddressesWidget addresses={profile.addresses} />;

  const quickActionsWidget = (
    <QuickActionsWidget firstName={profile.firstName} lastName={profile.lastName} email={profile.email} />
  );

  const accountStatusWidget = <AccountStatusWidget />;

  return (
    <Flex direction="column" className={styles.profileLayout}>
      <HeaderWidget
        avatar={profile.avatar ?? undefined}
        firstName={profile.firstName}
        lastName={profile.lastName}
        createdAt={profile.createdAt}
      />

      {isOneColumn
        ? (
            <Flex direction="column" gap="4">
              {quickActionsWidget}
              {addressesWidget}
              {activityWidget}
              {accountInfoWidget}
              {accountStatusWidget}
            </Flex>
          )
        : (
            <div className={styles.mainGrid}>
              <Flex direction="column" gap="4" className={styles.leftCol}>
                {addressesWidget}
                {accountInfoWidget}
              </Flex>
              <Flex direction="column" gap="4" className={styles.rightCol}>
                {activityWidget}
                {quickActionsWidget}
                {accountStatusWidget}
              </Flex>
            </div>
          )}
    </Flex>
  );
}
