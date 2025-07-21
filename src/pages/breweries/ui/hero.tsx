import { Box, Flex, Heading, Section } from '@radix-ui/themes';
import { Image } from '@shared/components';
import { useMediaQuery } from '@shared/hooks';
import clsx from 'clsx';
import styles from './hero.module.scss';

export function Hero() {
  const isColumnDirection = useMediaQuery('(max-width: 1100px)');
  const isMobile = useMediaQuery('(max-width: 576px)');

  return (
    <Section pt={isMobile ? '4' : '9'}>
      <Flex gap="2" direction={isColumnDirection ? 'column' : 'row'}>
        <Box>
          <Heading mb="2" size="9" align="center">Brewery Insights & Inspirations</Heading>
          <Heading mb="3" size="7" align="center">Step inside iconic breweries, discover their unique stories, and access exclusive tours and recommendations designed to enrich your beer journey.</Heading>
        </Box>
        <Image
          containerClassName={clsx({ [styles.imgContainer]: isColumnDirection })}
          src="/illustrations/u_peoples.svg"
          alt="have a fun"
        />
      </Flex>

    </Section>
  );
}
