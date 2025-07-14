import { AccountInfoWidget } from '@modules/user/ui/widgets/account-info-widget/account-info-widget';
import { AccountStatusWidget } from '@modules/user/ui/widgets/account-status-widget/account-status-widget';
import { ActivityWidget } from '@modules/user/ui/widgets/activity-widget/activity-widget';
import { AddressesWidget } from '@modules/user/ui/widgets/address-widget/address-widget';
import { HeaderWidget } from '@modules/user/ui/widgets/header-widget/header-widget';
import { QuickActionsWidget } from '@modules/user/ui/widgets/quick-actions-widget/quick-actions-widget';
import { Flex } from '@radix-ui/themes';
import { useMediaQuery } from 'react-responsive';
import styles from './profile-layout.module.scss';

export const ProfileLayout: React.FC = () => {
  const isOneColumn = useMediaQuery({ query: '(max-width: 568px)' });

  return (
    <Flex direction="column" className={styles.profileLayout}>
      <HeaderWidget />

      {isOneColumn
        ? (
            <Flex direction="column" gap="4">
              <AddressesWidget />
              <AccountInfoWidget />
              <ActivityWidget />
              <QuickActionsWidget />
              <AccountStatusWidget />
            </Flex>
          )
        : (
            <div className={styles.mainGrid}>
              <Flex direction="column" gap="4" className={styles.leftCol}>
                <AddressesWidget />
                <AccountInfoWidget />
              </Flex>
              <Flex direction="column" gap="4" className={styles.rightCol}>
                <ActivityWidget />
                <QuickActionsWidget />
                <AccountStatusWidget />
              </Flex>
            </div>
          )}
    </Flex>
  );
};
