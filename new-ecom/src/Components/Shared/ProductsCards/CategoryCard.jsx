import { Link, useNavigate } from "react-router-dom";
import SvgIcon from "../MiniComponents/SvgIcon";
import s from "./CategoryCard.module.scss";

const CategoryCard = ({ categoryData }) => {
  const { _id, name, svgImage } = categoryData;
  const categoryType = name.toLowerCase();
  const navigateTo = useNavigate();

  function navigateToCategory() {
    navigateTo(`/category?type=${_id}`);
  }
  return (
    <Link
      className={s.card}
      title={name + " category"}
      onClick={() => navigateToCategory(categoryType)}
    >
      <img
        src={svgImage}
        alt={name}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
          objectFit: "cover", // Added to ensure proper image scaling
        }}
      />
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 2,
          background:
            "linear-gradient(29deg, rgba(2,0,36,1) 2%, rgba(0,0,0,0) 60%, rgba(0,0,0,0) 100%)",
        }}
      />
      <span style={{ zIndex: 3, color: "white" }}>{name}</span>
    </Link>
  );
};
export default CategoryCard;
