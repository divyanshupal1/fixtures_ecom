// Component
import RateStars from "../../Shared/MidComponents/RateStars";
import styles from "./ProductDetails.module.scss";

const ProductDetails = ({ data }) => {
  const { name, price, description, rate, votes, inStock } = data;

  return (
    <section className={styles.productDetails}>
      <h1 className={styles.productName} aria-label={`Product name: ${name}`}>
        {name?.toUpperCase()}
      </h1>

      <div className={styles.productMeta}>
        {rate !== undefined && votes !== undefined && (
          <div className={styles.rating}>
            <RateStars rate={rate} />
            <span className={styles.reviewCount} aria-label={`${votes} reviews`}>
              ({votes} Reviews)
            </span>
          </div>
        )}
        <div className={styles.verticalDivider} aria-hidden="true" />
        {inStock && <span className={styles.inStock}>In Stock</span>}
      </div>

      <p className={styles.price} aria-label={`Price: ₹${price}`}>
        ₹{price}
      </p>

      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: description }}
        aria-label="Product description"
      />
    </section>
  );
};

export default ProductDetails;


