import type { AuthSectionProps } from './header.types';
import { ThemeButton } from '@kernel/components';
import { useUserStore } from '@kernel/stores';
import { ButtonWithAuthPopup } from '@modules/common/ui/button-with-auth-popup';
import { useHeader } from '@modules/common/ui/header/hooks/use-header';
import { Badge, Button, Flex } from '@radix-ui/themes';

import { GithubButton } from '@shared/components/ui/github-button';

export function AuthSection({
  isAuth,
  onProfile,
  onFavorites,
  onOrders,
  onRegister,
  getActiveProps,
  routes,
  fullWidth = false,
}: AuthSectionProps) {
  const { isMobileLayout } = useHeader();
  const buttonStyle = fullWidth ? { width: '100%' } : {};
  const favorites = useUserStore(s => s.favorites);
  if (isAuth) {
    return (
      <>
        <Button
          variant="ghost"
          size="1"
          style={buttonStyle}
          onClick={onProfile}
          {...getActiveProps(routes.profile)}
        >
          Profile
        </Button>
        <Button
          variant="ghost"
          size="1"
          style={buttonStyle}
          onClick={onFavorites}
          {...getActiveProps(routes.favorites)}
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
          {...getActiveProps(routes.orders)}
        >
          Orders
        </Button>
      </>
    );
  }

  return (
    <>
      <Flex justify="center" width={fullWidth ? '100%' : undefined}>
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
        {...getActiveProps(routes.register)}
        style={buttonStyle}
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
