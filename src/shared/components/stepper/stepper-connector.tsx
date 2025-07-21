import type { StepperConnectorProperties } from '@shared/components/stepper/types';
import { animated, useSpring } from '@react-spring/web';
import { useStepper } from '@shared/components/stepper/use-stepper';
import clsx from 'clsx';
import { memo } from 'react';
import styles from './stepper.module.scss';

export const StepperConnector: React.FC<StepperConnectorProperties> = memo(({ to, className }) => {
  const { activeStep } = useStepper();
  const isActive = activeStep >= to;
  const spring = useSpring({
    config: { tension: 200, friction: 18 },
  });
  return (
    <animated.div
      className={clsx(styles.connector, isActive && styles.connectorActive, className)}
      style={spring}
    />
  );
});
