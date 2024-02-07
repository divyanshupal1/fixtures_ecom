import React from "react";
import Filter from "./smallcomponents/Filter";

const Shop = ({addToCart}) => {
    return(
        <div className="container">
            <div className="shop-nav">
                <h1 style={{color:"darkblue", margin:"20px 0px 10px 0px"}}>Shop Here</h1>
                    <Filter addToCart={addToCart}/>
            </div>
        </div>
    )
}

export default Shop;