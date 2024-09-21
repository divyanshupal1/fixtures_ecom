import { productsData } from "../../../Data/productsData";
import useProductStore from "../../../store/useProductStore";
import ProductCard from "../../Shared/ProductsCards/ProductCard";
import s from "./ExploreProducts.module.scss";
import { useEffect, useRef } from "react";

const ExploreProducts = ({ numOfProducts = -1, customization }) => {
  const {products,fetchProducts,pagination,fetchProductsByCategory} = useProductStore((state)=>({
    products:state.products,
    fetchProducts:state.fetchProducts,
    pagination:state.pagination,
    fetchProductsByCategory:state.fetchProductsByCategory
  }))

  useEffect(() => {
    if (!products) {
      fetchProducts();
    }
  }, [products]);

  const observerTarget = useRef(null);
  useEffect(() => {
    let target = observerTarget.current;
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          pagination.hasNextPage && fetchProducts(pagination.nextPage,pagination.limit,true)
        }
      },
      { threshold: 1 }
    );
  
    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }
  
    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [fetchProducts, fetchProductsByCategory, observerTarget, pagination]);


  if (!products) {
    return <div>Loading...</div>;
  }
  const filteredProducts = numOfProducts === -1 ? products : products.slice(0, numOfProducts);

  return (
    <>
    <div className={s.products}>
      {filteredProducts?.map((product) => (
        <ProductCard
          product={product}
          key={product._id}
          customization={customization}
        />
      ))}
    </div>
    <div className="w-full text-center flex justify-center items-center" ref={observerTarget}>
      {
        pagination.hasNextPage ?
        <div className='animate-spin'>
          <div className='scale-150'>Loading products..</div>
        </div>
        :
        <div></div>
      }
    </div>
    </>
  );
};
export default ExploreProducts;
