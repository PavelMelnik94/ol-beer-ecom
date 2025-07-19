import { ThemeButton } from '@kernel/index';
import { Avatar, Button, Flex, IconButton, Popover, Separator, Text } from '@radix-ui/themes';
import { GithubButton } from '@shared/components/ui/github-button';
import { useHeaderContext } from '../context/header-context';
import styles from './header.module.scss';
import clsx from 'clsx';
import { AuthSection } from './auth-section';

function MenuContent() {
  const {
    user,
    isAuth,
    navigationHandlers,
  } = useHeaderContext();

  return (
    <Flex direction="column" gap="3" align="start" style={{ minWidth: 100 }}>
      {isAuth && user?.firstName && (
        <>
          <Flex align="center" justify="center" width="100%">
            <Text size="2" weight="medium">
              {user?.firstName}
            </Text>
          </Flex>
          <Separator size="4" />
        </>
      )}

      <AuthSection />
      <Separator my="1" size="4" />
      <ThemeButton withTitle style={{ width: '100%' }} />
      <GithubButton withTitle style={{ width: '100%' }} />
      {isAuth && (
        <>
          <Separator my="1" size="4" />
          <Button
            variant="ghost"
            size="1"
            onClick={navigationHandlers.onLogout}
            style={{ width: '100%' }}
          >
            Log out
          </Button>
        </>
      )}
    </Flex>
  );
}

export function UserMenu() {
  const {
    user,
    mobileMenuOpen,
    setMobileMenuOpen,
  } = useHeaderContext();

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
        <MenuContent />
      </Popover.Content>
    </Popover.Root>
  );
}

