import React, { useMemo } from 'react';
import clsx from 'clsx';
import { ColorUtils } from '@shared/lib';
import styles from './pulse.module.scss';

interface PulseProps {
  color?: string;
  size?: number;
  intensity?: number;
  duration?: number;
  className?: string;
  disabled?: boolean;
}

export const Pulse: React.FC<PulseProps> = ({
  color = '#ff6b35',
  size = 20,
  intensity = 0.7,
  duration = 2,
  className = '',
  disabled = false,
}) => {
  const animationId = useMemo(() =>
    `pulse-${Math.random().toString(36).substr(2, 9)}`, []);

  React.useEffect(() => {
    if (disabled) return;

    const { r, g, b } = ColorUtils.hexToRgb(color);
    const spread = size * 0.5;

    const keyframes = `
      @keyframes ${animationId} {
        0% {
          transform: scale(0.95);
          box-shadow: 0 0 0 0 rgba(${r}, ${g}, ${b}, ${intensity});
        }
        70% {
          transform: scale(1);
          box-shadow: 0 0 0 ${spread}px rgba(${r}, ${g}, ${b}, 0);
        }
        100% {
          transform: scale(0.95);
          box-shadow: 0 0 0 0 rgba(${r}, ${g}, ${b}, 0);
        }
      }
    `;

    const styleElement = document.createElement('style');
    styleElement.textContent = keyframes;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, [color, size, intensity, duration, disabled, animationId]);

  const pulseStyles = useMemo(() => ({
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: color,
    animation: disabled ? 'none' : `${animationId} ${duration}s ease-out infinite`,
  }), [size, color, duration, disabled, animationId]);

  const pulseClasses = clsx(
    styles.pulse,
    {
      [styles.disabled]: disabled,
    },
    className,
  );

  return (
    <div
      className={pulseClasses}
      style={pulseStyles}
      role="status"
      aria-label="indicator"
    />
  );
};

Pulse.displayName = 'Pulse';
