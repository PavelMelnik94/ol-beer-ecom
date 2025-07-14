import { Flex } from '@radix-ui/themes';
import { Show } from '@shared/components';
import clsx from 'clsx';
import { DesktopActions, Logo, MobileMenu } from './components';
import { HeaderNav } from './components/header-nav';
import styles from './components/header.module.scss';
import { useHeader } from './hooks/use-header';

interface Props {
  isFixed?: boolean;
}

export function Header({ isFixed }: Props) {
  const {
    user,
    isAuth,
    isMobileLayout,
    mobileMenuOpen,
    setMobileMenuOpen,
    getActiveProps,
    navigationHandlers,
    routes,
  } = useHeader();

  return (
    <header
      className={clsx(styles.header, {
        [styles.headerFixed]: isFixed,
      })}
    >
      <Logo onClick={navigationHandlers.onHome} />

      <Show when={!isMobileLayout}>
        <Flex align="center" gap="5" className={styles.desktopNav}>
          <HeaderNav getActiveProps={getActiveProps} onClickHandlers={navigationHandlers} />
        </Flex>
        <DesktopActions
          isAuth={isAuth}
          user={user}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          navigationHandlers={navigationHandlers}
          getActiveProps={getActiveProps}
          routes={routes}
        />
      </Show>

      <Show when={isMobileLayout}>
        <MobileMenu
          isAuth={isAuth}
          user={user!}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          navigationHandlers={navigationHandlers}
          getActiveProps={getActiveProps}
          routes={routes}
        />
      </Show>
    </header>
  );
}
