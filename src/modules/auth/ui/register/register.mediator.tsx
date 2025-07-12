import { RegisterContainer } from '@modules/auth/ui/register/register-container/register-container';
import { Box, Container, Flex, Text } from '@radix-ui/themes';
import { Stepper } from '@shared/components/stepper';
import { LockIcon, Truck, UserIcon } from 'lucide-react';
import { useMediaQuery } from 'react-responsive';
import { useRegisterForm } from '../../hooks/use-register-form';
import styles from './register.module.scss';
import { AddressesStep } from './steps/addresses-step';
import { PersonalInfoStep } from './steps/personal-info-step';
import { SecurityStep } from './steps/security-step';

export function RegisterMediator() {
  const isColumn = useMediaQuery({ query: '(max-width: 1000px)' });
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
  } = useRegisterForm();

  return (
    <Container pr="5" pl="5">
      <Box className={styles.centered}>
        <Flex className={styles.flexContainer} direction={isColumn ? 'column' : 'row'} gap={isColumn ? '5' : '9'}>
          <Flex direction="column" className={styles.leftPart} mt={isColumn ? '5' : '0'}>
            <Text size="8" weight="bold" mb="2">Join Our Community</Text>
            <Text size="4" mb="4" color="gray">Create your account in just a few simple steps and unlock access to exclusive features.</Text>

            <Stepper.Root activeStep={step - 1} completedSteps={Array.from({ length: step - 1 }, (_, i) => i)} direction="column">

              <Stepper.Step
                index={0}
                label="Personal Information"
                description="Tell us about yourself"
                icon={<UserIcon />}
              />

              <Stepper.Step
                index={1}
                label="Shipping Details"
                description="Provide your shipping address"
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
          <Flex className={styles.rightPart} mb={isColumn ? '9' : '0'}>
            {step === 1 && (
              <RegisterContainer
                step={step}
                totalSteps={3}
                stepTitle="Personal Information"
                stepDescription="Tell us about yourself"
              >
                <PersonalInfoStep
                  personalInfo={personalInfo}
                  setPersonalInfo={setPersonalInfo}
                  onSubmit={nextStep}
                  step={step}
                  totalSteps={3}
                  onClickBack={prevStep}
                />
              </RegisterContainer>
            )}
            {step === 2 && (
              <RegisterContainer
                step={step}
                totalSteps={3}
                stepTitle="Shipping Details"
                stepDescription="Provide your shipping address"
              >

                <AddressesStep
                  addresses={addresses}
                  setAddresses={setAddresses}
                  onSubmit={nextStep}
                  step={step}
                  totalSteps={3}
                  onClickBack={prevStep}
                />
              </RegisterContainer>
            )}
            {step === 3 && (
              <RegisterContainer
                step={step}
                totalSteps={3}
                stepTitle="Account Security"
                stepDescription="Protect your account with a strong password"
              >
                <SecurityStep
                  security={security}
                  setSecurity={setSecurity}
                  onSubmit={submit}
                  step={step}
                  totalSteps={3}
                  onClickBack={prevStep}
                />
              </RegisterContainer>
            )}
          </Flex>
        </Flex>
      </Box>
    </Container>
  );
}
