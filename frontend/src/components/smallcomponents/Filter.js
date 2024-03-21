import React, { useState, useEffect } from "react";
import ProductsData from "./ProductsData";
import SaleCard from "./salecard";
import { Link } from "react-router-dom";

const Filter = ({addToCart}) => {

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const filterProducts = () => {
    const filtered = ProductsData.filter((product) => {
      const isNameMatch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const isCategoryMatch =
        selectedCategory === "" || product.category === selectedCategory;
      const isPriceInRange =
        (minPrice === "" || product.price >= parseInt(minPrice, 10)) &&
        (maxPrice === "" || product.price <= parseInt(maxPrice, 10));

      return isNameMatch && isCategoryMatch && isPriceInRange;
    });
    setFilteredProducts(filtered);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  const handleSearchButtonClick = () => {
    filterProducts();
  };

  useEffect(() => {
    setFilteredProducts(ProductsData);
  },[]);

  return (
    <div className="filter">
      <div className="filter-left">
          <div className="small-part"><input
            type="text"
            placeholder="Search product..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="searchbar ht"
            style={{width:"76%"}}
          />
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          style={{ height: "32px", margin: "0 5px" }}
        >
          <option value="">All Categories</option>
          {Array.from(
            new Set(ProductsData.map((product) => product.category))
          ).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <div style={{width:"200px", marginLeft:"8%"}}>
        <label>
          <input
            type="number"
            value={minPrice}
            onChange={handleMinPriceChange}
            className="ht"
          />
          Min Price
        </label>
        <label>
          <input
            type="number"
            value={maxPrice}
            onChange={handleMaxPriceChange}
            className="ht"
            style={{margin:"0px 4px 0px 6px"}}
          />
          Max Price
        </label>
        </div>

        <button onClick={handleSearchButtonClick} className="search-product" style={{borderRadius:"4px"}}>
          SEARCH
        </button>
      </div>
      </div>
      <div className="filter-right">
        <div className="allLists">
        {filteredProducts && filteredProducts.length > 0
              ? filteredProducts.map((product) => (
              <Link key={product._id} to={`/product/${product._id}`}>
                <SaleCard
                  key={product._id}
                  addToCart={addToCart}
                  name={product.name}
                  imageURL={product.mainImage.url}
                  description={product.description}
                  price={product.price}
                />
              </Link>
            )) : <p>No products available</p>
            }
        </div>
      </div>
    </div>
  );
};

export default Filter;
