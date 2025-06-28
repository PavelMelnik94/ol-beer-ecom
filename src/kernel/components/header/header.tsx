import clsx from 'clsx'
import { Box, Button, Flex, Text } from '@radix-ui/themes'
import { Pulse } from '@shared/components'
import { GithubButton } from '@shared/components/ui/github-button'
import { useLocation } from 'react-router-dom'
import { ROUTES } from '@kernel/index'
import { useGoTo } from '@kernel/hooks'
import { ThemeButton } from '../theme-button'
import styles from './header.module.scss'

interface Props {
  isActive?: boolean
}
export function Header({ isActive }: Props) {
  const { navigateToHome, navigateToBreweries, navigateToAbout, navigateToRegister } = useGoTo()
  const { pathname } = useLocation()

  const getActiveProps = (path: string) => {
    return {
      'data-active': path === pathname ? 'true' : 'false',
      'className': clsx({ [styles.active]: path === pathname }),
    }
  }
  return (
    <header
      className={clsx(styles.header, {
        [styles.headerActive]: isActive,
      })}
    >
      <Box onClick={navigateToHome} className={styles.logo}>
        <Text as="span" size="7" weight="bold">
          ØL
        </Text>
      </Box>

      <Flex align="center" gap="4">

        <Button
          variant="ghost"
          size="1"
          onClick={navigateToHome}
          {...getActiveProps(ROUTES.home.root)}
        >
          Blog
        </Button>
        <Button
          variant="ghost"
          size="1"
        >
          Store
          <Pulse size={8} intensity={5} duration={1.5} />
        </Button>
        <Button
          variant="ghost"
          size="1"
          onClick={navigateToBreweries}
          {...getActiveProps(ROUTES.breweries.root)}
        >
          Breweries
        </Button>
        <Button
          variant="ghost"
          size="1"
          onClick={navigateToAbout}
          {...getActiveProps(ROUTES.about.root)}
        >
          About
        </Button>
      </Flex>

      <Flex align="center" gap="4">
        <Button
          variant="ghost"
          size="1"
        >
          Log in
        </Button>
        <Button
          variant="ghost"
          size="1"
          onClick={navigateToRegister}
          {...getActiveProps(ROUTES.auth.register)}
        >
          Register
        </Button>
        <ThemeButton />
        <GithubButton />
      </Flex>

    </header>
  )
}
