import React from "react";
// import AddToCart from "../AddToCart";


const SaleCard = ({ id, imageURL, name, description, price, addToCart }) => {
    

    return(
        <div className="salecard">
            <div className="salemark">Sale!</div>
            <img src={imageURL} alt="cardImage" className="card-image"/>
            <div className="card-content">
            <h4>{name}</h4>
            <p>{description.slice(0,65)+"..."}</p>
            <h4>₹{price}</h4>
            </div>
            <button className="add-to-cart">VIEW DETAILS</button>
        </div>
    )
}


export default SaleCard;