import { useGlobalScroll } from '@kernel/hooks';
import { PromoCodeInfoDialog } from '@modules/common';
import { Header } from '@modules/header';
import { Box } from '@radix-ui/themes';
import { Footer } from '@shared/components';
import clsx from 'clsx';
import { useLayoutEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styles from './main-layout.module.scss';

export function MainLayout() {
  const { scrollY, scrollToTop } = useGlobalScroll();
  const location = useLocation();

  useLayoutEffect(() => scrollToTop(), [location.pathname]);

  const isFixedHeader = scrollY > 3;

  return (
    <div className={clsx(styles.layout, { [styles.layoutWithScrollActive]: isFixedHeader })}>
      <Header isFixed={isFixedHeader} />
      <Box className={styles.decorativeBg} />
      <main className={styles.main}>
        <PromoCodeInfoDialog />

        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
