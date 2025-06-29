import React, { useEffect, useRef } from 'react';
import Marquee from 'react-fast-marquee';
import clsx from 'clsx';
import { useGlobalScroll } from '@kernel/hooks';
import styles from './velocity-scroll.module.scss';

type MarqueeDirection = 'left' | 'right';

interface VelocityScrollProps {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  numRows?: number;
  rotateDeg?: number;
  onClick?: () => void;
}

export const VelocityScroll: React.FC<VelocityScrollProps> = ({
  className,
  style,
  children,
  rotateDeg = 0,
  numRows = 2,
  onClick,
}) => {
  const { scrollDirection, isScrolling } = useGlobalScroll();

  const lastDirections = useRef<MarqueeDirection[]>(
    Array(numRows).fill(undefined),
  );

  useEffect(() => {
    for (let i = 0; i < numRows; i++) {
      const base: MarqueeDirection = i % 2 === 0 ? 'right' : 'left';
      if (scrollDirection === 'down') {
        lastDirections.current[i] = base === 'right' ? 'left' : 'right';
      }
      else if (scrollDirection === 'up') {
        lastDirections.current[i] = base;
      }
      if (!lastDirections.current[i]) {
        lastDirections.current[i] = base;
      }
    }
  }, [scrollDirection, numRows]);

  return (
    <div
      className={clsx(styles.root, className)}
      style={{
        ...style,
        transform: `rotate(${rotateDeg}deg)`,
      }}
      onClick={onClick}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? 'button' : undefined}
    >
      {Array.from({ length: numRows }).map((_, i) => (
        <Marquee
          key={i}
          gradient={false}
          speed={isScrolling ? 220 : 70}
          direction={lastDirections.current[i] || (i % 2 === 0 ? 'right' : 'left')}
          pauseOnHover={false}
          autoFill
          className={styles.row}
        >
          {children}
        </Marquee>
      ))}
    </div>
  );
};
