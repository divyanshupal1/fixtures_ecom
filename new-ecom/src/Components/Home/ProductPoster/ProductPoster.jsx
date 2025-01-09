import { Link } from "react-router-dom";
import PostCounter from "./PostCounter";
import s from "./ProductPoster.module.scss";

const ProductPoster = () => {
  return (
    <section className={s.productPoster}>
      <div className={s.overlayContent}>
        <span>Categories</span>
        <p>Best in class bathroom fittings</p>
        <PostCounter />
        <Link to="/products" className={s.buyNowButton}>
          Buy Now!
        </Link>
      </div>
    </section>
  );
};

export default ProductPoster;
