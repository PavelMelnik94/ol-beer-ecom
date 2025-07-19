import { Skeleton } from '@radix-ui/themes';
import { Show } from '@shared/components/utils/Show';
import clsx from 'clsx';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './image.module.scss';

type ImageLoadState = 'idle' | 'loading' | 'loaded' | 'error';
type ImageSizeMode = 'cover' | 'contain' | 'responsive' | 'background';

interface ImageProperties extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'onLoad' | 'onError'> {
  src: string;
  alt: string;
  placeholder?: string;
  showLoader?: boolean;
  lazy?: boolean;
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
  onError?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
  className?: string;
  fallbackSrc?: string;
  blurOnLoad?: boolean;
  sizeMode?: ImageSizeMode;
  width?: number | string;
  height?: number | string;
  containerClassName?: string;
  skeletonStyle?: React.CSSProperties;
}

export const Image: React.FC<ImageProperties> = ({
  src,
  alt,
  placeholder,
  showLoader = true,
  lazy = true,
  onLoad,
  onError,
  className,
  containerClassName,
  fallbackSrc,
  blurOnLoad = true,
  sizeMode = 'cover',
  width,
  height,
  skeletonStyle,
  ...restProperties
}) => {
  const [loadState, setLoadState] = useState<ImageLoadState>('idle');
  const imgReference = useRef<HTMLImageElement>(null);
  const observerReference = useRef<IntersectionObserver | null>(null);

  const handleLoad = useCallback((event: React.SyntheticEvent<HTMLImageElement>) => {
    setLoadState('loaded');
    onLoad?.(event);
  }, [onLoad]);

  const handleError = useCallback((event: React.SyntheticEvent<HTMLImageElement>) => {
    setLoadState('error');

    if (fallbackSrc && imgReference.current && imgReference.current.src !== fallbackSrc) {
      imgReference.current.src = fallbackSrc;
      setLoadState('loading');
      return;
    }

    onError?.(event);
  }, [fallbackSrc, onError]);

  const initializeLoading = useCallback(() => {
    if (loadState === 'idle') {
      setLoadState('loading');
    }
  }, [loadState]);

  useEffect(() => {
    if (!lazy || !imgReference.current) return;

    observerReference.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            initializeLoading();
            observerReference.current?.disconnect();
          }
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
      },
    );

    observerReference.current.observe(imgReference.current);

    return () => {
      observerReference.current?.disconnect();
    };
  }, [lazy, initializeLoading]);

  useEffect(() => {
    if (!lazy) {
      initializeLoading();
    }
  }, [lazy, initializeLoading]);

  const imageClasses = clsx(
    styles.image,
    className,
    {
      [styles.blurred]: loadState === 'loading' && blurOnLoad,
      [styles.loaded]: loadState === 'loaded',
      [styles.error]: loadState === 'error',

    },
  );

  const containerClassses = clsx(
    styles.container,
    {
      [styles.cover]: sizeMode === 'cover',
      [styles.contain]: sizeMode === 'contain',
      [styles.responsive]: sizeMode === 'responsive',
      [styles.background]: sizeMode === 'background',
    },
    containerClassName,
  );

  return (
    <div
      className={containerClassses}
      style={{
        backgroundImage: sizeMode === 'background' ? `url(${src})` : undefined,
        width,
        height,
      }}
    >
      {placeholder && loadState !== 'loaded' && (
        <img
          src={placeholder}
          alt=""
          className={styles.placeholder}
          aria-hidden="true"
        />
      )}

      {sizeMode !== 'background' && (
        <img
          ref={imgReference}
          src={loadState === 'loading' || loadState === 'loaded' ? src : undefined}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={imageClasses}
          loading={lazy ? 'lazy' : 'eager'}

          {...restProperties}
        />
      )}

      <Show when={loadState === 'loading' && showLoader}>
        <Skeleton style={skeletonStyle} />
      </Show>

      <Show when={loadState === 'error'}>
        <Skeleton style={skeletonStyle} />
      </Show>

    </div>
  );
};

Image.displayName = 'Image';
