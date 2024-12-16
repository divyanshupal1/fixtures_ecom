// Component
import RateStars from "../../Shared/MidComponents/RateStars";
import styles from "./ProductDetails.module.scss";

const ProductDetails = ({ data }) => {
  const { name, price, description, rate, votes, inStock } = data;

  return (
    <section className={styles.productDetails}>
      <div className={styles.productHeader}>
        <h1 className={styles.productName} aria-label={`Product name: ${name}`}>
          {name?.toUpperCase()}
        </h1>
        <span className={styles.price} aria-label={`Price: ₹${price}`}>
          ₹{price}
        </span>
      </div>

      <div className={styles.productMeta}>
        {rate !== undefined && votes !== undefined && (
          <div className={styles.rating}>
            <RateStars rate={rate} />
            <span className={styles.reviewCount} aria-label={`${votes} reviews`}>
              ({votes} Reviews)
            </span>
          </div>
        )}
        {inStock && <span className={styles.inStock}>In Stock</span>}
      </div>

      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: description }}
        aria-label="Product description"
      />

      <div className={styles.ctaContainer}>
        <div className={styles.quantitySelector}>
          <button className={styles.quantityBtn} aria-label="Decrease quantity">-</button>
          <span className={styles.quantityDisplay}>1</span>
          <button className={styles.quantityBtn} aria-label="Increase quantity">+</button>
        </div>
        <button className={styles.buyNowBtn} aria-label="Buy Now">Buy Now</button>
        <button className={styles.wishlistBtn} aria-label="Add to Wishlist">❤</button>
      </div>
    </section>
  );
};

export default ProductDetails;


