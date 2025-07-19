import { Logo } from '@kernel/components';
import { ThemeButton, useUserStore } from '@kernel/index';
import { CartButton } from '@modules/cart';
import { Badge, Box, Button, Flex, IconButton, Popover, Separator, Text } from '@radix-ui/themes';
import { Pulse } from '@shared/components';
import { GithubButton } from '@shared/components/ui/github-button';
import { Menu } from 'lucide-react';
import { useHeaderContext } from '../../context/header-context';

export function MobileAuthenticated() {
  const {
    navigationHandlers,
    mobileMenuOpen,
    setMobileMenuOpen,
    getActiveProps,
    user,
    routes,
    navigationHandlers: {
      onOrders,
      onFavorites,
      onProfile,
      onBlog,
      onBreweries,
      onAbout,
      onShowcase,
    },
  } = useHeaderContext();

  const location = globalThis.location.pathname;

  const favorites = useUserStore(s => s.favorites);

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

              <Flex align="center" justify="center" width="100%">
                <Text size="2" weight="medium">
                  {user?.firstName}
                </Text>
              </Flex>

              <Separator size="4" />

              <Button
                variant="ghost"
                size="1"
                style={{ width: '100%' }}
                onClick={onProfile}
                {...getActiveProps(routes.profile.root)}
              >
                Profile
              </Button>
              <Button
                variant="ghost"
                size="1"
                style={{ width: '100%' }}
                onClick={onFavorites}
                {...getActiveProps(routes.profile.favorites.full)}
              >
                Favorites
                {' '}
                {favorites?.length > 0 && <Badge size="1">{favorites?.length}</Badge>}
              </Button>
              <Button
                variant="ghost"
                size="1"
                style={{ width: '100%' }}
                onClick={onOrders}
                {...getActiveProps(routes.profile.orders.full)}
              >
                Orders
              </Button>

              <Separator my="1" size="4" />
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

              <ThemeButton withTitle style={{ width: '100%' }} />
              <GithubButton withTitle style={{ width: '100%' }} />

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

            </Flex>

          </Popover.Content>
        </Popover.Root>
      </Flex>
    </Flex>
  );
}
