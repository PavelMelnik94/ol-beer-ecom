import type { StepperRootProperties } from '@shared/components/stepper/types';
import { createContext, useContext } from 'react';

export const StepperContext = createContext<Omit<StepperRootProperties, 'children'> | undefined>(undefined);

export function useStepper() {
  const context = useContext(StepperContext);
  if (!context) throw new Error('Stepper.* must be used within StepperRoot');
  return context;
}
