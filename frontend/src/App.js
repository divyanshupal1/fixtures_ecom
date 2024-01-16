import React,{ useState } from 'react';
import Header  from './components/Header.js';
import Body from './components/Body.js';
import Footer from './components/Footer.js';
import About from './components/About.js';
import ContactUs from './components/ContactUs.js';
import Shop from './components/Shop.js';
import ProductPage from './components/ProductPage.js';
import Login from './components/Login.js';
import Signup from './components/Signup.js';
import Cart from './components/Cart.js';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import './App.css';


const App = () => {

  const [cartItems, setCartItems] = useState([]);
  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, { ...item, id: Date.now() }]);
  };
  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  return (
    <div className="App">
      <BrowserRouter>
      <Header />
        <Routes>
            <Route path="/" element={<Body/>} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/about" element={<About />} />
            <Route path="/shop" element={<Shop/>} />
            <Route path="/product/:productId" element={<ProductPage addToCart={addToCart} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}


export default App;
