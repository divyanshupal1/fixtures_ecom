import { car, correctSign, headphone } from "../../../Assets/Images/Images";
import Feature from "../../Shared/MiniComponents/Feature";
import s from "./FeaturedSectionFeatures.module.scss";

const FeaturedSectionFeatures = () => {
  return (
    <div className={s.features}>
      <Feature
        iconImg={car}
        iconAlt="Car"
        title="FREE AND FAST DELIVERY"
        description="*Free delivery for all orders over ₹999"
      />

      <Feature
        iconImg={headphone}
        iconAlt="Headphone"
        title="QUICK CUSTOMER SERVICE"
        description="Friendly chat & email customer support"
      />

      <Feature
        iconImg={correctSign}
        iconAlt="Correct sign"
        title="EASY RETURNS"
        description="Quick refunds & replacements"
      />
    </div>
  );
};
export default FeaturedSectionFeatures;
