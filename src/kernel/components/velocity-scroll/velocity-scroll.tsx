import React, { useEffect, useMemo, useRef, useState } from 'react';
import { animated, useSpring } from '@react-spring/web';
import clsx from 'clsx';
import { useGlobalScroll } from '@kernel/hooks';
import styles from './velocity-scroll.module.scss';

type Direction = 'left' | 'right';

interface MarqueeRowProps {
  children: React.ReactNode;
  direction: Direction;
  speed: number;
}

const MarqueeRow: React.FC<MarqueeRowProps> = ({
  children,
  direction,
  speed,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [dimensions, setDimensions] = useState({
    contentWidth: 0,
    containerWidth: 0,
  });
  const [copies, setCopies] = useState(2);

  useEffect(() => {
    const measureSizes = () => {
      if (containerRef.current && contentRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const contentWidth = contentRef.current.offsetWidth;

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
    return () => window.removeEventListener('resize', measureSizes);
  }, [children]);

  const totalContentWidth = dimensions.contentWidth * copies;

  const { x } = useSpring({
    from: { x: direction === 'left' ? 0 : -totalContentWidth },

    to: { x: direction === 'left' ? -totalContentWidth : 0 },

    config: {
      duration: totalContentWidth * (10000 / speed),
      easing: t => t,
    },

    loop: true,

    reset: false,

    immediate: dimensions.contentWidth === 0,
  });

  const contentItems = useMemo(() => {
    return Array.from({ length: copies }).map((_, idx) => (
      <div key={idx} className={styles.item}>
        {children}
      </div>
    ));
  }, [children, copies]);

  return (
    <div className={styles.row} ref={containerRef}>
      <div className={styles.measure} ref={contentRef}>
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

interface VelocityScrollProps {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  numRows?: number;
  rotateDeg?: number;
  onClick?: () => void;
  speedOnScrolling?: number;
}

export const VelocityScroll: React.FC<VelocityScrollProps> = ({
  className,
  style,
  children,
  rotateDeg = 0,
  numRows = 2,
  onClick,
  speedOnScrolling = 10,
}) => {
  const { scrollDirection, isScrolling } = useGlobalScroll();

  const [rowDirections, setRowDirections] = useState<Direction[]>(() =>
    Array.from({ length: numRows }, (_, i) => i % 2 === 0 ? 'right' : 'left'),
  );

  useEffect(() => {
    if (!scrollDirection) return;

    const newDirections = [...rowDirections];

    for (let i = 0; i < numRows; i++) {
      const baseDirection: Direction = i % 2 === 0 ? 'right' : 'left';

      if (scrollDirection === 'down') {
        newDirections[i] = baseDirection === 'right' ? 'left' : 'right';
      }
      else if (scrollDirection === 'up') {
        newDirections[i] = baseDirection;
      }
    }

    setRowDirections(newDirections);
  }, [scrollDirection, numRows]);

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
      {Array.from({ length: numRows }).map((_, i) => (
        <MarqueeRow
          key={i}
          direction={rowDirections[i]}
          speed={currentSpeed}
        >
          {children}
        </MarqueeRow>
      ))}
    </div>
  );
};
