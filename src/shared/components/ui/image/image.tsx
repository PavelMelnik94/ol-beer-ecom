import React, { useCallback, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Skeleton } from '@radix-ui/themes';
import { Show } from '@shared/components/utils/Show';
import styles from './image.module.scss';

type ImageLoadState = 'idle' | 'loading' | 'loaded' | 'error';
type ImageSizeMode = 'cover' | 'contain' | 'responsive'

interface ImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'onLoad' | 'onError'> {
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

export const Image: React.FC<ImageProps> = ({
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
  ...restProps
}) => {
  const [loadState, setLoadState] = useState<ImageLoadState>('idle');
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleLoad = useCallback((event: React.SyntheticEvent<HTMLImageElement>) => {
    setLoadState('loaded');
    onLoad?.(event);
  }, [onLoad]);

  const handleError = useCallback((event: React.SyntheticEvent<HTMLImageElement>) => {
    setLoadState('error');

    if (fallbackSrc && imgRef.current && imgRef.current.src !== fallbackSrc) {
      imgRef.current.src = fallbackSrc;
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
    if (!lazy || !imgRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            initializeLoading();
            observerRef.current?.disconnect();
          }
        });
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
      },
    );

    observerRef.current.observe(imgRef.current);

    return () => {
      observerRef.current?.disconnect();
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
  )

  const containerClassses = clsx(
    styles.container,
    {
      [styles.cover]: sizeMode === 'cover',
      [styles.contain]: sizeMode === 'contain',
      [styles.responsive]: sizeMode === 'responsive',
    },
    containerClassName,
  );

  return (
    <div className={containerClassses}>
      {placeholder && loadState !== 'loaded' && (
        <img
          src={placeholder}
          alt=""
          className={styles.placeholder}
          aria-hidden="true"
        />
      )}

      <img
        ref={imgRef}
        src={loadState === 'loading' || loadState === 'loaded' ? src : undefined}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={imageClasses}
        loading={lazy ? 'lazy' : 'eager'}

        {...restProps}
      />

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
