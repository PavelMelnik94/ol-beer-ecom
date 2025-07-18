import { Flex } from '@radix-ui/themes';
import { Show } from '@shared/components';
import clsx from 'clsx';
import { DesktopActions, Logo, MobileMenu } from './components';
import { HeaderNav } from './components/header-nav';
import styles from './components/header.module.scss';
import { HeaderProvider, useHeaderContext } from './context/header-context';

interface Props {
  isFixed?: boolean;
}

function HeaderContent({ isFixed }: Props) {
  const { isMobileLayout } = useHeaderContext();

  return (
    <header
      className={clsx(styles.header, {
        [styles.headerFixed]: isFixed,
      })}
    >
      <Logo />

      <Show when={!isMobileLayout}>
        <Flex align="center" gap="5" className={styles.desktopNav}>
          <HeaderNav />
        </Flex>
        <DesktopActions />
      </Show>

      <Show when={isMobileLayout}>
        <MobileMenu />
      </Show>
    </header>
  );
}

export function Header({ isFixed }: Props) {
  return (
    <HeaderProvider>
      <HeaderContent isFixed={isFixed} />
    </HeaderProvider>
  );
}
