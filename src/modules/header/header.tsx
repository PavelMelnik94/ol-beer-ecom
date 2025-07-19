import type { HeaderRenderMode } from '@modules/header/types';
import { DesktopAuthenticated } from '@modules/header/ui/states/desktop-authenticated';
import { DesktopUnauthenticated } from '@modules/header/ui/states/desktop-unauthenticated';
import { MobileAuthenticated } from '@modules/header/ui/states/mobile-authenticated';
import { MobileUnauthenticated } from '@modules/header/ui/states/mobile-unauthenticated';
import clsx from 'clsx';
import { HeaderProvider, useHeaderContext } from './context/header-context';
import styles from './header.module.scss';

interface Properties {
  isFixed?: boolean;
}

function HeaderContent({ isFixed }: Properties) {
  const { renderMode } = useHeaderContext();

  const headerVariants: { [key in HeaderRenderMode]: JSX.Element } = {
    'desktop-unauthenticated': <DesktopUnauthenticated />,
    'desktop-authenticated': <DesktopAuthenticated />,
    'mobile-unauthenticated': <MobileUnauthenticated />,
    'mobile-authenticated': <MobileAuthenticated />,
  };

  return (
    <header
      className={clsx(styles.header, {
        [styles.headerFixed]: isFixed,
      })}
    >
      {headerVariants[renderMode]}
    </header>
  );
}

export function Header({ isFixed }: Properties) {
  return (
    <HeaderProvider>
      <HeaderContent isFixed={isFixed} />
    </HeaderProvider>
  );
}
