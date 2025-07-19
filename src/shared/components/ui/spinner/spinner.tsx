import { animated, useSpring } from '@react-spring/web';
import React from 'react';
import styles from './spinner.module.scss';

interface SpinnerProperties {
  size?: number;
  thickness?: number;
  className?: string;
}

export const Spinner: React.FC<SpinnerProperties> = ({
  size = 40,
  thickness = 4,
  className,
}) => {
  const { rotate } = useSpring({
    from: { rotate: 0 },
    to: { rotate: 360 },
    loop: true,
    config: { duration: 950, tension: 100, friction: 8 },
  });

  return (
    <div
      className={`${styles.loader} ${className ?? ''}`}
      style={{ width: size, height: size }}
      role="status"
      aria-label="Loading..."
    >
      <animated.svg
        style={{ rotate }}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        <circle
          className={styles.circle}
          cx={size / 2}
          cy={size / 2}
          r={(size - thickness) / 2}
          strokeWidth={thickness}
          fill="none"
          strokeLinecap="round"
        />
      </animated.svg>
    </div>
  );
};
