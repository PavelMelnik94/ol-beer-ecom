import { ThemeButton } from '@kernel/index';
import { Avatar, Button, Flex, IconButton, Popover, Separator } from '@radix-ui/themes';
import { GithubButton } from '@shared/components/ui/github-button';
import styles from './header.module.scss';
import { AuthSection } from './auth-section';

interface UserMenuProps {
  user: any;
  isAuth: boolean;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  onLogout: () => void;
  navigationHandlers: any;
  getActiveProps: (path: string) => any;
  routes: any;
}

interface MenuContentProps {
  isAuth: boolean;
  onLogout: () => void;
  navigationHandlers: any;
  getActiveProps: (path: string) => any;
  routes: any;
}

function MenuContent({ isAuth, onLogout, navigationHandlers, getActiveProps, routes }: MenuContentProps) {
  return (
    <Flex direction="column" gap="3" align="start" style={{ minWidth: 100 }}>
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
    </Flex>
  );
}

export function UserMenu({
  user,
  isAuth,
  mobileMenuOpen,
  setMobileMenuOpen,
  onLogout,
  navigationHandlers,
  getActiveProps,
  routes,
}: UserMenuProps) {
  return (
    <Popover.Root open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
      <Popover.Trigger>
        <IconButton
          variant="ghost"
          size="1"
          aria-label="Open menu"
          className={styles.menuButton}
        >
          <Avatar
            src={user?.avatar || ''}
            radius="full"
            fallback="ØL"
            size="1"
          />
        </IconButton>
      </Popover.Trigger>
      <Popover.Content align="end" sideOffset={8}>
        <MenuContent
          isAuth={isAuth}
          onLogout={onLogout}
          navigationHandlers={navigationHandlers}
          getActiveProps={getActiveProps}
          routes={routes}
        />
      </Popover.Content>
    </Popover.Root>
  );
}
