import { useGoTo } from '@kernel/hooks';
import { Box, Flex, Heading, Section } from '@radix-ui/themes';
import { Image } from '@shared/components';
import { Alert } from '@shared/components/ui/alert/alert';
import { useConfetti } from '@shared/hooks';
import { useMediaQuery } from '@shared/hooks';
import clsx from 'clsx';
import { Beer } from 'lucide-react';
import { useEffect, useState } from 'react';
import styles from './register-congrats.module.scss';

interface RegisterCongratsProperties {
  onReset?: () => void;
}

export function RegisterCongrats({ onReset }: RegisterCongratsProperties) {
  const isColumnDirection = useMediaQuery('(max-width: 1100px)');
  const isMobile = useMediaQuery('(max-width: 576px)');

  const [countdown, setCountdown] = useState(7);
  const navigateToProfile = useGoTo().navigateToProfile;
  useConfetti({ playWhen: true });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown((previous) => {
        if (previous <= 1) {
          clearInterval(intervalId);
          onReset?.();
          navigateToProfile();
          return 0;
        }
        return previous - 1;
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [navigateToProfile, onReset]);

  return (
    <Section pt={isMobile ? '4' : '9'}>
      <Flex gap="4" direction="column" align="center">
        <Flex gap="2" direction={isColumnDirection ? 'column' : 'row'} align="center">
          <Box>
            <Heading mb="2" size="9" align="center">Congratulations on successful registration!</Heading>
            <Heading mb="3" size="7" align="center">Welcome to the world of craft beer! Discover unique flavors, explore brewery stories, and enjoy exclusive offers designed to enrich your beer journey.</Heading>
          </Box>
          <Image
            containerClassName={clsx({ [styles.imgContainer]: isColumnDirection })}
            src="/illustrations/u_congrats.svg"
            alt="congratulations on registration"
          />
        </Flex>

        <Alert icon={<Beer />}>
          Automatic redirect to store in
          {' '}
          {countdown}
          {' '}
          seconds...
        </Alert>
      </Flex>

    </Section>
  );
}
