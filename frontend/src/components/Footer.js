import React from "react";

const Footer = () => {
    return(
        <>
        <footer>
            <div className="foot-address">
                <p>Jln. Road Wangri No 21 Bihar - India</p>
                <a href={`mailto:support@yourdomain.tld`}><p>support@yourdomain.tld</p></a>
                <p>(+6221) 2002-2012</p>
                    <i class="fa-brands fa-facebook"> </i>
                    <i class="fa-brands fa-square-instagram"></i>
                    <i class="fa-brands fa-twitter"> </i>
            </div>
            <div className="foot-lists">
                <ul className="list-catagory">
                    <p style={{fontWeight:"600", margin: "10px 0px", fontSize:"20px"}}>Popular Categories</p>
                    <a><p>Bathroom Products</p></a><br/>
                    <a><p>Plumbing Fixtures</p></a><br/>
                    <a><p>Lighting</p></a><br/>
                    <a><p>Flooring and Tiles</p></a><br/>
                    <a><p>Water Filtration and Purification</p></a>
                </ul>
                <ul className="list-catagory">
                    <p style={{fontWeight:"600", margin: "10px 0px", fontSize:"20px"}}>Support</p>
                    <a><p>Help Center</p></a><br/>
                    <a><p>Ticket Support</p></a><br/>
                    <a><p>My Account</p></a><br/>
                    <a><p>Return Product</p></a><br/>
                    <a><p>Contact us</p></a>
                </ul>
                <ul className="list-catagory">
                    <p style={{fontWeight:"600", margin: "10px 0px", fontSize:"20px"}}>Company</p>
                    <a><p>About us</p></a><br/>
                    <a><p>Leadership</p></a><br/>
                    <a><p>Careers</p></a><br/>
                    <a><p>Article & News</p></a><br/>
                    <a><p>Legal Notices</p></a>
                </ul>
            </div>
        </footer>
        <p style={{color:"gray",position:"sticky", padding:"10px 0px", backgroundColor:"black"}}>Copyright © 2023 Design, All rights reserved.</p>

        </>
    )
}

export default Footer;