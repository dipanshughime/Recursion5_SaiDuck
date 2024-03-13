import React, { useState, useEffect } from "react";

const CarouselDefault = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImageIndex = () => {
    setCurrentImageIndex((currentImageIndex + 1) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(nextImageIndex, 3000);
    console.log("changed");
    return () => clearInterval(interval);
  }, [currentImageIndex]);

  return (
    <div className="relative flex justify-center align-top mt-10">
      {images.map((image, index) => (
        <div
          key={index}
          className="
          w-150 h-80 object-cover rounded-lg bg-red-700
          "
        >
          {index === currentImageIndex && (
            <img
              src={image.urls.raw}
              alt={`${index}`}
              className="object-cover h-80 w-150 rounded-lg"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default CarouselDefault;
