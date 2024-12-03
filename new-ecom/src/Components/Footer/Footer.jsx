import { useState } from "react";
import { Link } from "react-router-dom";
import SvgIcon from "../Shared/MiniComponents/SvgIcon";
import ToolTip from "../Shared/MiniComponents/ToolTip";
import s from "./Footer.module.scss";

const Footer = () => {
  const [email, setEmail] = useState("");

  function sendEmail(e) {
    e.preventDefault();
    setEmail("");
  }

  return (
    <footer className={s.footer}>
      <div className="container">
        <section className={s.sections}>
          <section className={s.section1}>
            <b>
              <Link to="/">Exclusive</Link>
            </b>
            <span>Subscribe</span>
            <p>Get 10% off your first order</p>

            <form className={s.input} onSubmit={(e) => sendEmail(e)}>
              <input
                type="email"
                placeholder="Enter your email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="email" aria-label="Send mail">
                <SvgIcon name="vector" />
                <ToolTip left="70px" top="50%" content="Send" />
              </label>
            </form>
          </section>

          <section className={s.section2}>
            <b>Support</b>
            <ul>
              <li>111 Bijoy Sarani, Dhaka, DH 1515, Bangladesh.</li>
              <li>
                <a href="mailto:exclusive@gmail.com">exclusive@gmail.com</a>
              </li>
              <li>
                <a href="tel:+88015-88888-9999">+88015-88888-9999</a>
              </li>
            </ul>
          </section>

          <section className={s.section3}>
            <b>Account</b>
            <ul>
              <li>
                <Link to="/profile">My Account</Link>
              </li>
              <li>
                <Link to="/signup">Login / Register</Link>
              </li>
              <li>
                <Link to="/cart">Cart</Link>
              </li>
              <li>
                <Link to="/wishlist">Wishlist</Link>
              </li>
              <li>
                <Link to="/products">Shop</Link>
              </li>
            </ul>
          </section>

          <section className={s.section4}>
            <b>Quick Link</b>
            <ul>
              <li>
                <Link to="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms">Terms Of Use</Link>
              </li>
              <li>
                <Link to="/faq">FAQ</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </section>
        </section>

        <p className={s.copyRights}>
          <span>Copyright © Acquaso </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
