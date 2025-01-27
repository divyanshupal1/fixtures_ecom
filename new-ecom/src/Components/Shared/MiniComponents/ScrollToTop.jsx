import React, { useRef, useState } from "react";
import { scrollToTop } from "../../../Functions/helper";
import useEventListener from "../../../Hooks/Helper/useEventListener";
import s from "./ScrollToTop.module.scss";
import SvgIcon from "./SvgIcon";
import ToolTip from "./ToolTip";

const ScrollToTop = () => {
  const scrollTopButtonRef = useRef();
  const [isScrollTopHidden, setIsScrollTopHidden] = useState(true); // Track visibility
  const SCROLL_REQUIRED = 1000;
  const whatsappNumber = "7761893123"; // Replace with the actual WhatsApp number

  function handleScrollTopVisibility() {
    const shouldHide = window.scrollY < SCROLL_REQUIRED;
    setIsScrollTopHidden(shouldHide); // Update visibility state
    const classListMethod = shouldHide ? "add" : "remove";
    scrollTopButtonRef.current.classList[classListMethod](s.hide);
  }

  useEventListener(window, "scroll", handleScrollTopVisibility, []);

  const handleWhatsAppClick = () => {
    const whatsappURL = `https://wa.me/${whatsappNumber}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <div className={s.buttonContainer}>
      <button
        type="button"
        className={`${s.whatsappButton} ${isScrollTopHidden ? s.shift : ""}`} // Dynamically apply class
        onClick={handleWhatsAppClick}
        aria-label="Contact via WhatsApp"
      >
        <img
          src="https://res.cloudinary.com/dmzp6notl/image/upload/v1734315281/social_nezjkb.png" // External WhatsApp icon link
          alt="WhatsApp"
          className={s.whatsappIcon}
        />
        <ToolTip top="50%" left="-60px" content="Contact via WhatsApp" />
      </button>

      <button
        ref={scrollTopButtonRef}
        type="button"
        className={`${s.scrollTopButton} ${s.hide}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <SvgIcon name="arrowUp2" />
        <ToolTip top="50%" left="-60px" content="Scroll to top" />
      </button>
    </div>
  );
};

export default ScrollToTop;
