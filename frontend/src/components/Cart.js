// Cart.js

import React from "react";

const Cart = ({ cartItems, removeFromCart  }) => {
  const calculateGrandTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.count, 0);
  };


  return (
    <div className="cart" style={{marginTop:"80px"}}>
      <h1>MY CART</h1>

      {cartItems.length > 0 ? (
        <div className="cart-layout">
          <hr style={{ width: "98%", margin: "5px 0px 10px 3px" }} />

          {cartItems.map((item) => (
            <>
              <div key={item.id} className="cart-item">
                <div className="cart-flex">
                  <div className="cart-image" style={{ flexBasis:"30%", minWidth:"250px",padding:"1%"}}>
                  <img
                    src={item.image}
                    alt="cartProductImage"
                    style={{width:"100%"}}
                  />
                  </div>
                  <div className="details">
                    <p style={{fontWeight:"600"}}>{item.name}</p>
                    <p>Price: ₹{item.price}</p>
                    <p>Qty: {item.count}</p>
                    <p>Sub Total: ₹{item.price * item.count}</p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="add-to-cart"
                      style={{margin:"4px 0px"}}
                    >
                      <i class="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
              <hr style={{ width: "98%", margin: "5px 0px 10px 0px" }} />
            </>
          ))}
        </div>
      ) : (
        <h1 style={{ color: "gray" }}>The Cart is Empty</h1>
      )}
      <div className="payment">
        <h3>Grand Total: ₹{calculateGrandTotal()}</h3>
        <button className="add-to-cart" style={{ marginTop: "10px"}}>
          PAY NOW
        </button>
      </div>
    </div>
  );
};

export default Cart;
