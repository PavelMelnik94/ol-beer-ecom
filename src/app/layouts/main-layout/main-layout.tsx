import { useGlobalScroll } from '@kernel/hooks'
import { Header } from '@modules/common'
import { Box } from '@radix-ui/themes'
import { Footer } from '@shared/components/layout'
import clsx from 'clsx'
import { useLayoutEffect } from 'react'
import { Outlet } from 'react-router-dom'
import styles from './main-layout.module.scss'

export function MainLayout() {
  const { scrollY, scrollToTop } = useGlobalScroll()

  useLayoutEffect(() => scrollToTop(), [window.location.pathname]);

  const isFixedHeader = scrollY > 3

  return (
    <div className={clsx(styles.layout, { [styles.layoutWithScrollActive]: isFixedHeader })}>
      <Header isFixed={isFixedHeader} />
      <Box className={styles.decorativeBg} />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
