import { useRegister } from '@modules/auth/hooks/use-register';
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

  const register = useRegister();

  const validateStep = useCallback((step: RegisterStep) => {
    switch (step) {
      case 1:
        return personalInfoSchema.safeParse(personalInfo);
      case 2:
        return addressesSchema.safeParse({ addresses });
      case 3:
        return securitySchema.safeParse(security);
      default:
        return { success: false, error: null };
    }
  }, []);

  const nextStep = useCallback(() => {
    const { personalInfo: currentPersonalInfo, addresses: currentAddresses, security: currentSecurity } = useRegisterStore.getState();

    let validation;
    switch (step as RegisterStep) {
      case 1:
        validation = personalInfoSchema.safeParse(currentPersonalInfo);
        break;
      case 2:
        validation = addressesSchema.safeParse({ addresses: currentAddresses });
        break;
      case 3:
        validation = securitySchema.safeParse(currentSecurity);
        break;
      default:
        validation = { success: false, error: null };
    }

    if (validation.success && step < 3) {
      setStep(step + 1);
    }
  }, [step, setStep]);

  const prevStep = useCallback(() => {
    if (step > 1) setStep(step - 1);
  }, [step, setStep]);

  const submit = useCallback(async () => {
    const dataToValidate = {
      ...personalInfo,
      addresses,
      ...security,
    };

    const result = RegisterSchema.safeParse(dataToValidate);
    if (!result.success) {
      return result;
    }

    const { confirmPassword, ...userData } = result.data;
    await register.mutateAsync(userData);
    return result;
  }, [personalInfo, addresses, security, register]);

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
