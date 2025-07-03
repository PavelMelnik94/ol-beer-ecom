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
  getActiveProps: (path: string) => { [key: string]: string; };
  onClickHandlers: {
    onBlog: () => void;
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
        onClick={onClickHandlers.onStore}
        className={clsx({ [styles.fullWidth]: fullWidth })}
        style={fullWidth ? { width: '100%' } : undefined}
        {...getActiveProps(ROUTES.showcase.root)}
      >
        Showcase
        <Pulse size={8} intensity={5} duration={1.5} />
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
  )
}
