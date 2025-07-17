import type { User } from '@kernel/types';
import { ROUTES } from '@kernel/router';
import { Button, Flex, Separator, Text } from '@radix-ui/themes';
import { Pulse } from '@shared/components';
import clsx from 'clsx';
import styles from './header.module.scss';

export function HeaderNav({
  getActiveProps,
  onClickHandlers,
  fullWidth = false,
  isAuth,
  user,
  isMobileLayout,
}: {
  getActiveProps: (path: string) => { [key: string]: string; };
  onClickHandlers: {
    onBlog: () => void;
    onBreweries: () => void;
    onAbout: () => void;
    onShowcase: () => void;
  };
  fullWidth?: boolean;
  isAuth: boolean;
  user: User;
  isMobileLayout?: boolean;
}) {
  const location = window.location.pathname;
  return (
    <>
      {isAuth && isMobileLayout && (
        <>
          <Flex align="center" justify="center" width="100%">
            <Text size="2" weight="medium">
              {user.firstName}
            </Text>

          </Flex>
          <Separator size="4" />
        </>
      )}

      <Button
        variant="ghost"
        size="1"
        onClick={onClickHandlers.onBlog}
        style={fullWidth ? { width: '100%' } : undefined}
        className={clsx({ [styles.fullWidth]: fullWidth })}
        {...getActiveProps(ROUTES.articles.root)}
      >
        Blog
      </Button>
      <Button
        variant="ghost"
        size="1"
        onClick={onClickHandlers.onShowcase}
        className={clsx({ [styles.fullWidth]: fullWidth })}
        style={fullWidth ? { width: '100%' } : undefined}
        {...getActiveProps(ROUTES.showcase.root)}
      >
        Showcase
        { !location.includes(ROUTES.showcase.root) && <Pulse size={8} intensity={5} duration={1.5} />}
      </Button>
      <Button
        variant="ghost"
        size="1"
        onClick={onClickHandlers.onBreweries}
        className={clsx({ [styles.fullWidth]: fullWidth })}
        style={fullWidth ? { width: '100%' } : undefined}
        {...getActiveProps(ROUTES.breweries.root)}
      >
        Breweries
      </Button>
      <Button
        variant="ghost"
        size="1"
        onClick={onClickHandlers.onAbout}
        className={clsx({ [styles.fullWidth]: fullWidth })}
        style={fullWidth ? { width: '100%' } : undefined}
        {...getActiveProps(ROUTES.about.root)}
      >
        About
      </Button>

    </>
  );
}
