import { Link } from "react-router-dom";
import s from "./SmallPoster.module.scss";

const SmallPoster = ({ title, description, posterUrl,url,textColor }) => {
  return (
    <div className={s.smallPoster}>
      <img src={posterUrl} style={{width:"100%",height:"100%"}} alt="product's poster" />
      <div className={s.content}>
        <b style={{color:textColor}}>{title}</b>
        <p style={{color:textColor}}>{description}</p>
        <a href="/products" className={s.shopNow}>
          Shop Now
        </a>
      </div>
    </div>
  );
};
export default SmallPoster;
