import { StepperConnector } from './stepper-connector';
import { StepperProgress } from './stepper-progress';
import { StepperRoot } from './stepper-root';
import { StepperStep } from './stepper-step';
import { useStepControl } from './use-step-control';

export type { StepperConnectorProperties, StepperProgressProperties, StepperRootProperties, StepperStepProperties } from './types';

export const Stepper = {
  Connector: StepperConnector,
  Progress: StepperProgress,
  Root: StepperRoot,
  Step: StepperStep,
  useStepControl,
};
