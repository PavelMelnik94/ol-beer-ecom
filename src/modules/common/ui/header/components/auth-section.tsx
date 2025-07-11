import { ThemeButton } from '@kernel/components';
import { ButtonWithAuthPopup } from '@modules/common/ui/button-with-auth-popup';
import { useHeader } from '@modules/common/ui/header/hooks/use-header';
import { Button, Flex } from '@radix-ui/themes';
import { GithubButton } from '@shared/components/ui/github-button';

interface AuthSectionProps {
  isAuth: boolean;
  onProfile: () => void;
  onFavorites: () => void;
  onOrders: () => void;
  onRegister: () => void;
  getActiveProps: (path: string) => any;
  routes: {
    profile: string;
    favorites: string;
    orders: string;
    register: string;
  };
  fullWidth?: boolean;
}

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
