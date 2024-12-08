import { Link } from "react-router-dom";
import { ArrowRight } from 'lucide-react';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { A11y, Autoplay, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import s from "./MainSlider.module.scss";

const DUMMY_DATA = [
  {
    id: 1,
    carouselName: "Winter Collection",
    carouselImg: "https://img.freepik.com/free-photo/beautiful-hotel-insights-details_23-2149160786.jpg?t=st=1733637195~exp=1733640795~hmac=02d950a7ed63dbe52a6c5a5bb3855fbe7bdc4ff553f79520bff5893cc26ce0ec&w=1060",
    logoImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYeyQm4i6w5LA_z-9VEftVuP-BapD_ZphDtGoVwr_vZxK8wmxJ-jutMDLSrg3xMrBnKbw&usqp=CAU",
    discountText: "Up to 50% Off"
  },
  {
    id: 2,
    carouselName: "New Arrivals",
    carouselImg: "https://img.freepik.com/free-photo/faucet-sink_1203-2705.jpg?t=st=1733637223~exp=1733640823~hmac=43fb91511aa56de5030b5ad4c2e86f1e509175fd1b108152264c6027d76d8bcc&w=1060",
    logoImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYeyQm4i6w5LA_z-9VEftVuP-BapD_ZphDtGoVwr_vZxK8wmxJ-jutMDLSrg3xMrBnKbw&usqp=CAU",
    discountText: "Discover Latest Collection"
  },
  {
    id: 3,
    carouselName: "Special Offer",
    carouselImg: "https://img.freepik.com/free-vector/bathroom-realistic-interior-composition_1284-20812.jpg?t=st=1733637261~exp=1733640861~hmac=ecf3f64287bfea87baf49f27e7e43b1f153b34b168789c6a217a4ab84e8b5f3c&w=900",
    logoImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYeyQm4i6w5LA_z-9VEftVuP-BapD_ZphDtGoVwr_vZxK8wmxJ-jutMDLSrg3xMrBnKbw&usqp=CAU",
    discountText: "Limited Time Deals"
  }
];

const MainSlider = () => {
  return (
    <Swiper
      className={s.mainSlider}
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      loop={true}
      autoplay={{
        delay: 6000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      spaceBetween={0}
      slidesPerView={1}
      pagination={{ clickable: true }}
    >
      {DUMMY_DATA.map((slide) => (
        <SwiperSlide key={slide.id} className={s.slide}>
          <div className={s.backgroundContainer}>
            <img
              src={slide.carouselImg}
              alt="product preview"
              className={s.backgroundImage}
            />
          </div>
          
          <div className={s.content}>
            {/* <div className={s.logoContainer}>
              <img
                src={slide.logoImg}
                alt="market logo"
                className={s.logo}
              />
              <strong className={s.carouselName}>
                {slide.carouselName}
              </strong>
            </div> */}

            <h2 className={s.discountText}>
              {slide.discountText}
            </h2>

            <Link
              to="/products"
              className={s.shopNowLink}
            >
              <span className={s.shopNowText}>Shop Now</span>
              <ArrowRight className={s.arrowIcon} />
            </Link>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MainSlider;