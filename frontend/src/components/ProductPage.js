import { useParams } from 'react-router-dom';
import React, { useState } from 'react';
import ProductsData from './smallcomponents/ProductsData';
import Counter from './smallcomponents/Counter';
import ReviewCard from './smallcomponents/ReviewCard';
import Header from './Header';

const ProductPage = ({ isLoggedIn, addToCart }) => {
  const { productId } = useParams();
  const product = ProductsData.find((p) => p._id === productId);
  const [count, setCount] = useState(1);

  if (!product) {
    return <div><h1>Product not found</h1></div>;
  }

  const handleAddToCart = () => {
    // Check if user is logged in
    if (isLoggedIn) {
      const itemToAdd = {
        id: product._id,
        name: product.name,
        price: product.price,
        count: count,
        image: product.mainImage.url,
      };
      addToCart(itemToAdd);
      alert("Product added to Cart");
    } else {
      alert("Please log in to add the product to cart");
      // Redirect the user to the login page or show a login modal
    }
  };

  return (
    <div className='container'>
      <Header />
        
      <div className="product-page" style={{ marginTop: "80px" }}>
        <div className='image'>
          <img src={product.mainImage.url} alt="mainProductImage" />
        </div>
        <div className='product-details'>
          <h2>{product.name}</h2>
          <p style={{ color: "gray" }}>{product.description}</p>
          <h3 style={{ padding: "20px 0px" }}>${product.price}</h3>
          <Counter count={count} setCount={setCount} />
          <button
            className='add-to-cart'
            style={{ marginLeft: "0px", padding: "13px 25px" }}
            onClick={handleAddToCart}
            disabled={!isLoggedIn} // Disable the button if user is not logged in
          >
            ADD TO CART
          </button>
          {!isLoggedIn && <p>Please Login to add the product to cart. Reload the site</p>}
        </div>
      </div>
      <div className="sub-images">
        {product.subImages.map((subImage) => (
          <img key={subImage._id} src={subImage.url} alt="subProductImage" />
        ))}
      </div>
      <div className="quant2">
        {/* Specifications */}
      </div>
      <h1>Customer Reviews</h1>
      <div className='feedbacks'>
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
      </div>
    </div>
  );
};

export default ProductPage;
