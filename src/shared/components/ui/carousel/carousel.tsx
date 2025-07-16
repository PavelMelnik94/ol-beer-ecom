import type { EmblaOptionsType } from 'embla-carousel';
import { Image } from '@shared/components/ui/image/image';
import clsx from 'clsx';
import Autoplay from 'embla-carousel-autoplay';
import AutoScroll from 'embla-carousel-auto-scroll'
import useEmblaCarousel from 'embla-carousel-react';
import React from 'react';
import '@shared/styles/carousel.css';

interface PropType {
  images: string[];
  options?: EmblaOptionsType;
  showSlideNumbers?: boolean;
  imgContainerClassName?: string;
  emblaContainerClassName?: string;
  emblaSlideClassName?: string;
  height?: string;
  imageSizeMode?: 'background' | 'cover' | 'contain';
  slideChangeDelay?: number;
  changeStrategy?: 'autoscroll' | 'autoplay'
}

export const Carousel: React.FC<PropType> = (props) => {
  const {
    images,
    imgContainerClassName,
    emblaContainerClassName,
    emblaSlideClassName,
    options,
    showSlideNumbers = false,
    height = 'auto',
    imageSizeMode = 'background',
    slideChangeDelay = 3000,
    changeStrategy = 'autoplay'
  } = props;
  const [emblaRef] = useEmblaCarousel({
    ...options,
    loop: true,
  }, [
    Autoplay({
    delay: slideChangeDelay,
    playOnInit: changeStrategy === 'autoplay',
    active: changeStrategy === 'autoplay'
  }),
   AutoScroll({
    active: changeStrategy === 'autoscroll',
    playOnInit: changeStrategy === 'autoscroll' })
]);

  return (
    <section data-container className={clsx('embla', emblaContainerClassName)}>
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {images?.map((img, index) => (
            <div data-slide className={clsx('embla__slide', emblaSlideClassName)} key={index}>
              <Image
                src={img}
                alt={`${index}`}
                width="100%"
                height={height}
                sizeMode={imageSizeMode}
                containerClassName={imgContainerClassName}
                skeletonStyle={{ width: '100%', height: '100%' }}
              />
              {showSlideNumbers && (
                <div className="embla__slide__number">{index + 1}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
