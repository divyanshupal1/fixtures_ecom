import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [toggle, setToggle] = useState(false);
    const [headerColor, setHeaderColor] = useState('transparent');

    useEffect(() => {
        const handleScroll = () => {
            setHeaderColor(window.scrollY > 0 ? 'rgba(0, 0, 0, 0.5)' : 'transparent');
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header style={{ zIndex: "3" }}>
            <div className="upper-header" style={{ backgroundColor: headerColor }}>
                <marquee className='headsale' style={{ color: headerColor === 'transparent' ? 'black' : 'white' }}>
                    Discount of up to 35% exclusively for new members, Only this month!
                </marquee>
                <div className='log'>
                    <p><Link to="/login" style={{ color: headerColor === 'transparent' ? 'black' : 'white' }}>Login</Link></p>
                    <p><Link to="/signup" style={{ color: headerColor === 'transparent' ? 'black' : 'white' }}>Signup</Link></p>
                    <li className='nav' style={{ listStyle: "none" }}>
                        <i className="fa-solid fa-circle-user" style={{ padding: "2% 0.5%", color: headerColor === 'transparent' ? 'black' : 'white' }}></i>
                    </li>
                </div>
            </div>
            <hr style={{ color: "gray", opacity: "0.5", margin: "0px" }} />
            <div className='lower-header' style={{ textAlign: "left", backgroundColor: headerColor }}>
                <i className="fa-solid fa-bars" style={{ padding: "8px 20px", color: headerColor === 'transparent' ? 'black' : 'white' }} onClick={() => { setToggle(!toggle) }}></i>
            </div>

            <div className={toggle ? "side-bar" : "resize-sidebar"}>
                <i className="fa-solid fa-xmark" style={{ padding: "49px 20px 60px 22px", color: headerColor === 'transparent' ? 'black' : 'white' }} onClick={() => { setToggle(!toggle) }}></i>
                <ul>
                    <Link to="/" onClick={() => { setToggle(!toggle) }}><li className="menu-item"><i className="fa-solid fa-house-chimney"></i>Home</li></Link><hr />
                    <Link to="/about" onClick={() => { setToggle(!toggle) }}><li className="menu-item"><i className="fa-solid fa-address-card"></i>About</li></Link><hr />
                    <Link to="/shop" onClick={() => { setToggle(!toggle) }}><li className="menu-item"><i className="fa-solid fa-shop"></i>Shop</li></Link><hr />
                    <Link to="/contact" onClick={() => { setToggle(!toggle) }}><li className="menu-item"><i className="fa-solid fa-square-phone"></i>Contact Us</li></Link><hr />
                    <Link to="/cart" onClick={() => { setToggle(!toggle) }}><li className="menu-item"><i className="fa-solid fa-cart-shopping"></i>Cart</li></Link>
                </ul>
            </div>
        </header>
    )
}

export default Header;
