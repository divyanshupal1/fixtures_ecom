import React from "react";
import Filter from "./smallcomponents/Filter";
import Header from "./Header";

const Shop = ({addToCart}) => {
    return(
        <div className="container">
            <Header />
            <div className="shop-nav">
                <h1 style={{color:"#5a5a5a", margin:"100px 0px 10px 0px"}}>ALL PRODUCTS</h1>
                    <Filter addToCart={addToCart}/>
            </div>
        </div>
    )
}

export default Shop;