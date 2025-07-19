import { CartButton } from '@modules/cart';
import { Flex } from '@radix-ui/themes';
import { AuthSection } from './auth-section';
import { useHeaderContext } from '../context/header-context';

import styles from './header.module.scss';
import { UserMenu } from './user-menu';

export function DesktopActions() {
  const {
    isAuth,
    navigationHandlers,
  } = useHeaderContext();


  console.log('DesktopActions rendered', isAuth);
  return (
    <Flex align="center" gap="5" className={styles.desktopActions}>
      {isAuth && <CartButton onClick={navigationHandlers.onBasket} />}
      {isAuth
        ? (
            <UserMenu />
          )
        : (
            <AuthSection />
          )}
    </Flex>
  );
}
