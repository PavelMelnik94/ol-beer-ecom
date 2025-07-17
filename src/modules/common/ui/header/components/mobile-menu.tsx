import type { MobileMenuProps, MobileSectionProps } from './header.types';
import { ThemeButton } from '@kernel/index';
import { CartButton } from '@modules/cart';
import { Button, Flex, IconButton, Popover, Separator } from '@radix-ui/themes';
import { GithubButton } from '@shared/components/ui/github-button';
import { Menu } from 'lucide-react';
import { AuthSection } from './auth-section';
import { HeaderNav } from './header-nav';

import styles from './header.module.scss';

function MobileSection({ isAuth, onLogout, navigationHandlers, getActiveProps, routes }: MobileSectionProps) {
  return (
    <>
      <Separator my="1" size="4" />
      <AuthSection
        isAuth={isAuth}
        onProfile={navigationHandlers.onProfile}
        onFavorites={navigationHandlers.onFavorites}
        onOrders={navigationHandlers.onOrders}
        onRegister={navigationHandlers.onRegister}
        getActiveProps={getActiveProps}
        routes={routes}
        fullWidth
      />
      <Separator my="1" size="4" />
      <ThemeButton withTitle style={{ width: '100%' }} />
      <GithubButton withTitle style={{ width: '100%' }} />
      {isAuth && (
        <>
          <Separator my="1" size="4" />
          <Button
            variant="ghost"
            size="1"
            color="red"
            onClick={onLogout}
            style={{ width: '100%' }}
          >
            Log out
          </Button>
        </>
      )}
    </>
  );
}

export function MobileMenu({
  isAuth,
  user,
  mobileMenuOpen,
  setMobileMenuOpen,
  navigationHandlers,
  getActiveProps,
  routes,
}: MobileMenuProps) {
  const navHandlers = {
    onBlog: navigationHandlers.onBlog,
    onBreweries: navigationHandlers.onBreweries,
    onAbout: navigationHandlers.onAbout,
    onShowcase: navigationHandlers.onShowcase,
  };
  return (
    <Flex direction="row" align="center" wrap="nowrap" gap="4">
      {isAuth && <CartButton onClick={navigationHandlers.onBasket} getActiveProps={getActiveProps} />}
      <Popover.Root open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <Popover.Trigger>
          <IconButton
            variant="ghost"
            size="1"
            aria-label="Open menu"
            className={styles.menuButton}
          >
            <Menu size={16} />
          </IconButton>
        </Popover.Trigger>
        <Popover.Content align="end" sideOffset={8}>
          <Flex direction="column" gap="3" align="start" style={{ minWidth: 100 }}>
            <HeaderNav
              isMobileLayout={true}
              getActiveProps={getActiveProps}
              onClickHandlers={navHandlers}
              fullWidth
              isAuth={isAuth}
              user={user}
            />
            <MobileSection
              isAuth={isAuth}
              onLogout={navigationHandlers.onLogout}
              navigationHandlers={navigationHandlers}
              getActiveProps={getActiveProps}
              routes={routes}
            />
          </Flex>
        </Popover.Content>
      </Popover.Root>
    </Flex>
  );
}
