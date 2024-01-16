// Cart.js

import React from "react";

const Cart = ({ cartItems, removeFromCart  }) => {
  const calculateGrandTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.count, 0);
  };


  return (
    <div className="cart">
       <h1>My Cart</h1>
       
       {
  (cartItems.length>0)?<table>
  <tr>
    <th>Image</th>
    <th>Product Name</th>
    <th>Price</th>
    <th>Count</th>
    <th>Total Price</th>
    {/* <th>Remove</th> */}
  </tr>
  <hr style={{width:"500%",margin:"5px 0px 10px 3px"}}/>
  
  {cartItems.map((item) => (
    <>
    <tr key={item.id} className="cart-item">
      <td><img src={item.image} alt="cartProductImage" /></td>
      <td>{item.name}</td>
      <td>₹{item.price}</td>
      <td>{item.count}</td>
      <td>₹{item.price * item.count}</td>  
      <td>
        <button onClick={() => removeFromCart(item.id)} className="add-to-cart"><i class="fa-solid fa-trash"></i></button>
      </td>
    </tr>
  <hr style={{width:"500%", margin:"5px 0px 10px 5%"}}/>
    </>
  ))}
</table>
:<h1 style={{color:"gray"}}>No Products added to Cart.</h1>
}
    <div className="payment">
      <h3>Grand Total: ₹{calculateGrandTotal()}</h3>
      <button className="add-to-cart">PAY NOW</button>
    </div>
    </div>
  );
};

export default Cart;
