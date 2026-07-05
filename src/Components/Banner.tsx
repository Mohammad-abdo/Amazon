import React from "react";
import Image from "next/image";
import slide_1 from "@/images/slide_1.jpg";
import slide_2 from "@/images/slide_2.jpg";
import slide_3 from "@/images/slide_3.jpg";
import slide_4 from "@/images/slide_4.jpg";
import slide_5 from "@/images/slide_5.jpg";
import slide_6 from "@/images/slide_6.jpg";
import slide_7 from "@/images/slide_7.jpg";
import { Carousel } from "react-responsive-carousel";

interface BannerProps {
  compact?: boolean;
}

const Banner = ({ compact = false }: BannerProps) => {
  const slides = [
    { image: slide_1, tag: "Tech Accessories", title: "Souqi Innovation", subtitle: "Redefine smart living with our advanced tech accessories catalog." },
    { image: slide_2, tag: "Premium Audio", title: "Immersive Sound", subtitle: "Re-engineered for ultimate comfort and crystal-clear acoustic fidelity." },
    { image: slide_3, tag: "Smart Wearables", title: "Wearable Luxury", subtitle: "Timeless smart watch aesthetics crafted for the modern professional." },
    { image: slide_4, tag: "Modern Gear", title: "Smart Connectivity", subtitle: "High-performance tablets and portable power tools for daily tasks." },
    { image: slide_5, tag: "Beauty & Style", title: "Organic Skincare", subtitle: "Unlock healthy, glowing skin with our premium organic cosmetic essentials." },
    { image: slide_6, tag: "Performance Tech", title: "Next-Gen Cooling", subtitle: "Silent, industrial-grade cooling solutions for advanced computer rigs." },
    { image: slide_7, tag: "Exclusive Deals", title: "Curated Selections", subtitle: "Get up to 40% off on top-selling global tech brands this week only." },
  ]

  return (
    <div className="relative overflow-hidden">
      <Carousel
        autoPlay 
        infiniteLoop
        showStatus={false}
        showIndicators={true}
        showThumbs={false}
        interval={4500}
        transitionTime={600}
        className="w-full"
      >
        {slides.map((slide, idx) => (
          <div key={idx} className={`relative w-full bg-brand-600 ${compact ? 'h-[32vh] md:h-[46vh] xl:h-[52vh] 2xl:h-[58vh]' : 'md:h-[70vh] h-[40vh]'}`}>
            <Image
              priority={idx === 0}
              src={slide.image}
              className="w-full h-full object-cover opacity-85"
              alt={slide.title}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-700/55 via-brand-500/25 to-transparent flex flex-col justify-center items-start px-6 md:px-20 text-left z-10">
              <span className="text-xs md:text-sm text-brand-100 font-bold uppercase tracking-widest mb-2">
                {slide.tag}
              </span>
              <h2 className={`font-extrabold text-white mb-3 max-w-xl leading-tight ${compact ? 'text-xl md:text-3xl' : 'text-2xl md:text-5xl'}`}>
                {slide.title}
              </h2>
              {!compact && (
                <p className="text-xs md:text-base text-brand-100 max-w-lg mb-6 leading-relaxed hidden sm:block">
                  {slide.subtitle}
                </p>
              )}
              <button className="h-9 md:h-11 px-5 md:px-7 bg-white text-brand-600 font-semibold text-xs md:text-sm rounded-full hover:bg-brand-50 active:scale-[0.98] transition-all duration-300 shadow-lg shadow-black/10 btn-brand-glow">
                Explore Collection
              </button>
            </div>
          </div>
        ))}
      </Carousel>
      <div className="w-full h-24 bg-gradient-to-t from-surface to-transparent absolute bottom-0 z-20"></div>
    </div>
  );
};

export default Banner;
