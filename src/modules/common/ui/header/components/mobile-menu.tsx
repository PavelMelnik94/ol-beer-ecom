import { ThemeButton } from '@kernel/index';
import { CartButton } from '@modules/cart';
import { Button, Flex, IconButton, Popover, Separator } from '@radix-ui/themes';
import { GithubButton } from '@shared/components/ui/github-button';
import { Menu } from 'lucide-react';
import { HeaderNav } from '../header-nav';
import styles from '../header.module.scss';
import { AuthSection } from './auth-section';

interface MobileSectionProps {
  isAuth: boolean;
  onLogout: () => void;
  navigationHandlers: any;
  getActiveProps: (path: string) => any;
  routes: any;
}

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

interface MobileMenuProps {
  isAuth: boolean;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  navigationHandlers: any;
  getActiveProps: (path: string) => any;
  routes: any;
}

export function MobileMenu({
  isAuth,
  mobileMenuOpen,
  setMobileMenuOpen,
  navigationHandlers,
  getActiveProps,
  routes,
}: MobileMenuProps) {
  return (
    <Flex direction="row" align="center" wrap="nowrap" gap="4">
      <CartButton />
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
              getActiveProps={getActiveProps}
              onClickHandlers={navigationHandlers}
              fullWidth
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
