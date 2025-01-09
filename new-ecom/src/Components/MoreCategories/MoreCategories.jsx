import { useCategoryStore } from "../../store/useCategoryStore";
import CategoryCard from "../Shared/ProductsCards/CategoryCard";
import s from "./MoreCategories.module.scss";
import { useEffect, useState } from "react";

const MoreCategories = () => {
  const { categories, fetchCategories } = useCategoryStore((state) => ({
    categories: state.categories,
    fetchCategories: state.fetchCategories,
  }));
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    if (categories === undefined) fetchCategories();
  }, [categories, fetchCategories]);

  useEffect(() => {
    if (categories) {
      let filtered = Object.keys(categories).filter((id) =>
        categories[id].name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (sortOrder === "asc") {
        filtered.sort((a, b) =>
          categories[a].name.localeCompare(categories[b].name)
        );
      } else if (sortOrder === "desc") {
        filtered.sort((a, b) =>
          categories[b].name.localeCompare(categories[a].name)
        );
      }

      setFilteredCategories(filtered);
    }
  }, [categories, searchTerm, sortOrder]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className={s.moreCategories}>
      <h1 className={s.title}>Explore Categories</h1>

      {/* Enhanced Controls */}
      <div className={s.controls}>
        <div className={s.searchWrapper}>
          <input
            type="text"
            placeholder="Search categories..."
            className={s.searchBarMore}
            value={searchTerm}
            onChange={handleSearch}
          />
          {searchTerm && (
            <button onClick={clearSearch} className={s.clearButton}>
              ✕
            </button>
          )}
        </div>

        <select
          value={sortOrder}
          onChange={handleSortChange}
          className={s.sortDropdown}
        >
          <option value="asc">Sort: A-Z</option>
          <option value="desc">Sort: Z-A</option>
        </select>
      </div>

      <p className={s.categoryCount}>
        Showing {filteredCategories.length} of{" "}
        {categories ? Object.keys(categories).length : 0} categories
      </p>

      <div className={s.categoriesContainer}>
        {filteredCategories.map((id) => (
          <CategoryCard categoryData={categories[id]} key={id} />
        ))}
      </div>
    </div>
  );
};

export default MoreCategories;
