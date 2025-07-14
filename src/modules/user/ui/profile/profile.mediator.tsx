import { useUserProfile } from '@modules/user/hooks';
import { useUserStore } from '@modules/user/stores/user-store';
import { ProfileSkeleton } from '@modules/user/ui/skeleton/skeleton';
import { AccountInfoWidget } from '@modules/user/ui/widgets/account-info-widget/account-info-widget';
import { AccountStatusWidget } from '@modules/user/ui/widgets/account-status-widget/account-status-widget';
import { ActivityWidget } from '@modules/user/ui/widgets/activity-widget/activity-widget';
import { AddressesWidget } from '@modules/user/ui/widgets/address-widget/address-widget';
import { HeaderWidget } from '@modules/user/ui/widgets/header-widget/header-widget';
import { QuickActionsWidget } from '@modules/user/ui/widgets/quick-actions-widget/quick-actions-widget';
import { Flex } from '@radix-ui/themes';
import { useMemo } from 'react';
import { useMediaQuery } from 'react-responsive';
import styles from './profile.module.scss';

export function ProfileMediator() {
  const isOneColumn = useMediaQuery({ query: '(max-width: 610px)' });

  const { profile: profileCache, isLoading, isFetching } = useUserProfile();
  const profileState = useUserStore(s => s.profile);

  const profile = {
    ...profileState ?? {},
    ...profileCache ?? {},
  };

  const accountInfoWidget = useMemo(() => {
    return (
      <AccountInfoWidget
        id={profile.id!}
        updatedAt={profile.updatedAt!}
      />
    );
  }, [profile.id, profile.updatedAt]);

  const activityWidget = useMemo(() => {
    return (
      <ActivityWidget
        likedCommentsCount={profile.likedCommentsCount}
        likedPostsCount={profile.likedPostsCount}
      />
    );
  }, [profile.likedCommentsCount, profile.likedPostsCount]);

  const addressesWidget = useMemo(() => {
    return <AddressesWidget addresses={profile.addresses!} />;
  }, [profile.addresses]);

  const quickActionsWidget = useMemo(() => {
    return <QuickActionsWidget />;
  }, [profile]);
  const accountStatusWidget = useMemo(() => {
    return <AccountStatusWidget />;
  }, [profile]);

  if (isFetching || isLoading) {
    return <ProfileSkeleton isOneColumn={isOneColumn} />;
  }
  return (
    <Flex direction="column" className={styles.profileLayout}>
      <HeaderWidget
        firstName={profile.firstName!}
        lastName={profile.lastName!}
        createdAt={profile.createdAt!}
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
