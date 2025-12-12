import React from "react";
import Slider from "react-slick";
import { Link } from "react-router";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const HeroSlider = () => {
  const settings = {
    dots: true,           // show navigation dots
    infinite: true,       // loop slides
    speed: 800,           // slide transition speed
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,       // auto slide
    autoplaySpeed: 5000,  // 5 seconds per slide
    pauseOnHover: true,
  };

  const slides = [
    {
      title: "Learn Lessons",
      subtitle: "Improve learning skills and gather your knowledge.",
      buttonText: "Get Started",
      buttonLink: "/public-lessons",
      bgImage: "https://i.ibb.co.com/hxqCqXMq/ai-generated-8194612-640.jpg",
    },
    {
      title: "Build Real Lessons",
      subtitle: "Share your life lessons",
      buttonText: "Add Lessons",
      buttonLink: "/dashboard/add-lesson",
      bgImage: "https://i.ibb.co.com/zVYD64MX/compressed-2.jpg",
    },
    {
      title: "Upgrade Your Skills",
      subtitle: "Join our premium plans for exclusive lessons and mentorship.",
      buttonText: "See Pricing",
      buttonLink: "/dashboard/pricing",
      bgImage: "https://i.ibb.co.com/bg6KjLMV/1.png",
    },
  ];

  return (
    <div className="relative">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="h-[70vh] relative">
            <img
              src={slide.bgImage}
              alt={slide.title}
              className="h-full w-full object-cover brightness-60"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-start px-10 md:px-20 text-white">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">{slide.title}</h2>
              <p className="mb-6 text-lg md:text-xl">{slide.subtitle}</p>
              <Link
                to={slide.buttonLink}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold transition"
              >
                {slide.buttonText}
              </Link>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroSlider;
