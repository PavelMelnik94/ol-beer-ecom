import type { AccountInfoWidgetProps, ActivityWidgetProps, AddressWidgetProps, HeaderWidgetProps } from '@modules/user/types';
import { AccountInfoWidget } from '@modules/user/ui/widgets/account-info-widget/account-info-widget';
import { AccountStatusWidget } from '@modules/user/ui/widgets/account-status-widget/account-status-widget';
import { ActivityWidget } from '@modules/user/ui/widgets/activity-widget/activity-widget';
import { AddressesWidget } from '@modules/user/ui/widgets/address-widget/address-widget';
import { HeaderWidget } from '@modules/user/ui/widgets/header-widget/header-widget';
import { QuickActionsWidget } from '@modules/user/ui/widgets/quick-actions-widget/quick-actions-widget';
import { Flex } from '@radix-ui/themes';
import { useMediaQuery } from 'react-responsive';
import styles from './profile-layout.module.scss';

interface Props {
  headerProps: HeaderWidgetProps;

  activityProps: ActivityWidgetProps;

  addressesProps: AddressWidgetProps;

  accountInfoProps: AccountInfoWidgetProps;
}
export function ProfileLayout({
  headerProps,
  activityProps,
  addressesProps,
  accountInfoProps,
}: Props) {
  const isOneColumn = useMediaQuery({ query: '(max-width: 568px)' });

  return (
    <Flex direction="column" className={styles.profileLayout}>
      <HeaderWidget {...headerProps} />

      {isOneColumn
        ? (
            <Flex direction="column" gap="4">
              <AddressesWidget {...addressesProps} />
              <AccountInfoWidget {...accountInfoProps} />
              <ActivityWidget {...activityProps} />
              <QuickActionsWidget />
              <AccountStatusWidget />
            </Flex>
          )
        : (
            <div className={styles.mainGrid}>
              <Flex direction="column" gap="4" className={styles.leftCol}>
                <AddressesWidget {...addressesProps} />
                <AccountInfoWidget {...accountInfoProps} />
              </Flex>
              <Flex direction="column" gap="4" className={styles.rightCol}>
                <ActivityWidget {...activityProps} />
                <QuickActionsWidget />
                <AccountStatusWidget />
              </Flex>
            </div>
          )}
    </Flex>
  );
}
