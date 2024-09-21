import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import s from "./HorizontalPoster.module.scss";

const HorizontalPoster = ({ title, description, posterUrl,textColor,url }) => {
  const horPosterRef = useRef();

  useEffect(() => {
    horPosterRef.current.style.backgroundImage = `url(${posterUrl})`;
  });

  return (
    <div className={s.HorPoster} ref={horPosterRef}>
      <div className={s.content}>
        <b style={{color:textColor}}>{title}</b>
        <p style={{color:textColor}}>{description}</p>
        <a href={url} className={s.shopNow}>
          Shop Now
        </a>
      </div>
    </div>
  );
};
export default HorizontalPoster;
