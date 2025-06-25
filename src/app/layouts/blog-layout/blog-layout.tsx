import { Outlet } from 'react-router-dom'
import { Header } from '@shared/components'
import clsx from 'clsx'
import { Box, Container } from '@radix-ui/themes'
import { useGlobalScroll } from '@shared/hooks'
import styles from './blog-layout.module.scss'

export function BlogLayout() {
  const { scrollY } = useGlobalScroll()

  const isActiveHeader = scrollY > 3

  return (
    <div className={clsx(styles.layout, { [styles.layoutWithScrollActive]: isActiveHeader })}>
      <Header isActive={isActiveHeader} />
      <Box className={styles.decorativeBg} />
      <main className={styles.main}>
        <Container>
          <Outlet />
        </Container>
      </main>
      <div style={{ height: '500px', background: 'lightblue' }}>footer</div>
    </div>
  )
}
