import { useCallback, useMemo, useState } from 'react';

export interface UseStepControlOptions {
  initialStep?: number;
  stepsCount: number;
}

export function useStepControl({ initialStep = 0, stepsCount }: UseStepControlOptions) {
  const [activeStep, setActiveStep] = useState(initialStep);
  const completedSteps = useMemo(() => {
    return Array.from({ length: activeStep }, (_, i) => i);
  }, [activeStep]);

  const next = useCallback(() => {
    setActiveStep(prev => Math.min(prev + 1, stepsCount - 1));
  }, [stepsCount]);

  const prev = useCallback(() => {
    setActiveStep(prev => Math.max(prev - 1, 0));
  }, []);

  const goTo = useCallback((step: number) => {
    setActiveStep(Math.max(0, Math.min(step, stepsCount - 1)));
  }, [stepsCount]);

  return {
    activeStep,
    setActiveStep,
    completedSteps,
    next,
    prev,
    goTo,
  };
}
