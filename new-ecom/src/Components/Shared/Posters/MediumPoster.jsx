import { useEffect, useRef } from "react";
import s from "./MediumPoster.module.scss";

const MediumPoster = ({ title, description, posterUrl, textColor, url }) => {
  const midPosterRef = useRef();

  useEffect(() => {
    midPosterRef.current.style.backgroundImage = `url(${posterUrl})`;
  }, [posterUrl]);

  return (
    <div className={s.midPoster} ref={midPosterRef}>
      <div className={s.content}>
        <b style={{ color: textColor }}>{title}</b>
        <p style={{ color: textColor }}>{description}</p>
        <a href={url} className={s.shopNow}>
          Shop Now
        </a>
      </div>
    </div>
  );
};

export default MediumPoster;
