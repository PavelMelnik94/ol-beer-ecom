import clsx from 'clsx'
import { Box, Button, Flex, Text } from '@radix-ui/themes'
import { ThemeButton } from '@shared/components'
import styles from './header.module.scss'

interface Props {
  isActive?: boolean
}
export function Header({ isActive }: Props) {
  return (
    <header
      className={clsx(styles.header, {
        [styles.headerActive]: isActive,
      })}
    >
      <Box>
        <Text as="span" size="7" weight="bold">
          ØL
        </Text>
      </Box>

      <Flex align="center" gap="4">
        <Button variant="ghost" size="1">Store</Button>
        <Button variant="ghost" size="1">Breweries</Button>
        <Button variant="ghost" size="1">About</Button>
      </Flex>

      <Flex align="center" gap="4">
        <ThemeButton />
      </Flex>

    </header>
  )
}
