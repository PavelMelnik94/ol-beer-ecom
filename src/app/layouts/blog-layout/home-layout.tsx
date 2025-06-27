import { Outlet } from 'react-router-dom'
import clsx from 'clsx'
import { Box, Container } from '@radix-ui/themes'
import { useGlobalScroll } from '@kernel/hooks'
import { Footer } from '@shared/components/layout'
import { Header } from '@kernel/components'
import styles from './home-layout.module.scss'

export function HomeLayout() {
  const { scrollY } = useGlobalScroll()

  const isActiveHeader = scrollY > 3

  return (
    <div className={clsx(styles.layout, { [styles.layoutWithScrollActive]: isActiveHeader })}>
      <Header isActive={isActiveHeader} />
      <Box className={styles.decorativeBg} />
      <main className={styles.main}>
        <Container pr="5" pl="5">
          <Outlet />
        </Container>
      </main>
      <Footer />
    </div>
  )
}
