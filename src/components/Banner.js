import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import sliderImg_1 from "@/images/slider/sliderImg_1.jpg";
import sliderImg_2 from "@/images/slider/sliderImg_2.jpg";
import sliderImg_3 from "@/images/slider/sliderImg_3.jpg";
function Banner() {
  return (
    <div className="relative z-20">
      <Carousel
        infiniteLoop={true}
        autoPlay={true}
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
        swipeable={true}
      >
        <div>
          <Image src={sliderImg_1} alt="find gift for dad image" />
        </div>
        <div>
          <Image src={sliderImg_2} alt="ship products over world image" />
        </div>
        <div>
          <Image src={sliderImg_3} alt="beauty products image" />
        </div>
      </Carousel>
      <div className="absolute bottom-0 z-40 w-full h-40 bg-gradient-to-t from-gray-100 to-transparent"></div>
    </div>
  );
}

export default Banner;
