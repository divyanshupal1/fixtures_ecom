import React from "react";

const Footer = () => {
    return(
        <footer>
            <div className="foot-address">
                <p>Jln. Road Wangri No 21 Bihar - India</p>
                <a href={`mailto:support@yourdomain.tld`}>support@yourdomain.tld</a>
                <p>(+6221) 2002-2012</p>
                    <i class="fa-brands fa-facebook"> </i>
                    <i class="fa-brands fa-square-instagram"></i>
                    <i class="fa-brands fa-twitter"> </i>
            </div>
            <div className="foot-lists">
                <ul className="list-catagory">
                    <p style={{fontWeight:"600", margin: "3px 0px"}}>Popular Categories</p>
                    <a>Bathroom Products</a><br/>
                    <a>Plumbing Fixtures</a><br/>
                    <a>Lighting</a><br/>
                    <a>Flooring and Tiles</a><br/>
                    <a>Water Filtration and Purification</a>
                </ul>
                <ul className="list-catagory">
                    <p style={{fontWeight:"600", margin: "3px 0px"}}>Support</p>
                    <a>Help Center</a><br/>
                    <a>Ticket Support</a><br/>
                    <a>My Account</a><br/>
                    <a>Return Product</a><br/>
                    <a>Contact us</a>
                </ul>
                <ul className="list-catagory">
                    <p style={{fontWeight:"600", margin: "3px 0px"}}>Company</p>
                    <a>About us</a><br/>
                    <a>Leadership</a><br/>
                    <a>Careers</a><br/>
                    <a>Article & News</a><br/>
                    <a>Legal Notices</a>
                </ul>
            </div>
            <p style={{color:"gray",position:"sticky", margin:"10px 0px"}}>Copyright © 2023 Design, All rights reserved.</p>
        </footer>
    )
}

export default Footer;