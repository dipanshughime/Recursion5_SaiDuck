import React ,{useState,useEffect}from 'react'

const CarouselDefault = ({images}) => {  

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImageIndex = () =>{
    setCurrentImageIndex((currentImageIndex+1) % 1);
  }

  useEffect(() => {
    const interval = setInterval(nextImageIndex, 3000);
    console.log("changed");
    return () => clearInterval(interval);
  },[currentImageIndex])


  return (
    <div className="relative flex justify-center align-top mt-10">
    {images.map((image, index) => (
      <div
        key={index}
        className={`${
          index === currentImageIndex ? 'opacity-1' : 'opacity-0'
        } transition-property: opacity transition ease-in-out delay-50`}
      >
        {index === currentImageIndex && <img src={image.urls.raw} alt={`Image ${index}`} className="object-contain h-80 w-150 rounded-lg"/>}
        
      </div>
    ))}
  </div>
  );

}

export default CarouselDefault