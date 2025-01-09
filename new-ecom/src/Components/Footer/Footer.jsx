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
              <h2 to="/">Acquaso</h2>
            </b>
            <ul>
            <li>
                <Link to="/dealer">DEALERSHIP ENQUIRY</Link>
              </li>    
              <li>
                <Link to="/dealer">CREATOR PROGRAM</Link>
              </li>                

            </ul>
          </section>

          <section className={s.section2}>
            <b>Support</b>
            <ul>
              <li>Acquaso Solutions LLP, Patna, Bihar India</li>
              <li>
                <a href="mailto:support@acquaso.com">support@acquaso.com</a>
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
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </section>
        </section>

        <p className={s.copyRights}>
          <span>Copyright © ACQUASO SOLUTIONS LLP</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
