import type { StepperStepProps as StepperStepProperties } from './types';
import { Flex, Text } from '@radix-ui/themes';
import clsx from 'clsx';
import React from 'react';
import styles from './stepper.module.scss';
import { useStepper } from './use-stepper';

export const StepperStep: React.FC<StepperStepProperties> = React.memo(({ index, label, description, icon, children, className }) => {
  const { activeStep, completedSteps } = useStepper();
  const isActive = index === activeStep;
  const isCompleted = completedSteps?.includes(index);

  return (
    <Flex direction="row" justify="start" align="start" className={clsx(className)}>

      {icon && (
        <Flex
          className={clsx(styles.stepIcon, { [styles.stepIconActive]: isActive || isCompleted })}
          justify="center"
          align="center"
          mr="2"
        >
          {icon}
        </Flex>
      )}

      <Flex direction="column" justify="center" align="start" flexGrow="1" height="100%">
        <Text size="3" weight={isActive || isCompleted ? 'medium' : 'regular'}>{label}</Text>
        {description && (<Text size="2" color="gray">{description}</Text>)}
      </Flex>

      {children}
    </Flex>
  );
});
