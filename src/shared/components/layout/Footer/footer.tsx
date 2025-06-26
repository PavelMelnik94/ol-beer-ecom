import { Box, Flex, Link, Text } from '@radix-ui/themes'
import styles from './footer.module.scss'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Box className={styles.decorativeBg} />
      <Flex
        justify="center"
        align="end"
        className={styles.textContent}
      >
        <Text
          size="2"
          weight="medium"
          align="center"
          style={{ marginBottom: '1rem' }}
        >
          ©
          {' '}
          {new Date().getFullYear()}
          {' '}
          Made with
          {' '}
          <span role="img" aria-label="love">❤️</span>
          {' '}
          by
          {' '}
          <Link
            href="https://github.com/PavelMelnik94"
            rel="noopener noreferrer"
            target="_blank"
          >
            me
          </Link>
        </Text>
      </Flex>

    </footer>
  )
}
