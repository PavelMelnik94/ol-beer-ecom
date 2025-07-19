import type { StepperRootProps as StepperRootProperties } from './types';
import { Flex } from '@radix-ui/themes';
import { StepperContext } from '@shared/components/stepper/use-stepper';
import clsx from 'clsx';
import React, { useMemo } from 'react';
import styles from './stepper.module.scss';

export const StepperRoot: React.FC<StepperRootProperties> = React.memo(({ children, activeStep, completedSteps, direction = 'column', className, gap = '4' }) => {
  const value = useMemo(() => ({ activeStep, completedSteps, direction }), [activeStep, completedSteps, direction]);
  return (
    <StepperContext.Provider value={value}>
      <Flex
        direction={direction}
        className={clsx(styles.root, className)}
        data-layout={direction}
        gap={gap}
        wrap="wrap"
      >
        {children}
      </Flex>
    </StepperContext.Provider>
  );
});
