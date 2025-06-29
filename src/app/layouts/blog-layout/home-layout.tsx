import { Outlet } from 'react-router-dom'
import clsx from 'clsx'
import { Box, Container } from '@radix-ui/themes'
import { useGlobalScroll } from '@kernel/hooks'
import { Footer } from '@shared/components/layout'
import { Header } from '@modules/layout'
import styles from './home-layout.module.scss'

export function HomeLayout() {
  const { scrollY } = useGlobalScroll()

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
