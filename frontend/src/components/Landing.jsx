import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function LandingPage() {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: true,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="container overflow-hidden  mx-auto">
      <div className="mb-8">
        <Slider {...sliderSettings}>
          <div className="w-full h-screen flex items-center justify-center">
            <img
              src="https://images.pexels.com/photos/390051/surfer-wave-sunset-the-indian-ocean-390051.jpeg"
              alt="Imagen 1"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="w-full h-screen flex items-center justify-center">
            <img
              src="https://images.pexels.com/photos/9953820/pexels-photo-9953820.jpeg"
              alt="Imagen 2"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="w-full h-screen flex items-center justify-center">
            <img
              src="https://images.pexels.com/photos/2422264/pexels-photo-2422264.jpeg"
              alt="Imagen 3"
              className="object-cover w-full h-full"
            />
          </div>
        </Slider>
      </div>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        {[
          "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          "https://images.pexels.com/photos/8456325/pexels-photo-8456325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          "https://images.pexels.com/photos/7480083/pexels-photo-7480083.jpeg",
          "https://images.pexels.com/photos/4728051/pexels-photo-4728051.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        ].map((image, index) => (
          <div key={index} className="bg-gray-200 p-4">
            <img
              src={image}
              alt={`Imagen ${index}`}
              className="w-full h-48 object-cover" // Imágenes responsivas y de tamaño fijo
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default LandingPage;
