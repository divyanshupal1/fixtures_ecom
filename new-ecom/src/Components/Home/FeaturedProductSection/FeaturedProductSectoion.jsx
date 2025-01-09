import { useState } from "react";
import { Link } from "react-router-dom";
import { ourProductsCustomizations } from "../../../Data/staticData";
import SectionTitle from "../../Shared/MiniComponents/SectionTitle";
import ExploreProducts from "../ProductPoster/ExploreProducts";
import s from "./FeaturedProductsSection.module.scss";

const FeaturedProductsSection = () => {
  const [productLimit, setProductLimit] = useState(8); // Default limit to 4 products

  const handleLoadMore = () => {
    setProductLimit((prevLimit) => prevLimit + 8); // Dynamically load 4 more products
  };

  return (
    <section className={s.ourProductsSection}>
      <div className={s.wrapper}>
        <SectionTitle
          eventName="Featured Products"
          sectionName="Explore the best sellers"
        />
      </div>

      <ExploreProducts
        numOfProducts={productLimit}
        customization={ourProductsCustomizations}
      />

      <div className={s.buttonContainer}>
        {productLimit < ourProductsCustomizations.length ? (
          <button
            onClick={handleLoadMore}
            className={s.viewProductsBtn}
            aria-label="Load more products"
          >
            Load More
          </button>
        ) : (
          <Link
            to="/products"
            className={`${s.viewProductsBtn} ${s.exploreAllBtn}`}
            aria-label="Explore all products"
          >
            Explore All
          </Link>
        )}
      </div>
    </section>
  );
};

export default FeaturedProductsSection;
