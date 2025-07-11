import { useCallback } from 'react';
import { addressesSchema, personalInfoSchema, RegisterSchema, securitySchema } from '../model/schema';
import { useRegisterStore } from '../stores/register-store';

export type RegisterStep = 1 | 2 | 3;

export function useRegisterForm() {
  const {
    step,
    setStep,
    personalInfo,
    setPersonalInfo,
    addresses,
    setAddresses,
    security,
    setSecurity,
    reset,
  } = useRegisterStore();

  const validateStep = useCallback((step: RegisterStep) => {
    switch (step) {
      case 1:
        return personalInfoSchema.safeParse(personalInfo);
      case 2:
        return addressesSchema.safeParse(addresses);
      case 3:
        return securitySchema.safeParse(security);
      default:
        return { success: false, error: null };
    }
  }, [personalInfo, addresses, security]);

  const nextStep = useCallback(() => {
    if (step < 3) setStep(step + 1);
  }, [step, setStep]);

  const prevStep = useCallback(() => {
    if (step > 1) setStep(step - 1);
  }, [step, setStep]);

  const submit = useCallback(async () => {
    const result = RegisterSchema.safeParse({
      ...personalInfo,
      addresses,
      ...security,
    });
    if (!result.success) return result;
    // await registerApi(result.data)
    return result;
  }, [personalInfo, addresses, security]);

  return {
    step,
    setStep,
    personalInfo,
    setPersonalInfo,
    addresses,
    setAddresses,
    security,
    setSecurity,
    reset,
    validateStep,
    nextStep,
    prevStep,
    submit,
  };
}
