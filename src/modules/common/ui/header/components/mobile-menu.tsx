import { ThemeButton } from '@kernel/index';
import { CartButton } from '@modules/cart';
import { Button, Flex, IconButton, Popover, Separator } from '@radix-ui/themes';
import { GithubButton } from '@shared/components/ui/github-button';
import { Menu } from 'lucide-react';
import { useHeaderContext } from '../context/header-context';
import { AuthSection } from './auth-section';
import { HeaderNav } from './header-nav';

import styles from './header.module.scss';

function MobileSection() {
  const {
    navigationHandlers,
    isAuth,
  } = useHeaderContext();

  return (
    <>
      <Separator my="1" size="4" />
      <AuthSection />
      <Separator my="1" size="4" />
      <ThemeButton withTitle style={{ width: '100%' }} />
      <GithubButton withTitle style={{ width: '100%' }} />

      {isAuth && (
        <>
          {' '}
          <Separator my="1" size="4" />
          <Button
            variant="ghost"
            size="1"
            color="red"
            onClick={navigationHandlers.onLogout}
            style={{ width: '100%' }}
          >
            Log out
          </Button>
        </>
      )}
    </>
  );
}

export function MobileMenu() {
  const {
    navigationHandlers,
    mobileMenuOpen,
    setMobileMenuOpen,
  } = useHeaderContext();

  return (
    <Flex direction="row" align="center" wrap="nowrap" gap="4">
      <CartButton onClick={navigationHandlers.onBasket} />
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
            <HeaderNav />
            <MobileSection />
          </Flex>
        </Popover.Content>
      </Popover.Root>
    </Flex>
  );
}
