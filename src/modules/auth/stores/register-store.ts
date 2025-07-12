import type { Address } from '@kernel/types';
import type { PersonalInfo, SecurityInfo } from '@modules/auth/model/types';
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export interface RegisterFormState {
  step: number;
  personalInfo: PersonalInfo;
  addresses: Address[];
  security: SecurityInfo;
  setStep: (step: number) => void;
  setPersonalInfo: (data: Partial<PersonalInfo>) => void;
  setAddresses: (addresses: Address[]) => void;
  setSecurity: (data: Partial<SecurityInfo>) => void;
  reset: () => void;
}

export const useRegisterStore = create<RegisterFormState>()(
  subscribeWithSelector(set => ({
    step: 1,
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
    },
    addresses: [],
    security: {
      password: '',
      confirmPassword: '',
    },
    setStep: step => set({ step }),
    setPersonalInfo: data => set(state => ({ personalInfo: { ...state.personalInfo, ...data } })),
    setAddresses: addresses => set({ addresses }),
    setSecurity: data => set(state => ({ security: { ...state.security, ...data } })),
    reset: () => set({
      step: 1,
      personalInfo: { firstName: '', lastName: '', email: '' },
      addresses: [],
      security: { password: '', confirmPassword: '' },
    }),
  })),
);
