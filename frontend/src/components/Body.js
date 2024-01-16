import React from "react"
import Timer from "./smallcomponents/Timer.js"
import { Link } from "react-router-dom"
import SaleCard from "./smallcomponents/salecard.js"
import ReviewCard from "./smallcomponents/ReviewCard.js"
import ProductsData from "./smallcomponents/ProductsData.js"

const Body = ({addToCart}) =>{

    return (
      <div className="container">
        <div className="quant">
          <div className="shop">
            <h1>Get inspired</h1>
            <h1>and Redesign</h1>
            <h1>Your Space.</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Utelit
              tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
            </p>
            <button className="shop-now">SHOP NOW!</button>
          </div>
        </div>

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

        <div className="all-shops">
          <div className="quant3">
          <div className="branches">
            <h3>Save up to $600 on select Home Appliance.</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <button className="shop-now">CLAIM PROMO</button>
          </div>
          <div className="branches">
            <h3>Enjoy sensational discounts of up to 50% this month only!</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipiscing elit dolor</p>
            <button className="shop-now">SHOP NOW!</button>
          </div>
            <div className="subbranch-container">
            <div className="sub-branches">
              <h4>Elevate your bathing experience</h4>
              <button className="shop-now">SHOP NOW!</button>
            </div>
            <div className="sub-branches">
              <h4>Explore our Kitchen Essentials Collection</h4>
              <button className="shop-now">SHOP NOW!</button>
            </div>
            </div>
          </div>
        </div>

        <div className="quant4">
          <div className="flashsale">
            <h1>Flash Sale</h1>
            <p>Grab the Best Deals on Bathroom & Kitchen Essentials Now!</p>
            <Timer hours={7} minutes={30} seconds={0} />
          </div>
          {/* {ProductsData.map((product) => (
              <Link key={product._id} to={`/product/${product._id}`}>
                <SaleCard
                  key={product._id}
                  addToCart={addToCart}
                  name={product.name}
                  imageURL={product.mainImage.url}
                  description={product.description}
                  price={product.price}
                />
              </Link>
            ))} */}
        </div>

        <div className="quant5">
          <h1>New Arrival</h1>
          <div className="arrival-cards">
            {ProductsData && ProductsData.length > 0
              ? ProductsData.map((product) => (
              <Link key={product._id} to={`/product/${product._id}`}>
                <SaleCard
                  key={product._id}
                  addToCart={addToCart}
                  name={product.name}
                  imageURL={product.mainImage.url}
                  description={product.description}
                  price={product.price}
                />
              </Link>
            )) : <p>No products available</p>
            }
          </div>
          <div className="why">
            <div className="content-box">
              <p style={{ color: "blue", fontWeight: "500" }}>Why choose us</p>
              <h2>Elevate Your Home, Elevate Your Happiness.</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
                tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
              </p>
              <div className="sub-branches" style={{ border: "none" }}>
                <h4>Top-Notch Quality</h4>
                <p>
                  Placerat vivamus lacus orci ex consectetuer cursus ultrices
                  pretium dis
                </p>
              </div>
              <div className="sub-branches" style={{ border: "none" }}>
                <h4>Competitive Pricing & Exclusive Discounts</h4>
                <p>
                  Placerat vivamus lacus orci ex consectetuer cursus ultrices
                  pretium dis
                </p>
              </div>
              <div className="sub-branches" style={{ border: "none" }}>
                <h4>Expert Assistance & Support</h4>
                <p>
                  Placerat vivamus lacus orci ex consectetuer cursus ultrices
                  pretium dis
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="quant6">
          <h3>Customer FeedBack and Reviews</h3>
          <div className="feedbacks">
            <ReviewCard />
          </div>
        </div>

        <div className="quant7">
          <div className="newsletter">
            <h4>
              Subscribe to our newsletter for new products, trends and offers.
            </h4>
            <input type="email" placeholder="Email" />
            <button className="signup">
              <i class="fa-solid fa-envelope"></i> Sign Up
            </button>
            <p style={{ fontSize: "x-small" }}>
              We respect your Privacy, so we never share your info.
            </p>
          </div>
        </div>
      </div>
    );
}
export default Body;