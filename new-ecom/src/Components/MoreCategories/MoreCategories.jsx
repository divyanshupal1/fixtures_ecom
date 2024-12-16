import { useCategoryStore } from "../../store/useCategoryStore";
import CategoryCard from "../Shared/ProductsCards/CategoryCard";
import s from "./MoreCategories.module.scss";
import { useEffect } from "react";

const MoreCategories = () => {
  const { categories, fetchCategories } = useCategoryStore((state) => ({
    categories: state.categories,
    fetchCategories: state.fetchCategories,
  }));

  useEffect(() => {
    if (categories === undefined) fetchCategories();
  }, [categories, fetchCategories]);

  return (
    <div className={s.moreCategories}>
      <h1 className={s.title}>Explore Categories</h1>
      <div className={s.categoriesContainer}>
        {Object.keys(categories || {}).map((id) => (
          <CategoryCard categoryData={categories[id]} key={id} />
        ))}
      </div>
    </div>
  );
};

export default MoreCategories;
