import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from "react-i18next";
import LazyLoad from 'react-lazy-load';

export interface TrustCarouselProps {
    images?: {
        image: string,
        name: string
    }[]
}

const TrustCarousel: React.FC<TrustCarouselProps> = ({ images }) => {
  const { t } = useTranslation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [height, setHeight] = useState(0);
    const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
    
    const totalSlides = Math.ceil((images?.length || 0) / 4);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % totalSlides);
        }, 5000);

        return () => clearInterval(timer);
    }, [totalSlides]);

    useEffect(() => {
        const currentSlide = slidesRef.current[currentIndex];
        if (currentSlide) {
            setHeight(currentSlide.offsetHeight);
        }
    }, [currentIndex, images]);

    if (!images?.length) {
        return null;
    }

    return (
        <div className="relative w-full">
            <div className="relative" style={{ height: `${height}px` }}>
                {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                    <div
                        key={slideIndex}
                        ref={el => slidesRef.current[slideIndex] = el}
                        className={`absolute w-full transition-all duration-500 ease-in-out transform 
                            ${slideIndex === currentIndex ? 'opacity-100 translate-x-0' : 
                            slideIndex < currentIndex ? 'opacity-0 -translate-x-full' : 
                            'opacity-0 translate-x-full'}`}
                    >
                        <div className="mx-auto max-w-4xl bg-pure-white">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                {images?.slice(slideIndex * 4, (slideIndex + 1) * 4).map((logo, index) => (
                                    <div key={index}
                                        className="aspect-[3/2] rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow flex items-center justify-center p-4">
                                        <LazyLoad className="w-full h-full">
                                            <img
                                                src={logo.image}
                                                alt={logo.name}
                                                className="object-contain w-full h-full"
                                            />
                                        </LazyLoad>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-4 gap-2">
                {Array.from({ length: totalSlides }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 
                            ${index === currentIndex ? 
                            'bg-pumpkin-orange scale-125' : 
                            'bg-gray-300 hover:bg-gray-400'}`}
                        aria-label={`${t('Ir al slide')} ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}

export default TrustCarousel;