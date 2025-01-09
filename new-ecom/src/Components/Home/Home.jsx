import { Helmet } from "react-helmet-async";
import CategoriesSection from "./CategoriesSection/CategoriesSection";
import FeaturedSection from "./FeaturedSection/FeaturedSection";
import s from "./Home.module.scss";
import MainSlider from "./Introduction/MainSlider";
import SectionsMenu from "./Introduction/SectionsMenu";
import OurProductsSection from "./OurProductsSection/OurProductsSection";
import ProductPoster from "./ProductPoster/ProductPoster";
import ThisMonthSection from "./ThisMonthSection/ThisMonthSection";
import TodaySection from "./TodaySection/TodaySection";
import useScrollOnMount from "../../Hooks/App/useScrollOnMount";
import FeaturedProductsSection from "./FeaturedProductSection/FeaturedProductSectoion";

const Home = () => {
  useScrollOnMount(0)

  return (
    <>
      <Helmet>
        <title>Acquaso</title>
      </Helmet>

      <div className={s.home}>
        <div className={s.container}>
          <div className={s.introductionContainer}>
            {/* <SectionsMenu /> */}

            {/* <div className={s.line}></div> */}

            <MainSlider />
          </div>

          {/* <TodaySection /> */}
          <CategoriesSection />
          {/* <ThisMonthSection /> */}
          <ProductPoster />
          <OurProductsSection />
          <FeaturedProductsSection />
          <FeaturedSection />
        </div>
      </div>
    </>
  );
};

export default Home;
