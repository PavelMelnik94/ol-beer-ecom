import { Outlet } from 'react-router-dom'
import clsx from 'clsx'
import { Box, Button, Container, Flex, Heading, Section } from '@radix-ui/themes'
import { useGlobalScroll } from '@kernel/hooks'
import { Header } from '@kernel/components'
import styles from './MainLayout.module.scss'

export function MainLayout() {
  const { scrollY } = useGlobalScroll()

  const isActiveHeader = scrollY > 3

  const heroContent = {
    headline: 'Your Guide to Liquid Gold',
    subheadline: 'From Belgian abbeys to American craft breweries, explore curated reviews, brewing insights, and exclusive marketplace finds that elevate your beer experience.',
    cta: 'Explore Now',
  } as const;

  return (
    <div className={clsx(styles.layout, { [styles.layoutWithScrollActive]: isActiveHeader })}>
      <Header isActive={isActiveHeader} />
      <Box className={styles.decorativeBg} />
      <main className={styles.main}>

        <Container>
          <Section>
            <Heading align="center" mb="4" size="9">{heroContent.headline}</Heading>
            <Heading align="center" mb="4" size="6">{heroContent.subheadline}</Heading>
            <Flex justify="center"><Button>{heroContent.cta}</Button></Flex>
          </Section>
          <Outlet />
        </Container>
      </main>
      <div>footer</div>
    </div>
  )
}
