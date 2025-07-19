import { Logo } from '@kernel/components';
import { ThemeButton } from '@kernel/index';
import { CartButton } from '@modules/cart';
import { ButtonWithAuthPopup } from '@modules/common/ui/button-with-auth-popup';
import { useHeaderContext } from '@modules/common/ui/header/context/header-context';
import { Box, Button, Flex, IconButton, Popover, Separator } from '@radix-ui/themes';
import { Pulse } from '@shared/components';
import { GithubButton } from '@shared/components/ui/github-button';
import { Menu } from 'lucide-react';

export function MobileUnauthenticated() {
  const {
    navigationHandlers,
    mobileMenuOpen,
    setMobileMenuOpen,
    getActiveProps,
    routes,
    navigationHandlers: {
      onRegister,
      onBlog,
      onBreweries,
      onAbout,
      onShowcase,
    },
  } = useHeaderContext();

  const location = globalThis.location.pathname;

  return (
    <Flex direction="row" justify="between" align="center" wrap="nowrap" gap="4" flexGrow="1">
      <Box>
        <Logo />
      </Box>

      <Flex gap="4">
        <CartButton onClick={navigationHandlers.onBasket} />

        <Popover.Root open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <Popover.Trigger>
            <IconButton
              variant="ghost"
              size="1"
              aria-label="Open menu"
            >
              <Menu size={16} />
            </IconButton>
          </Popover.Trigger>
          <Popover.Content align="end" sideOffset={8}>
            <Flex direction="column" gap="3" align="start" style={{ minWidth: 100 }}>

              <Button
                variant="ghost"
                size="1"
                onClick={onBlog}
                style={{ width: '100%' }}
                {...getActiveProps(routes.articles.root)}
              >
                Blog
              </Button>
              <Button
                variant="ghost"
                size="1"
                onClick={onShowcase}
                style={{ width: '100%' }}
                {...getActiveProps(routes.showcase.root)}
              >
                Showcase
                { !location.includes(routes.showcase.root) && <Pulse size={8} intensity={5} duration={1.5} />}
              </Button>
              <Button
                variant="ghost"
                size="1"
                onClick={onBreweries}
                style={{ width: '100%' }}
                {...getActiveProps(routes.breweries.root)}
              >
                Breweries
              </Button>
              <Button
                variant="ghost"
                size="1"
                onClick={onAbout}
                style={{ width: '100%' }}
                {...getActiveProps(routes.about.root)}
              >
                About
              </Button>

              <Separator my="1" size="4" />

              <ButtonWithAuthPopup
                variant="ghost"
                size="1"
                style={{ width: '100%' }}
              >
                Log in
              </ButtonWithAuthPopup>

              <Button
                variant="ghost"
                size="1"
                onClick={onRegister}
                style={{ width: '100%' }}
                {...getActiveProps(routes.auth.register.full)}
              >
                Register
              </Button>

              <Separator my="1" size="4" />

              <ThemeButton withTitle style={{ width: '100%' }} />
              <GithubButton withTitle style={{ width: '100%' }} />

            </Flex>

          </Popover.Content>
        </Popover.Root>
      </Flex>
    </Flex>
  );
}
