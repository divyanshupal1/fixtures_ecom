import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () =>
{

    const [toggle, setToggle] = useState(false);

    return(
    <header style={{zIndex:"3"}}>
        <div className="upper-header">
            <marquee className='headsale'>Discount of up to 35% exclusively for new members, Only this month!</marquee>
            <div className='log'>
                <p><Link to="/login" >Login</Link></p>
                <p><Link to="/signup" >Signup</Link></p>
                <li className='nav' style={{listStyle:"none"}}><i class="fa-solid fa-circle-user"></i></li>
            </div>
        </div>
        <hr style={{color:"gray", opacity:"0.8", margin:"0px"}} />
        <div className='lower-header' style={{textAlign:"left"}}>
            <i class="fa-solid fa-bars" style={{padding:"10px 20px"}} onClick={() =>{setToggle(!toggle)}}></i>
        </div>
        

    <div className={toggle ? "side-bar" : "resize-sidebar"}>
        <i class="fa-solid fa-xmark" style={{padding:"60px 20px"}} onClick={() =>{setToggle(!toggle)}}></i>
        <ul>
            <Link to="/" onClick={() =>{setToggle(!toggle)}}><li className="menu-item"><i class="fa-solid fa-house-chimney"></i>Home</li></Link><hr/>
            <Link to="/about" onClick={() =>{setToggle(!toggle)}}><li className="menu-item"><i class="fa-solid fa-address-card"></i>About</li></Link><hr/>
            <Link to="/shop" onClick={() =>{setToggle(!toggle)}}><li className="menu-item"><i class="fa-solid fa-shop"></i>Shop</li></Link><hr/>
            <Link to="/contact"onClick={() =>{setToggle(!toggle)}}><li className="menu-item"><i class="fa-solid fa-square-phone"></i>Contact Us</li></Link><hr/>
            <Link to="/cart" onClick={() =>{setToggle(!toggle)}}><li className="menu-item"><i class="fa-solid fa-cart-shopping"></i>Cart</li></Link>
        </ul>
    </div>
    </header>
    )
}

export default Header;