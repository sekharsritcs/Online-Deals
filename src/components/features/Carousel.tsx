import React, { useState, useEffect, useCallback } from "react";

/**
 * Carousel component props
 */
interface CarouselProps {
  images: readonly string[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
}

/**
 * Image carousel component with auto-play and navigation controls
 */
const Carousel: React.FC<CarouselProps> = ({
  images,
  autoPlay = true,
  autoPlayInterval = 3000,
  className = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const prevSlide = useCallback((): void => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const nextSlide = useCallback((): void => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const goToSlide = useCallback((index: number): void => {
    setCurrentIndex(index);
  }, []);

  // Auto play effect
  useEffect(() => {
    if (!autoPlay || images.length === 0) return;

    const interval = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay, autoPlayInterval, nextSlide]);

  if (images.length === 0) {
    return null;
  }

  return (
    <div className={`relative w-full mx-auto overflow-hidden rounded-xl shadow-lg mt-2 ${className}`}>
      {/* Slides */}
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, index) => (
          <div key={`slide-${index}`} className="w-full shrink-0">
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-64 object-cover"
              loading={index === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>

      {/* Previous Button */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 hover:bg-opacity-100 transition"
        aria-label="Previous slide"
        type="button"
      >
        ‹
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 hover:bg-opacity-100 transition"
        aria-label="Next slide"
        type="button"
      >
        ›
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={`indicator-${index}`}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            type="button"
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
