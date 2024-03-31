import React from "react";
// import AddToCart from "../AddToCart";


const SaleCard = ({ id, imageURL, name, description, price, addToCart }) => {
    

    return(
        <div className="salecard">
            <div className="salemark">Sale!</div>
            <img src={imageURL} alt="cardImage" className="card-image"/>
            <div className="card-content">
            <h4>{name}</h4>
            <p style={{color:"gray"}}>{description.slice(0,45)+"..."}</p>
            <h4 style={{color:"rgb(64, 64, 64)" }}>₹{price}</h4>
            </div>
            <button className="fill">VIEW DETAILS</button>
        </div>
    )
}


export default SaleCard;