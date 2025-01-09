import React, { useState } from "react";
import styles from "./FilterDrawer.module.scss";

const FilterDrawer = () => {
  const [priceRange, setPriceRange] = useState(2500);
  
  const materials = [
    { id: "steel", label: "Stainless Steel" },
    { id: "chrome", label: "Chrome" },
    { id: "brass", label: "Brass" },
  ];
  
  const brands = [
    { id: "brandA", label: "Brand A" },
    { id: "brandB", label: "Brand B" },
  ];
  
  const finishes = [
    { id: "matte", label: "Matte" },
    { id: "glossy", label: "Glossy" },
  ];

  const FilterGroup = ({ title, items }) => (
    <div className={styles.filterGroup}>
      <h3 className={styles.filterGroupTitle}>{title}</h3>
      <ul className={styles.filterList}>
        {items.map((item) => (
          <li key={item.id} className={styles.filterItem}>
            <label className={styles.filterLabel}>
              <input type="checkbox" id={item.id} className={styles.filterCheckbox} />
              <span className={styles.filterLabelText}>{item.label}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className={styles.filterDrawer}>
      <h2 className={styles.filterTitle}>Filters</h2>

      {/* Price Range */}
      <div className={styles.priceRange}>
        <h3 className={styles.priceRangeTitle}>Price Range</h3>
        <input
          type="range"
          min="0"
          max="5000"
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className={styles.rangeInput}
        />
        <span className={styles.priceRangeValue}>${priceRange.toLocaleString()}</span>
      </div>

      <div className={styles.divider} />

      {/* Filter Groups */}
      <FilterGroup title="Material Type" items={materials} />
      <div className={styles.divider} />
      <FilterGroup title="Brand" items={brands} />
      <div className={styles.divider} />
      <FilterGroup title="Finish Type" items={finishes} />

      <div className={styles.filterActions}>
        <button className={styles.applyButton}>Apply</button>
        <button className={styles.resetButton}>Reset</button>
      </div>
    </div>
  );
};

export default FilterDrawer;
