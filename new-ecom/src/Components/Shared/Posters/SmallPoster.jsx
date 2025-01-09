import s from "./SmallPoster.module.scss";

const SmallPoster = ({ title, description, posterUrl, url, textColor }) => {
  return (
    <div className={s.smallPoster} style={{ backgroundImage: `url(${posterUrl})` }}>
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

export default SmallPoster;
