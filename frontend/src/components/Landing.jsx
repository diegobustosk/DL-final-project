import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";


function LandingPage() {

  const navigate = useNavigate();

  const navigateToCategory = (categoryId) => {
    navigate(`/products?category=${categoryId}`);
  };

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

  const slides = [
    {
      img: "https://images.pexels.com/photos/390051/surfer-wave-sunset-the-indian-ocean-390051.jpeg",
      alt: "Surf",
      text: "Ride the Waves",
    },
    {
      img: "https://images.pexels.com/photos/9953820/pexels-photo-9953820.jpeg",
      alt: "Wakeboard",
      text: "Wakeboard Adventures",
    },
    {
      img: "https://images.pexels.com/photos/2422264/pexels-photo-2422264.jpeg",
      alt: "Skateboard",
      text: "Skate the Streets",
    },
  ];


  const gridImages = [
    {
      categoryId: 1,
      url: "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Shirts",
    },
    {
      categoryId: 2,
      url: "https://images.pexels.com/photos/8456325/pexels-photo-8456325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Shorts",
    },
    {
      categoryId: 3,
      url: "https://images.pexels.com/photos/111085/pexels-photo-111085.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      description: "Boards",
    },
    {
      categoryId: 4,
      url: "https://images.pexels.com/photos/4728051/pexels-photo-4728051.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Towels",
    },
  ];

    return (
    <div className="container overflow-hidden mx-auto">
      <div className="mb-8">
        <Slider {...sliderSettings}>
          {slides.map((slide, index) => (
            <div key={index} className="w-full h-screen flex items-center justify-center relative">
              <img src={slide.img} alt={slide.alt} className="object-cover w-full h-full" />
              <div className="absolute text-white text-4xl font-bold p-5" style={{ bottom: '20%', left: '10%' }}>
                {slide.text}
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div className="grid m-4 md:grid-cols-2 grid-cols-1 gap-4">
  {gridImages.map((image, index) => (
    <div
      key={index}
      className="relative overflow-hidden cursor-pointer group"
      onClick={() => navigateToCategory(image.categoryId)}
    >
      <img
        src={image.url}
        alt={`Image ${index + 1}`}
        className="w-full h-48  object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end transition-opacity duration-500 ease-in-out group-hover:bg-opacity-70">
        <div className="w-full text-white text-center py-4 bg-gradient-to-t from-black to-transparent">
          <p className="font-semibold text-xl">{image.description}</p>
        </div>
      </div>
    </div>
  ))}
</div>
    </div>
  );
}

export default LandingPage;
