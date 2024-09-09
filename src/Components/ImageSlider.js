import React, { useState, useEffect } from 'react';

export default function ImageSlider({ images, autoSlide = false , slideInterval = 3000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide effect when the `autoSlide` prop is true
  useEffect(() => {
    if (autoSlide) {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); // Increment index, loop back to start
      }, slideInterval);

      return () => clearInterval(timer); // Cleanup timer on component unmount
    }
  }, [autoSlide, slideInterval, images.length]);

  // Function to go to the next image
  const nextSlide = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  // Function to go to the previous image
  const prevSlide = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative mx-auto overflow-hidden rounded-lg">
      {/* Previous Slide Button */}
      <button 
        onClick={prevSlide} 
        className="absolute z-10 top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
      >
        ❮
      </button>
      
      {/* Sliding Images */}
      <div className="w-full h-full flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index}`}
            className="w-full h-full object-cover rounded-lg"
          />
        ))}
      </div>

      {/* Next Slide Button */}
      <button 
        onClick={nextSlide} 
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
      >
        ❯
      </button>
    </div>
  );
}
