import type { BoxProps } from '@radix-ui/themes';
import type { ReactNode } from 'react';

export interface StepperRootProperties {
  activeStep: number;
  completedSteps?: number[];
  direction?: 'row' | 'column';
  className?: string;
  children: React.ReactNode;
  gap?: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
}

export interface StepperStepProperties {
  index: number;
  label: string | ReactNode;
  description?: string | ReactNode;
  icon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export interface StepperConnectorProperties {
  to: number;
  className?: string;
}

export type StepperProgressProperties = {
  withLabels?: boolean;
} & BoxProps;
