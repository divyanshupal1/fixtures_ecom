import React from "react"
import Timer from "./smallcomponents/Timer.js"
import { Link } from "react-router-dom"
import SaleCard from "./smallcomponents/salecard.js"
import ReviewCard from "./smallcomponents/ReviewCard.js"
import ProductsData from "./smallcomponents/ProductsData.js"

const Body = ({addToCart}) =>{

  const rating=13000;

    return (
      <div className="container">
        <div className="quant">
          <div className="bg-black">
          <div className="shop">
            <h1>Get inspired</h1>
            <h1>and Redesign</h1>
            <h1>Your Space.</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Utelit
              tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
            </p>
            <div style={{overflow:"hidden",width:"200px"}}><Link className="btn-epic" to="/shop"><div><span>SHOP NOW !</span><span>SHOP NOW !</span></div></Link></div>
          </div>
          </div>
        </div>

        <div className="quant2">
          <div className="specifictions">
            <div className="each-specification">
              <h2>Original Product</h2>
              <p>100% Original product that covered warranty by the vendor.</p>
            </div>
            <div className="each-specification">
              <h2>30 Days Warranty</h2>
              <p>You have the right to return your orders within 30 days.</p>
            </div>
            <div className="each-specification">
              <h2>Global Shipping</h2>
              <p>Your orders are shipped seamlessly between countries</p>
            </div>
            <div className="each-specification">
              <h2>100% Secure</h2>
              <p>Your payments are secure with our private security network.</p>
            </div>
          </div>
        </div>

        <div className="all-shops">
          <div className="quant3">
          <div className="branches">
            <h2>Save up to $600 on select Home Appliance.</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <div style={{overflow:"hidden",width:"200px"}}><Link className="btn-epic" to="/shop"><div><span>CLAIM PROMO</span><span>CLAIM PROMO</span></div></Link></div>
          </div>
          <div className="branches">
            <h2>Enjoy sensational discounts of up to 50% this month only!</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipiscing elit dolor</p>
            <div style={{overflow:"hidden",width:"200px"}}><Link className="btn-epic" to="/shop"><div><span>SHOP NOW !</span><span>SHOP NOW !</span></div></Link></div>
          </div>
            <div className="subbranch-container">
            <div className="sub-branches">
              <h2>Elevate your bathing experience</h2>
              <div style={{overflow:"hidden",width:"200px"}}><Link className="btn-epic" to="/shop"><div><span>SHOP NOW !</span><span>SHOP NOW !</span></div></Link></div>
            </div>
            <div className="sub-branches">
              <h2>Explore our Kitchen Essentials Collection</h2>
              <div style={{overflow:"hidden",width:"200px"}}><Link className="btn-epic" to="/shop"><div><span>SHOP NOW !</span><span>SHOP NOW !</span></div></Link></div>
            </div>
            </div>
          </div>
        </div>

        <div className="quant4">
          <div className="flashsale">
            <h2 style={{fontSize: "40px"}}>Flash Sale</h2>
            <p>Grab the Best Deals on Bathroom & Kitchen Essentials Now!</p>
            <Timer hours={7} minutes={30} seconds={0} />
          </div>
          {ProductsData.slice(0,3).map((product) => (
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
            ))}
            <div className="more">
              <Link to="/shop" ><i class="fa-solid fa-circle-chevron-right" style={{color: "#ffad14", fontSize: "50px", padding:"185px 0px 195px 0px"}}></i></Link>
            </div>
        </div>

        <div className="quant5">
          <h2 style={{fontSize: "30px"}}>New Arrival</h2>
          <div className="arrival-cards">
            {ProductsData && ProductsData.length > 0
              ? ProductsData.map((product,i) => (
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
              <p style={{ color: "#2346A7", fontWeight: "600", margin: "4px 2px" }}>Why choose us</p>
              <h2>Elevate Your Home, Elevate Your Happiness.</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
                tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
              </p>
              <div style={{ margin:"5px 0px" }}>
                <h2>Top-Notch Quality</h2>
                <p>
                  Placerat vivamus lacus orci ex consectetuer cursus ultrices
                  pretium dis
                </p>
              </div>
              <div style={{ margin:"5px 0px" }}>
                <h2>Competitive Pricing & Exclusive Discounts</h2>
                <p>
                  Placerat vivamus lacus orci ex consectetuer cursus ultrices
                  pretium dis
                </p>
              </div>
              <div style={{ margin:"5px 0px" }}>
                <h2>Expert Assistance & Support</h2>
                <p>
                  Placerat vivamus lacus orci ex consectetuer cursus ultrices
                  pretium dis
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="quant6">
          <div className="couple">
            <div className="small-couple">
              <p style={{color:"darkblue"}}>Testimonial</p>
              <h3>Customer FeedBack and Reviews</h3>
            </div>
            <div className="small-couple" style={{textAlign:"right"}}>
              <p>Excellent ({rating})</p>
            </div>
          </div>
          <div className="feedbacks">
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
          </div>
        </div>

        <div className="quant7">
          <div className="newsletter">
            <h4>
              Subscribe to our newsletter for new products, trends and offers.
            </h4>
            <div style={{display:"flex"}}>
              <input type="email" placeholder=" Email" />
              <button className="signup">
                <i class="fa-solid fa-envelope" style={{padding:"2px 0px 5px 0px"}}></i> <p>SignUp</p>
              </button>
            </div>
              
            <p style={{ fontSize: "x-small" }}>
              We respect your Privacy, so we never share your info.
            </p>
          </div>
        </div>
      </div>
    );
}
export default Body;