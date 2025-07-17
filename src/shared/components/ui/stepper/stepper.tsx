import { Avatar, Flex, Text } from '@radix-ui/themes';
import { animated, useSpring } from '@react-spring/web';
import clsx from 'clsx';
import React, { useMemo } from 'react';
import styles from './stepper.module.scss';

export interface Step {
  label: string;
  icon?: React.ReactNode;
}

export interface StepperProps {
  steps: Step[];
  activeStep: number;
  completedSteps?: number[];
  className?: string;
}

export const Stepper: React.FC<StepperProps> = React.memo(({ steps, activeStep, completedSteps, className }) => {
  const progress = useMemo(() => ((activeStep + 1) / steps.length) * 100, [activeStep, steps.length]);
  const progressSpring = useSpring({ width: `${progress}%` });

  return (
    <div className={clsx(styles.stepper, className)}>
      {steps.map((step, idx) => (
        <Flex
          key={step.label}
          direction="column"
          align="center"
          className={clsx(
            styles.step,
            idx === activeStep && styles.active,
            completedSteps?.includes(idx) && styles.completed,
          )}
        >
          <Avatar size="4" fallback={step.label.charAt(0)}>
            {step.icon}
          </Avatar>
          <Text className={styles.label}>{step.label}</Text>
        </Flex>
      ))}
      <div className={styles.progressBar}>
        <animated.div className={styles.progress} style={progressSpring} />
      </div>
    </div>
  );
});
