// ProductPage.js
import { useParams } from 'react-router-dom';
import React, {useState} from 'react';
import ProductsData from './smallcomponents/ProductsData'; 
import Counter from './smallcomponents/Counter';
import ReviewCard from './smallcomponents/ReviewCard';

const ProductPage = ({addToCart}) => {
  const { productId } = useParams();
  const product = ProductsData.find((p) => p._id === productId);
  const [count, setCount] = useState(1);


  if (!product) {
    return <div><h1>Product not found</h1></div>;
  }


  const handleAddToCart = () => {
    const itemToAdd = {
      id: product._id,
      name: product.name,
      price: product.price,
      count: count,
      image: product.mainImage.url,
    };

    alert("Product added to Cart")
    addToCart(itemToAdd);
  };

  return (
    <div className='container'>
        <div className="quant2">
                <div className="specifictions">
                    <div className="each-specification">
                        <i class="fas fa-regular fa-gem"></i>
                    </div>
                    <div className="each-specification">
                        <h4>Original Product</h4>
                        <p>100% Original product that covered warranty by the vendor.</p>
                    </div>
                    <div className="each-specification">
                        <h4>30 Days Warranty</h4>
                        <p>You have the right to return your orders within 30 days.</p>
                    </div>
                    <div className="each-specification">
                        <h4>Global Shipping</h4>
                        <p>Your orders are shipped seamlessly between countries</p>
                    </div>
                    <div className="each-specification">
                        <h4>100% Secure</h4>
                        <p>Your payments are secure with our private security network.</p>
                    </div>
                </div>
            </div>
        <div className="product-page">
        <div className='image'>
            <img src={product.mainImage.url} alt="mainProductImage" />
        </div>
        <div className='product-details'>
            <h2>{product.name}</h2>
            <h3>${product.price}</h3>
            <p>{product.description}</p>
            <p style={{margin:"10px 0px"}}>- Last Updated: {product.updatedAt}</p>
            <Counter count={count} setCount={setCount} />
            <button className='add-to-cart' style={{marginLeft:"0px"}} onClick={handleAddToCart}>ADD TO CART</button>
        </div>
        </div>
      <h2 style={{marginTop:"40px"}}>Related Images</h2>
      <div className="sub-images">
        {product.subImages.map((subImage) => (
          <img key={subImage._id} src={subImage.url} alt="subProductImage" />
        ))}
      </div>
            <ReviewCard />
    </div>
  );
};

export default ProductPage;
