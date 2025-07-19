import { Logo, ThemeButton } from '@kernel/components';
import { ButtonWithAuthPopup } from '@modules/common/ui/button-with-auth-popup';
import { useHeaderContext } from '@modules/header/context/header-context';
import { Box, Button, Flex } from '@radix-ui/themes';
import { Pulse } from '@shared/components';
import { GithubButton } from '@shared/components/ui/github-button';

export function DesktopUnauthenticated() {
  const {
    getActiveProps,
    routes,
    navigationHandlers: {
      onRegister,
      onBlog,
      onShowcase,
      onBreweries,
      onAbout,
    },
  } = useHeaderContext();

  const location = globalThis.location.pathname;

  return (
    <Flex align="center" justify="between" flexGrow="1" gap="5">
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

      <Flex direction="row" gap="5" align="center">
        <ButtonWithAuthPopup
          variant="ghost"
          size="1"
        >
          Log in
        </ButtonWithAuthPopup>

        <Button
          variant="ghost"
          size="1"
          onClick={onRegister}
          {...getActiveProps(routes.auth.register.full)}
        >
          Register
        </Button>

        <ThemeButton />
        <GithubButton />
      </Flex>
    </Flex>
  );
}
