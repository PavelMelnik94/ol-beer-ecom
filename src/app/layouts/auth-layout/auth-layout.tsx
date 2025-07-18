import { useGlobalScroll } from '@kernel/hooks';
import { Header, PromoCodeInfoDialog } from '@modules/common';
import { Box } from '@radix-ui/themes';
import { Footer } from '@shared/components';
import clsx from 'clsx';
import { Outlet } from 'react-router-dom';
import styles from './auth-layout.module.scss';

export function AuthLayout() {
  const { scrollY } = useGlobalScroll();

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
