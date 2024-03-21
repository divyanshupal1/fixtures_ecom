import React,{ useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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


const Preloader = () => {
  return (
    <div className="preloader">
      {/* You can add loading animations or spinner here */}
      <div id="loader"></div>
    </div>
  );
};

const App = () => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time with setTimeout
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000); // Change the timeout value according to your requirement

    // Clear timeout on component unmount
    return () => clearTimeout(timeout);
  }, []);

  const [cartItems, setCartItems] = useState([]);
  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, { ...item, id: Date.now() }]);
  };
  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const ScrollToTopOnMount = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [navigate]); 

    return null;
};

  return (
    <div className="App">
      <BrowserRouter>
      <ScrollToTopOnMount />
      <Header />
      {loading ? (
        <Preloader />
      ) : (
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
        )}
        <Footer />
      </BrowserRouter>
    </div>
  );
}


export default App;
