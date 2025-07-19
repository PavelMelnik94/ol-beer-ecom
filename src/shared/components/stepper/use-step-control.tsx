import { useCallback, useMemo, useState } from 'react';

export interface UseStepControlOptions {
  initialStep?: number;
  stepsCount: number;
}

export function useStepControl({ initialStep = 0, stepsCount }: UseStepControlOptions) {
  const [activeStep, setActiveStep] = useState(initialStep);
  const completedSteps = useMemo(() => {
    return Array.from({ length: activeStep }, (_, index) => index);
  }, [activeStep]);

  const next = useCallback(() => {
    setActiveStep(previous => Math.min(previous + 1, stepsCount - 1));
  }, [stepsCount]);

  const previous = useCallback(() => {
    setActiveStep(previous_ => Math.max(previous_ - 1, 0));
  }, []);

  const goTo = useCallback((step: number) => {
    setActiveStep(Math.max(0, Math.min(step, stepsCount - 1)));
  }, [stepsCount]);

  return {
    activeStep,
    setActiveStep,
    completedSteps,
    next,
    prev: previous,
    goTo,
  };
}
