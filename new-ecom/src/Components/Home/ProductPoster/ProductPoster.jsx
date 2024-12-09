import { Link } from "react-router-dom";
import { posterImage } from "../../../Assets/Images/Images";
import PostCounter from "./PostCounter";
import s from "./ProductPoster.module.scss";

const ProductPoster = () => {
  return (
    <section className={s.productPoster}>
      <div className={s.content}>
        <span>Categories</span>
        <p>Best in Class Bathroom Fittings‎ ‎ </p>
        <PostCounter />
        <Link to="/products">Buy Now!</Link>
      </div>

      <div className={s.productHolder}>
        <img src={posterImage} className="w-full" alt="poster-image" />
      </div>
    </section>
  );
};
export default ProductPoster;
