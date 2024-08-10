import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper container
import { useCarouselStore } from "../../../store/useCarouselStore"; 
import SvgIcon from "../../Shared/MiniComponents/SvgIcon";
import s from "./IntroductionSlides.module.scss";

const IntroductionSlides = () => {
  const { carousels, fetchCarousels } = useCarouselStore((state) => ({
    carousels: state.carousels,
    fetchCarousels: state.fetchCarousels,
  }));
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCarousels().then(() => {
      setIsLoading(false); // Set loading to false once the data is fetched
    });
  }, [fetchCarousels]);

  if (isLoading || !carousels) {
    return <div>Loading...</div>; // Optionally, add a loading spinner or placeholder
  }

  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      loop={true} // Ensure the carousel loops
      autoplay={{ delay: 3000 }} // Add autoplay if needed
    >
      {Object.keys(carousels).map((id) => {
        const { carouselName, carouselImg, logoImg, discountText } =
          carousels[id];

        return (
          <SwiperSlide className={s.slide} key={id}>
            <img src={carouselImg} alt="product preview" />
            <div className={s.content}>
              <div className={s.nameProduct}>
                <img src={logoImg} alt="market logo" />
                <strong>{carouselName}</strong>
              </div>

              <h2 className={s.discount}>{discountText}</h2>

              <Link to="/products" className={s.shopNow}>
                <span>Shop Now</span>
                <SvgIcon name="arrowRightLong" />
              </Link>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default IntroductionSlides;
