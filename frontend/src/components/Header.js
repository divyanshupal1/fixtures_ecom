import React from 'react';
import { Link } from 'react-router-dom';

const Header = () =>
{
    return(
    <header>
        <div className="upper-header">
            <marquee className='headsale'>Discount of up to 35% exclusively for new members, Only this month!</marquee>
            <div className='log'>
                <p><Link to="/login" >Login</Link></p>
                <hr style={{margin:"5px 1px 1px 1px",height: "18px",}}></hr>
                <p><Link to="/signup" >Signup</Link></p>
                <hr style={{margin:"5px 1px 1px 1px",height: "18px",}}></hr>
                <li className='nav' style={{listStyle:"none"}}><i class="fa-solid fa-circle-user"></i></li>
            </div>
        </div>
        <hr style={{color:"gray", opacity:"0.8", margin:"0px"}}></hr>
        <div className='lower-header'>
            <ul className='navlist'>
                <li className='nav'><Link to="/">Home</Link></li>
                <li className='nav'><Link to="/about">About</Link></li>
                <li className='nav'><Link to="/shop">Shop</Link></li>
                <li className='nav'><Link to="/contact">Contact Us</Link></li>
                <li className='nav'><Link to="/cart"><i class="fa-solid fa-cart-shopping"></i></Link></li>
            </ul>
        </div>
    </header>
    )
}

export default Header;