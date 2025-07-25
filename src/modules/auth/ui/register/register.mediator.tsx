import { RegisterCongrats } from '@modules/auth/ui/register/register-congrats/register-congrats';
import { RegisterContainer } from '@modules/auth/ui/register/register-container/register-container';
import { PersonalInfoStep } from '@modules/auth/ui/register/steps/personal-info-step';
import { Box, Container, Flex, Text } from '@radix-ui/themes';
import { Stepper } from '@shared/components/stepper';
import { useMediaQuery } from '@shared/hooks';
import { LockIcon, Truck, UserIcon } from 'lucide-react';
import React, { Suspense } from 'react';
import { useRegisterForm } from '../../hooks/use-register-form';
import styles from './register.module.scss';

const AddressesStep = React.lazy(() => import('./steps/addresses-step').then(module => ({ default: module.AddressesStep })));
const SecurityStep = React.lazy(() => import('./steps/security-step').then(module => ({ default: module.SecurityStep })));

const STEPS_STATIC = [
  {
    label: 'Personal Information',
    description: 'Tell us about yourself',
    icon: <UserIcon />,
  },
  {
    label: 'Shipping Details',
    description: 'Provide your shipping address',
    icon: <Truck />,
  },
  {
    label: 'Account Security',
    description: 'Protect your account with a strong password',
    icon: <LockIcon />,
  },
] as const;

function getStepProperties(step: number) {
  if (step < 0 || step > STEPS_STATIC.length) {
    throw new Error(`Invalid step: ${step}`);
  }
  return STEPS_STATIC[step];
}

export function RegisterMediator() {
  const isColumn = useMediaQuery('(max-width: 1100px)');
  const {
    step,
    personalInfo,
    setPersonalInfo,
    addresses,
    setAddresses,
    security,
    setSecurity,
    nextStep,
    prevStep,
    submit,
    isRegisterFinish,
    resetForm,
  } = useRegisterForm();

  const lazyAddressesStep = (
    <Suspense fallback={<div />}>
      <AddressesStep
        addresses={addresses}
        setAddresses={setAddresses}
        onSubmit={nextStep}
        step={step}
        totalSteps={3}
        onClickBack={prevStep}
      />
    </Suspense>
  );

  const lazySecurityStep = (
    <Suspense fallback={<div />}>
      <SecurityStep
        security={security}
        setSecurity={setSecurity}
        onSubmit={submit}
        step={step}
        totalSteps={3}
        onClickBack={prevStep}
      />
    </Suspense>
  );

  return (
    <Container pr="5" pl="5">
      <Box className={styles.centered}>

        {isRegisterFinish && <RegisterCongrats onReset={resetForm} />}

        {!isRegisterFinish && (
          <Flex className={styles.flexContainer} direction={isColumn ? 'column' : 'row'} gap={isColumn ? '5' : '9'}>
            <Flex direction="column" className={styles.leftPart} mt={isColumn ? '5' : '0'}>
              <Text size="8" weight="bold" mb="2">Join Our Community</Text>
              <Text size="4" mb="4" color="gray">Create your account in just a few simple steps and unlock access to exclusive features.</Text>

              <Stepper.Root activeStep={step - 1} completedSteps={Array.from({ length: step - 1 }, (_, index) => index)} direction="column">
                <Stepper.Step index={0} {...getStepProperties(0)} />
                <Stepper.Step index={1} {...getStepProperties(1)} />
                <Stepper.Step index={2} {...getStepProperties(2)} />
                <Stepper.Progress />
              </Stepper.Root>

            </Flex>
            <Flex className={styles.rightPart} mb={isColumn ? '9' : '0'}>

              <RegisterContainer
                step={step}
                totalSteps={STEPS_STATIC.length}
                stepTitle={STEPS_STATIC[step - 1].label}
                stepDescription={STEPS_STATIC[step - 1].description}
              >
                {step === 1 && (
                  <PersonalInfoStep
                    personalInfo={personalInfo}
                    setPersonalInfo={setPersonalInfo}
                    onSubmit={nextStep}
                    step={step}
                    totalSteps={3}
                    onClickBack={prevStep}
                  />
                )}

                {step === 2 && lazyAddressesStep}

                {step === 3 && lazySecurityStep}

              </RegisterContainer>
            </Flex>
          </Flex>
        )}
      </Box>
    </Container>
  );
}
