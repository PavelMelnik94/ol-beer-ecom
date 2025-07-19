import type { StepperRootProps } from '@shared/components/stepper/types';
import { createContext, useContext } from 'react';

export const StepperContext = createContext<Omit<StepperRootProps, 'children'> | undefined>(undefined);

export function useStepper() {
  const context = useContext(StepperContext);
  if (!context) throw new Error('Stepper.* must be used within StepperRoot');
  return context;
}
