import React, {useEffect, useState} from "react";
import {t} from "./translations.ts";
import {ChevronLeft, ChevronRight} from "lucide-react";
import logo1 from "./../images/logos/logo_Mackay-1024x566.png?h=250&format=webp";
import logo2 from "./../images/logos/almaMater_negro-1024x192.png?h=250&format=webp";
import logo3 from "./../images/logos/cumLaude_negro-768x797.png?h=250&format=webp";
import logo4 from "./../images/logos/logoTora1-767x1024.png?h=250&format=webp";


export function TrustCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const logos = [
        logo1,
        logo2,
        logo3,
        logo4
    ];

    const totalSlides = Math.ceil(logos.length / 4);

    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % totalSlides);
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, totalSlides]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
        setIsAutoPlaying(false);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
        setIsAutoPlaying(false);
    };

    return (
        <div className="relative" onMouseEnter={() => setIsAutoPlaying(false)}
             onMouseLeave={() => setIsAutoPlaying(true)}>
            <div className="overflow-hidden relative">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{transform: `translateX(-${currentSlide * 100}%)`}}
                >
                    {Array.from({length: totalSlides}).map((_, slideIndex) => (
                        <div key={slideIndex} className="w-full flex-shrink-0">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-2">
                                {logos.slice(slideIndex * 4, (slideIndex + 1) * 4).map((logo, index) => (
                                    <div key={index}
                                         className="aspect-[3/2] rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow flex items-center justify-center">
                                        <img
                                            src={logo}
                                            alt={t('trustImageAlt')}
                                            className="object-scale-down w-full h-full w-auto"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pumpkin-orange"
                aria-label={t('carousel.prevSlide')}
            >
                <ChevronLeft className="w-6 h-6 text-pumpkin-orange"/>
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pumpkin-orange"
                aria-label={t('carousel.nextSlide')}
            >
                <ChevronRight className="w-6 h-6 text-pumpkin-orange"/>
            </button>

            <div className="flex justify-center gap-2 mt-6">
                {Array.from({length: totalSlides}).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setCurrentSlide(index);
                            setIsAutoPlaying(false);
                        }}
                        className={`w-2 h-2 rounded-full transition-all ${
                            currentSlide === index
                                ? 'bg-pumpkin-orange w-4'
                                : 'bg-black-30 hover:bg-pumpkin-orange-30'
                        }`}
                        aria-label={`${t('carousel.goToSlide')} ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}