import { ThemeButton } from '@kernel/components';
import { useUserStore } from '@kernel/stores';
import { ButtonWithAuthPopup } from '@modules/common/ui/button-with-auth-popup';
import { useHeader } from '@modules/common/ui/header/hooks/use-header';
import { Badge, Button, Flex } from '@radix-ui/themes';

import { GithubButton } from '@shared/components/ui/github-button';
import { useHeaderContext } from '../context/header-context';

export function AuthSection() {
  const {
    isAuth,
    navigationHandlers: { onProfile, onFavorites, onOrders, onRegister },
    getActiveProps,
    routes,
  } = useHeaderContext();

  const { isMobileLayout } = useHeader();
  const buttonStyle = { width: '100%' };
  const favorites = useUserStore(s => s.favorites);

  if (isAuth) {
    return (
      <>
        <Button
          variant="ghost"
          size="1"
          style={buttonStyle}
          onClick={onProfile}
          {...getActiveProps(routes.profile.root)}
        >
          Profile
        </Button>
        <Button
          variant="ghost"
          size="1"
          style={buttonStyle}
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
          style={buttonStyle}
          onClick={onOrders}
          {...getActiveProps(routes.profile.orders.full)}
        >
          Orders
        </Button>
      </>
    );
  }

  return (
    <>
      <Flex justify="center" width="100%">
        <ButtonWithAuthPopup
          variant="ghost"
          size="1"
          style={buttonStyle}
        >
          Log in
        </ButtonWithAuthPopup>

      </Flex>
      <Button
        variant="ghost"
        size="1"
        onClick={onRegister}
        {...getActiveProps(routes.auth.register.full)}
        style={isMobileLayout ? buttonStyle : undefined}
      >
        Register
      </Button>

      {!isMobileLayout && (
        <>
          <ThemeButton />
          <GithubButton />
        </>
      )}
    </>
  );
}
