import { Logo, ThemeButton } from '@kernel/components';
import { useUserStore } from '@kernel/stores';
import { CartButton } from '@modules/cart';
import { Avatar, Badge, Box, Button, Flex, IconButton, Popover, Separator, Text } from '@radix-ui/themes';
import { Pulse } from '@shared/components';
import { GithubButton } from '@shared/components/ui/github-button';
import { useHeaderContext } from '../../context/header-context'; // Corrected import path

export function DesktopAuthenticated() {
  const {
    routes,
    getActiveProps,
    mobileMenuOpen,
    setMobileMenuOpen,
    user,
    navigationHandlers: {
      onBlog,
      onShowcase,
      onBreweries,
      onAbout,
      onBasket,
      onLogout,
      onProfile,
      onFavorites,
      onOrders,
    },
  } = useHeaderContext();

  const location = globalThis.location.pathname;
  const favorites = useUserStore(s => s.favorites);

  return (
    <Flex align="center" justify="between" gap="5" flexGrow="1">

      <Box>
        <Logo />
      </Box>

      <Flex direction="row" gap="5" align="center">

        <Button
          variant="ghost"
          size="1"
          onClick={onBlog}
          {...getActiveProps(routes.articles.root)}
        >
          Blog
        </Button>

        <Button
          variant="ghost"
          size="1"
          onClick={onShowcase}
          {...getActiveProps(routes.showcase.root)}
        >
          Showcase
          { !location.includes(routes.showcase.root) && <Pulse size={8} intensity={5} duration={1.5} />}
        </Button>
        <Button
          variant="ghost"
          size="1"
          onClick={onBreweries}
          {...getActiveProps(routes.breweries.root)}
        >
          Breweries
        </Button>
        <Button
          variant="ghost"
          size="1"
          onClick={onAbout}
          {...getActiveProps(routes.about.root)}
        >
          About
        </Button>
      </Flex>

      <Flex align="center" gap="5">
        <CartButton onClick={onBasket} />

        <Popover.Root open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <Popover.Trigger>
            <IconButton
              variant="ghost"
              size="1"
              aria-label="Open menu"
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

              <ThemeButton withTitle style={{ width: '100%' }} />
              <GithubButton withTitle style={{ width: '100%' }} />

              <Separator my="1" size="4" />

              <Button
                variant="ghost"
                size="1"
                onClick={onLogout}
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
