import type { EmblaOptionsType } from 'embla-carousel';
import { Image } from '@shared/components/ui/image/image';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import React from 'react';
import '@shared/styles/carousel.css';

interface PropType {
  images: string[];
  options?: EmblaOptionsType;
  showSlideNumbers?: boolean;
  imgContainerClassName?: string;
}

export const Carousel: React.FC<PropType> = (props) => {
  const { images, imgContainerClassName, options, showSlideNumbers = false } = props;
  const [emblaRef] = useEmblaCarousel(options, [Autoplay()]);

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {images.map((img, index) => (
            <div className="embla__slide" key={index}>
              <Image
                src={img}
                alt={`${index}`}
                width="100%"
                height="auto"
                sizeMode="background"
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
