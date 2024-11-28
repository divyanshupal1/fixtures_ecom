import { categoriesData } from "../../../Data/staticData";
import CategoryCard from "../../Shared/ProductsCards/CategoryCard";
import s from "./CategoriesSlider.module.scss";
import { useCategoryStore } from "../../../store/useCategoryStore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

const CategoriesSlider = () => {
  const { categories, fetchCategories } = useCategoryStore((state) => ({
    categories: state.categories,
    fetchCategories: state.fetchCategories,
  }));

  const [showMore, setShowMore] = useState(false); // State to control visibility of "More Categories"

  useEffect(() => {
    if (categories === undefined) fetchCategories();
  }, [categories, fetchCategories]);

  const handleScroll = () => {
    const slider = document.querySelector(`.${s.categoriesSlider}`);
    if (slider) {
      const scrollableWidth = slider.scrollWidth - slider.clientWidth;
      const scrolled = slider.scrollLeft;
      const threshold = 300; // Adjust threshold based on how many categories you want to scroll before showing "More Categories"

      // Show "More Categories" if user has scrolled more than the threshold
      if (scrolled > threshold) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }
  };

  useEffect(() => {
    const slider = document.querySelector(`.${s.categoriesSlider}`);
    slider?.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      slider?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Limit categories to 5
  const displayedCategories = Object.keys(categories || {}).slice(0, 7);

  return (
    <div className={s.categoriesSection}>
      <div className={s.categoriesSlider}>
        {displayedCategories.map((id) => (
          <CategoryCard categoryData={categories[id]} key={id} />
        ))}
      </div>
      {/* Conditionally render the "More Categories" link */}
      {!showMore && (
        <div className={s.moreCategoriesLinkk}>
          <Link>឵឵឵឵឵឵ ឵ ឵ ឵឵</Link>
        </div>
      )}
      {showMore && (
        <span className={s.moreCategoriesLink}>
          <Link to="/more-categories">Explore more</Link>
        </span>
      )}
    </div>
  );
};

export default CategoriesSlider;
