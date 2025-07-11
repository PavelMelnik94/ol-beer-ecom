import { Box, Container, Flex, Text } from '@radix-ui/themes';
import { Stepper } from '@shared/components/stepper';
import { LockIcon, SettingsIcon, UserIcon } from 'lucide-react';
import styles from './register.module.scss';

export function RegisterMediator() {
  const { activeStep, completedSteps, next, prev } = Stepper.useStepControl({
    initialStep: 0,
    stepsCount: 3,
  });

  return (
    <Container
      pr="5"
      pl="5"
    >

      <Box className={styles.centered}>
        <Flex className={styles.flexContainer}>
          <Flex direction="column" className={styles.leftPart}>
            <Text size="8" weight="bold" mb="2">
              Join Our Community
            </Text>

            <Text size="4" mb="4" color="gray">
              Create your account in just a few simple steps and unlock access to exclusive features.
            </Text>

            <Stepper.Root activeStep={activeStep} completedSteps={completedSteps} direction="column">
              <Stepper.Step index={0} label="Personal Information" icon={<UserIcon />} />
              <Stepper.Step index={1} label="Account Security" description="Protect your account with a strong password" icon={<LockIcon />} />
              <Stepper.Step index={2} label="Preferences" icon={<SettingsIcon />} />
              <Stepper.Progress />
            </Stepper.Root>
          </Flex>

          <div className={styles.rightPart}>456</div>
        </Flex>
      </Box>

    </Container>
  );
}
