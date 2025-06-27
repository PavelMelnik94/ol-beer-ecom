import clsx from 'clsx'
import { Box, Button, Flex, Text } from '@radix-ui/themes'
import { Pulse } from '@shared/components'
import { GithubButton } from '@shared/components/ui/github-button'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@kernel/index'
import { ThemeButton } from '../theme-button'
import styles from './header.module.scss'

interface Props {
  isActive?: boolean
}
export function Header({ isActive }: Props) {
  const navigate = useNavigate()

  return (
    <header
      className={clsx(styles.header, {
        [styles.headerActive]: isActive,
      })}
    >
      <Box onClick={() => navigate(ROUTES.home.root)} className={styles.logo}>
        <Text as="span" size="7" weight="bold">
          ØL
        </Text>
      </Box>

      <Flex align="center" gap="4">

        <Button variant="ghost" size="1">
          Store
          <Pulse size={8} intensity={5} duration={1.5} />
        </Button>
        <Button variant="ghost" size="1">Breweries</Button>
        <Button variant="ghost" size="1">About</Button>
      </Flex>

      <Flex align="center" gap="4">
        <ThemeButton />
        <GithubButton />
      </Flex>

    </header>
  )
}
