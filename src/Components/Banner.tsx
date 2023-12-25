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
const Banner = () => {
  return (
    <div className=" relative">
      <Carousel
       autoPlay 
       infiniteLoop
        showStatus={false}
         showIndicators={false}
         showThumbs={false}
         interval={2000}
      
      >
        <div>
          <Image priority src={slide_1} className="md:h-[90vh] h-[30vh]" alt="slider image"  />
 
        </div>
        <div>
        <Image src={slide_2} className="md:h-[90vh] h-[30vh]" alt="slider image" />


   
        </div>
        <div>
        <Image src={slide_3} className="md:h-[90vh] h-[30vh]" alt="slider image" />
        </div>
        <div>
        <Image src={slide_4} className="md:h-[90vh] h-[30vh]" alt="slider image" />
        </div>
        <div>
        <Image src={slide_5} className="md:h-[90vh] h-[30vh]" alt="slider image" />
        </div>
        <div>
        <Image src={slide_6} className="md:h-[90vh] h-[30vh]" alt="slider image" />
        </div>
        <div>
        <Image src={slide_7} className="md:h-[90vh] h-[30vh]" alt="slider image" />
        </div>
     
      </Carousel>
      <div className="w-full h-40 bg-gradient-to-t
       from-gray-100 to-transparent absolute bottom-0 z-20">

</div>
    </div>
  );
};

export default Banner;
