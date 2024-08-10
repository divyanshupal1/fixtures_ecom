import { categoriesData } from "../../../Data/staticData";
import CategoryCard from "../../Shared/ProductsCards/CategoryCard";
import s from "./CategoriesSlider.module.scss";
import { useCategoryStore } from "../../../store/useCategoryStore";
import { useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

const CategoriesSlider = () => {
  const { categories, fetchCategories } = useCategoryStore((state) => ({
    categories: state.categories,
    fetchCategories: state.fetchCategories,
  }));

  useEffect(() => {
    if (categories === undefined) fetchCategories();
  }, [categories, fetchCategories]);

  // Limit categories to 5
  const displayedCategories = Object.keys(categories || {}).slice(0, 5);

  return (
    <div className={s.categoriesSlider}>
      {displayedCategories.map((id) => (
        <CategoryCard categoryData={categories[id]} key={id} />
      ))}
      <Link to="/more-categories" className={s.moreCategoriesLink}>
        More Categories
      </Link>
    </div>
  );
};

export default CategoriesSlider;
