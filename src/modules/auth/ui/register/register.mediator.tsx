import { RegisterContainer } from '@modules/auth';
import { Box, Container, Flex, Text } from '@radix-ui/themes';
import { Stepper } from '@shared/components/stepper';
import { LockIcon, Truck, UserIcon } from 'lucide-react';
import { useMediaQuery } from 'react-responsive';
import styles from './register.module.scss';

export function RegisterMediator() {
  const isColumn = useMediaQuery({
    query: '(max-width: 1000px)',
  });
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
        <Flex className={styles.flexContainer} direction={isColumn ? 'column' : 'row'} gap="9">
          <Flex direction="column" className={styles.leftPart} mt={isColumn ? '5' : '0'}>
            <Text size="8" weight="bold" mb="2">
              Join Our Community
            </Text>

            <Text size="4" mb="4" color="gray">
              Create your account in just a few simple steps and unlock access to exclusive features.
            </Text>

            <Stepper.Root activeStep={activeStep} completedSteps={completedSteps} direction="column">
              <Stepper.Step
                index={0}
                label="Personal Information"
                description="Tell us about yourself"
                icon={<UserIcon />}
              />
              <Stepper.Step
                index={1}
                label="Shipping Details"
                description="Provide your shipping and billing address"
                icon={<Truck />}
              />

              <Stepper.Step
                index={2}
                label="Account Security"
                description="Protect your account with a strong password"
                icon={<LockIcon />}
              />
              <Stepper.Progress />
            </Stepper.Root>
          </Flex>

          <Flex className={styles.rightPart}>
            <RegisterContainer
              step={activeStep + 1}
              totalSteps={3}
              stepTitle={['Personal Information', 'Shipping Details', 'Account Security'][activeStep]}
              stepDescription={['Tell us about yourself', 'Provide your shipping and billing address', 'Protect your account with a strong password'][activeStep]}
              onClickBack={prev}
              onClickNext={next}
            />
          </Flex>
        </Flex>
      </Box>

    </Container>
  );
}
