import { useGlobalScroll } from '@kernel/hooks';
import { animated, useSpring } from '@react-spring/web';
import clsx from 'clsx';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from './velocity-scroll.module.scss';

type Direction = 'left' | 'right';

interface MarqueeRowProperties {
  children: React.ReactNode;
  direction: Direction;
  speed: number;
}

const MarqueeRow: React.FC<MarqueeRowProperties> = ({
  children,
  direction,
  speed,
}) => {
  const containerReference = useRef<HTMLDivElement>(null);
  const contentReference = useRef<HTMLDivElement>(null);

  const [dimensions, setDimensions] = useState({
    contentWidth: 0,
    containerWidth: 0,
  });
  const [copies, setCopies] = useState(2);

  useEffect(() => {
    const measureSizes = () => {
      if (containerReference.current && contentReference.current) {
        const containerWidth = containerReference.current.offsetWidth;
        const contentWidth = contentReference.current.offsetWidth;

        setDimensions({
          containerWidth,
          contentWidth,
        });

        const neededCopies = Math.max(3, Math.ceil((containerWidth * 2) / (contentWidth || 1)));
        setCopies(neededCopies);
      }
    };

    measureSizes();

    window.addEventListener('resize', measureSizes);
    return () => {
      window.removeEventListener('resize', measureSizes);
    };
  }, [children]);

  const totalContentWidth = dimensions.contentWidth * copies;

  const { x } = useSpring({
    from: { x: direction === 'left' ? 0 : -totalContentWidth },

    to: { x: direction === 'left' ? -totalContentWidth : 0 },

    config: {
      duration: totalContentWidth * (10_000 / speed),
      easing: t => t,
    },

    loop: true,

    reset: false,

    immediate: dimensions.contentWidth === 0,
  });

  const contentItems = useMemo(() => {
    return Array.from({ length: copies }).map((_, index) => (
      <div key={index} className={styles.item}>
        {children}
      </div>
    ));
  }, [children, copies]);

  return (
    <div className={styles.row} ref={containerReference}>
      <div className={styles.measure} ref={contentReference}>
        <div className={styles.item}>
          {children}
        </div>
      </div>

      <animated.div
        className={styles.track}
        style={{ transform: x.to(value => `translateX(${value}px)`) }}
      >
        {contentItems}
        {contentItems}
      </animated.div>
    </div>
  );
};

interface VelocityScrollProperties {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  numRows?: number;
  rotateDeg?: number;
  onClick?: () => void;
  speedOnScrolling?: number;
}

export const VelocityScroll: React.FC<VelocityScrollProperties> = ({
  className,
  style,
  children,
  rotateDeg = 0,
  numRows: numberRows = 2,
  onClick,
  speedOnScrolling = 10,
}) => {
  const { scrollDirection, isScrolling } = useGlobalScroll();

  const [rowDirections, setRowDirections] = useState<Direction[]>(() =>
    Array.from({ length: numberRows }, (_, index) => index % 2 === 0 ? 'right' : 'left'),
  );

  useEffect(() => {
    if (!scrollDirection) return;

    const newDirections = [...rowDirections];

    for (let index = 0; index < numberRows; index++) {
      const baseDirection: Direction = index % 2 === 0 ? 'right' : 'left';

      if (scrollDirection === 'down') {
        newDirections[index] = baseDirection === 'right' ? 'left' : 'right';
      }
      else if (scrollDirection === 'up') {
        newDirections[index] = baseDirection;
      }
    }

    setRowDirections(newDirections);
  }, [scrollDirection, numberRows]);

  const baseSpeed = 500;
  const currentSpeed = isScrolling ? baseSpeed * speedOnScrolling : baseSpeed;

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
      {Array.from({ length: numberRows }).map((_, index) => (
        <MarqueeRow
          key={index}
          direction={rowDirections[index]}
          speed={currentSpeed}
        >
          {children}
        </MarqueeRow>
      ))}
    </div>
  );
};
