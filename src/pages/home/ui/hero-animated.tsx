import { useGoTo } from '@kernel/index';
import { Box, Button, Flex, Heading, Section } from '@radix-ui/themes';
import { animated, config, useSpring } from '@react-spring/web';
import { Image, Show } from '@shared/components';
import { useMediaQuery } from '@shared/hooks';
import { useConfetti } from '@shared/hooks/use-confetti';
import JSConfetti from 'js-confetti';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styles from './hero-animated.module.scss';

interface ScrollAnimationState {
  progress: number;

  isComplete: boolean;

  direction: 0 | 1 | -1;
}

interface AnimationConfig {
  initialScale: number;

  maxScale: number;

  completionThreshold: number;
}

function splitTitle(title: string, word: string): { before: string; highlight: string; after: string; } {
  const wordIndex = title.indexOf(word);

  if (wordIndex !== -1) {
    return {
      before: title.slice(0, Math.max(0, wordIndex)),
      highlight: word,
      after: title.slice(Math.max(0, wordIndex + word.length)),
    };
  }

  return { before: title, highlight: '', after: '' };
}

const configInitial: AnimationConfig = {
  initialScale: 1,
  maxScale: 8,
  completionThreshold: 0.85,
};
function useScrollAnimation(
  config: AnimationConfig = configInitial,
): ScrollAnimationState {
  const [scrollState, setScrollState] = useState<ScrollAnimationState>({
    progress: 0,
    isComplete: false,
    direction: 0,
  });

  const previousScrollPosReference = useRef<number>(0);

  const throttle = useCallback(<T extends (...arguments_: unknown[]) => unknown>(
    function_: T,
    limit: number,
  ): ((...arguments_: Parameters<T>) => void) => {
    let lastCall = 0;
    return (...arguments_) => {
      const now = Date.now();
      if (now - lastCall >= limit) {
        lastCall = now;
        function_(...arguments_);
      }
    };
  }, []);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const previousScrollPos = previousScrollPosReference.current;

    const maxScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    if (maxScroll <= 0) return;

    const progress = Math.min(Math.max(scrollY / (maxScroll * 0.65), 0), 1);

    const direction = scrollY > previousScrollPos
      ? 1
      : (scrollY < previousScrollPos ? -1 : 0);

    previousScrollPosReference.current = scrollY;

    const isComplete = progress >= config.completionThreshold;

    setScrollState({
      progress,
      isComplete,
      direction,
    });
  }, [config.completionThreshold]);

  useEffect(() => {
    const throttledScroll = throttle(handleScroll, 16); // ~60fps
    window.addEventListener('scroll', throttledScroll, { passive: true });

    handleScroll();

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [handleScroll, throttle]);

  return scrollState;
}

export function AnimatedHero(): JSX.Element {
  const isColumnDirection = useMediaQuery('(max-width: 1100px)');

  const isMobile = useMediaQuery('(max-width: 576px)');

  const { navigateToShowcase } = useGoTo();

  const animationConfig = {
    initialScale: 1,
    maxScale: 8,
    completionThreshold: 0.85,
  };

  const scrollState = useScrollAnimation(animationConfig);

  const titleParts = useMemo(() => {
    return splitTitle('Your Guide to Liquid Gold', 'Gold');
  }, []);

  const goldSpring = useSpring({
    scale: 1 + scrollState.progress ** 1.5 * (animationConfig.maxScale - 1),
    blur: Math.min(scrollState.progress * 5, 5),
    opacity: scrollState.isComplete ? 0.4 : 1,
    config: {
      ...config.molasses,
      tension: 180,
      friction: 50,
      mass: 3,
    },
    immediate: scrollState.direction !== 0,
  });

  const backgroundSpring = useSpring({
    opacity: scrollState.progress > 0.7 ? Math.min((scrollState.progress - 0.7) * 10, 1) : 0,
    config: config.gentle,
    immediate: false,
  });

  const contentSpring = useSpring({
    opacity: scrollState.isComplete ? 1 : 0,
    transform: scrollState.isComplete ? 'translateY(0px)' : 'translateY(30px)',
    config: config.gentle,
    delay: scrollState.isComplete ? 200 : 0,
    immediate: false,
  });

  const buttonSpring = useSpring({
    opacity: scrollState.isComplete ? 1 : 0,
    transform: scrollState.isComplete ? 'translateY(0px)' : 'translateY(30px)',
    config: config.gentle,
    delay: scrollState.isComplete ? 300 : 0,
    immediate: false,
  });

  useEffect(() => {
    const jsConfetti = new JSConfetti();
    if (scrollState.isComplete) {
      if (window.innerWidth < 576 && typeof globalThis.navigator.vibrate === 'function') {
        globalThis.navigator.vibrate([100, 50, 100]);
      }
      jsConfetti.addConfetti({
        confettiNumber: 15,
        emojiSize: 55,

        emojis: ['🍺'],
      }).then(() => {
        jsConfetti.clearCanvas();
        jsConfetti.destroyCanvas();
      });
    }
    return () => {
      jsConfetti.clearCanvas();
      jsConfetti.destroyCanvas();
    };
  }, [scrollState.isComplete]);

  useConfetti({ playWhen: scrollState.isComplete, config: {
    confettiNumber: 15,
    emojiSize: 55,
    emojis: ['🍺'],
  } });

  return (
    <Section
      pb="0"
      pt={isMobile ? '7' : '9'}
      className={styles.heroSection}
    >
      <animated.div
        className={styles.colorBackground}
        style={{ opacity: backgroundSpring.opacity }}
      />

      <animated.div
        className={styles.goldHighlight}
        style={{
          transform: goldSpring.scale.to(s => `translate(-50%, -50%) scale(${s})`),
          filter: goldSpring.blur.to(b => `blur(${b}px)`),
          opacity: goldSpring.opacity,
        }}
      >
        {titleParts.highlight}
      </animated.div>

      <animated.div
        className={styles.contentContainer}
        style={contentSpring}
      >
        <Flex gap="2" direction={isColumnDirection ? 'column' : 'row'}>
          <Box>
            <Heading mb="2" size="9" align="center">
              {titleParts.before}
              <span className={styles.highlightedText}>{titleParts.highlight}</span>
              {titleParts.after}
            </Heading>
            <Heading mb="3" size="7" align="center">
              From Belgian abbeys to American craft breweries, explore curated reviews,
              brewing insights, and exclusive marketplace finds that elevate your beer experience.
            </Heading>
          </Box>
          <Show when={!isColumnDirection}>
            <Image src="/illustrations/u_beer.svg" alt="have a fun" width={800} />
          </Show>
        </Flex>
        <Flex justify="center" align="center" className={styles.buttonContainer}>
          <animated.div style={buttonSpring}>
            <Button size="2" onClick={navigateToShowcase}>Explore Now</Button>
          </animated.div>
        </Flex>

      </animated.div>

      <div className={`${styles.scrollIndicator} ${scrollState.isComplete ? styles.hidden : ''}`}>
        <span>Scroll Down</span>
        <div className={styles.arrow}></div>
      </div>
    </Section>
  );
}
