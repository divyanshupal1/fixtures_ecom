import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';
import About from './components/About';
import ContactUs from './components/ContactUs';
import Shop from './components/Shop';
import ProductPage from './components/ProductPage';
import Login, { LoginCard } from './components/Login';
import Signup from './components/Signup';
import Cart from './components/Cart';
import './App.css';
import LottieLoader from './components/LottieLoader';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [showLoginPopup, setShowLoginPopup] = useState(true); // State to control login popup visibility
  const [showSignupPopup, setShowSignupPopup] = useState(false); // State to control signup popup visibility
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track user login status
  const [cartOpen, setCartOpen] = useState(false); // State to control cart drawer visibility
  const [cartItems, setCartItems] = useState([]); // State to manage cart items

  useEffect(() => {
    // Simulate loading time with setTimeout
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000); // Change the timeout value according to your requirement

    // Clear timeout on component unmount
    return () => clearTimeout(timeout);
  }, []);

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };
  

  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, { ...item, id: Date.now() }]);
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route
            path="/product/:productId"
            element={
              <ProductPage
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                addToCart={addToCart}
                toggleLoginPopup={() => setShowLoginPopup(!showLoginPopup)}
                toggleSignupPopup={() => setShowSignupPopup(!showSignupPopup)}
              />
            }
          />
        </Routes>
        {loading ? (
          <LottieLoader />
        ) : (
          <>
            {showLoginPopup && <LoginCard toggleSignupPopup={() => setShowSignupPopup(!showSignupPopup)} setIsLoggedIn={setIsLoggedIn} toggleCartDrawer={toggleCart} />}
            {showSignupPopup && <Signup toggleLoginPopup={() => setShowLoginPopup(!showLoginPopup)} />}
            {cartOpen && <Cart cartItems={cartItems} removeFromCart={removeFromCart} />}
          </>
        )}
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
