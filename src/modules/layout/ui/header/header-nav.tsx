import { ROUTES } from '@kernel/router';
import { Button } from '@radix-ui/themes';
import { Pulse } from '@shared/components';
import clsx from 'clsx';
import styles from './header.module.scss';

export function HeaderNav({
  getActiveProps,
  onClickHandlers,
  fullWidth = false,
}: {
  getActiveProps: (path: string) => { [key: string]: string };
  onClickHandlers: {
    onHome: () => void;
    onBreweries: () => void;
    onAbout: () => void;
    onStore: () => void;
  };
  fullWidth?: boolean;
}) {
  return (
    <>
      <Button
        variant="ghost"
        size="1"
        onClick={onClickHandlers.onHome}
        {...getActiveProps(ROUTES.home.root)}
        className={clsx({ [styles.fullWidth]: fullWidth })}
        style={fullWidth ? { width: '100%' } : undefined}
      >
        Blog
      </Button>
      <Button
        variant="ghost"
        size="1"
        onClick={onClickHandlers.onStore}
        className={clsx({ [styles.fullWidth]: fullWidth })}
        style={fullWidth ? { width: '100%' } : undefined}
      >
        Store
        <Pulse size={8} intensity={5} duration={1.5} />
      </Button>
      <Button
        variant="ghost"
        size="1"
        onClick={onClickHandlers.onBreweries}
        {...getActiveProps(ROUTES.breweries.root)}
        className={clsx({ [styles.fullWidth]: fullWidth })}
        style={fullWidth ? { width: '100%' } : undefined}
      >
        Breweries
      </Button>
      <Button
        variant="ghost"
        size="1"
        onClick={onClickHandlers.onAbout}
        {...getActiveProps(ROUTES.about.root)}
        className={clsx({ [styles.fullWidth]: fullWidth })}
        style={fullWidth ? { width: '100%' } : undefined}
      >
        About
      </Button>

    </>
  )
}
