import { Box, Flex, Link, Text } from '@radix-ui/themes';
import * as pckg from '../../../../../package.json';
import styles from './footer.module.scss';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Box className={styles.decorativeBg} />
      <Flex justify="center" align="center" direction="column" pt="6" className={styles.textContent}>

        <Flex gap="1">
          <Text size="2">
            Thank you very much for the illustrations
          </Text>

          <Text size="2">
            <Link
              href="https://undraw.co/"
              rel="noopener noreferrer"
              target="_blank"
            >
              undraw.co
            </Link>
          </Text>
        </Flex>

        <Flex gap="1">
          <Text size="2">
            All information on the site is for informational purposes only.
          </Text>
        </Flex>

        <Flex
          justify="center"
          align="end"
        >
          <Text
            size="2"
            weight="medium"
            align="center"
            mr="2"
          >
            v
            {pckg.version}
          </Text>

          <Text
            size="2"
            weight="medium"
            align="center"
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

      </Flex>

    </footer>
  );
}

Footer.displayName = 'Footer';
