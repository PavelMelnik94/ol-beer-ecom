import { useGoTo } from '@kernel/hooks';
import { ROUTES, ThemeButton, useAuthStore } from '@kernel/index';
import { useAuth } from '@modules/auth';
import { CartButton } from '@modules/cart';
import { ButtonWithAuthPopup } from '@modules/common/ui/button-with-auth-popup';
import { Box, Button, Flex, IconButton, Popover, Separator, Text } from '@radix-ui/themes';
import { Show } from '@shared/components';
import { GithubButton } from '@shared/components/ui/github-button';
import clsx from 'clsx';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useLocation } from 'react-router-dom';
import { HeaderNav } from './header-nav';
import styles from './header.module.scss';

interface Props {
  isFixed?: boolean;
}

export function Header({ isFixed }: Props) {
  const { navigateToBlog, navigateToHome, navigateToBreweries, navigateToAbout, navigateToRegister, navigateToShowcase } = useGoTo();
  const { pathname } = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { logout } = useAuth();
  const isAuth = useAuthStore(s => s.isAuth);
  const isMobileLayout = useMediaQuery({
    query: '(max-width: 560px)',
  });

  const getActiveProps = (path: string) => ({
    'data-active': path === pathname ? 'true' : 'false',
    'className': clsx({ [styles.active]: pathname.includes(path) || pathname === path }),
  });

  const onClickHandlers = {
    onBlog: () => {
      navigateToBlog();
      setMobileMenuOpen(false);
    },
    onBreweries: () => {
      navigateToBreweries();
      setMobileMenuOpen(false);
    },
    onAbout: () => {
      navigateToAbout();
      setMobileMenuOpen(false);
    },
    onStore: () => {
      navigateToShowcase();
      setMobileMenuOpen(false);
    },
  };

  const AuthSectionMobile = isAuth
    ? (
        <>
          <Separator my="1" size="4" />
          <CartButton fullWidth />
        </>
      )
    : (
        <>
          <Separator my="1" size="4" />
          <Button variant="ghost" size="1" style={{ width: '100%' }}>
            Log in
          </Button>
          <Button
            variant="ghost"
            size="1"
            onClick={() => {
              navigateToRegister();
              setMobileMenuOpen(false);
            }}
            {...getActiveProps(ROUTES.auth.register.short)}
            style={{ width: '100%' }}
          >
            Register
          </Button>
        </>
      );

  const AuthSectionDesktop = isAuth
    ? (
        <Button
          variant="ghost"
          size="1"
          color="red"
          onClick={logout}
        >
          Log out
        </Button>
      )
    : (
        <>
          <ButtonWithAuthPopup variant="ghost" size="1">
            Log in
          </ButtonWithAuthPopup>
          <Button
            variant="ghost"
            size="1"
            onClick={navigateToRegister}
            {...getActiveProps(ROUTES.auth.register.short)}
          >
            Register
          </Button>
        </>
      );

  return (
    <header
      className={clsx(styles.header, {
        [styles.headerFixed]: isFixed,
      })}
    >
      <Box onClick={navigateToHome} className={styles.logo}>
        <Text as="span" size="7" weight="bold">
          ØL
        </Text>
      </Box>

      <Show when={!isMobileLayout}>
        <Flex align="center" gap="5" className={styles.desktopNav}>
          <HeaderNav getActiveProps={getActiveProps} onClickHandlers={onClickHandlers} />
        </Flex>
        <Flex align="center" gap="5" className={styles.desktopActions}>
          {isAuth && <CartButton />}
          {AuthSectionDesktop}
          <ThemeButton />
          <GithubButton />
        </Flex>
      </Show>

      <Show when={isMobileLayout}>
        <Flex direction="row" wrap="nowrap" gap="2">
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
                <HeaderNav getActiveProps={getActiveProps} onClickHandlers={onClickHandlers} fullWidth />

                {AuthSectionMobile}
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
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      style={{ width: '100%' }}
                    >
                      Log out
                    </Button>
                  </>
                )}
              </Flex>
            </Popover.Content>
          </Popover.Root>
        </Flex>
      </Show>
    </header>
  );
}
