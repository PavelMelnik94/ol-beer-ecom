import type { DesktopActionsProps } from './header.types';
import { CartButton } from '@modules/cart';
import { Flex } from '@radix-ui/themes';
import { AuthSection } from './auth-section';

import styles from './header.module.scss';
import { UserMenu } from './user-menu';

export function DesktopActions({
  isAuth,
  user,
  mobileMenuOpen,
  setMobileMenuOpen,
  navigationHandlers,
  getActiveProps,
  routes,
}: DesktopActionsProps) {
  return (
    <Flex align="center" gap="5" className={styles.desktopActions}>
      {isAuth && <CartButton onClick={navigationHandlers.onBasket} getActiveProps={getActiveProps} />}
      {isAuth
        ? (
            <UserMenu
              user={user}
              isAuth={isAuth}
              mobileMenuOpen={mobileMenuOpen}
              setMobileMenuOpen={setMobileMenuOpen}
              onLogout={navigationHandlers.onLogout}
              navigationHandlers={navigationHandlers}
              getActiveProps={getActiveProps}
              routes={routes}
            />
          )
        : (
            <AuthSection
              isAuth={isAuth}
              onProfile={navigationHandlers.onProfile}
              onFavorites={navigationHandlers.onFavorites}
              onOrders={navigationHandlers.onOrders}
              onRegister={navigationHandlers.onRegister}
              getActiveProps={getActiveProps}
              routes={routes}
            />
          )}
    </Flex>
  );
}
