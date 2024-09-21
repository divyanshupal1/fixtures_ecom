import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { productsData } from "../../Data/productsData";
import ProductCard from "../Shared/ProductsCards/ProductCard";
import s from "./ProductsCategory.module.scss";
import useScrollOnMount from "../../Hooks/App/useScrollOnMount";
// import { useCategoryStore } from "../../store/useCategoryStore";
import useProductStore from "../../store/useProductStore";

const ProductsCategory = ({ categoryId, customization }) => {

  const {products,pagination,fetchProductsByCategory} = useProductStore((state)=>({ 
    products:state.categoryProducts,
    fetchProductsByCategory:state.fetchProductsByCategory,
    pagination:state.categoryPagination,
  }))

  useEffect(() => {
    fetchProductsByCategory(categoryId,1,10)
  }, [categoryId]);

  console.log(products)
  const hasNoProducts = products?.length === 0;
  useScrollOnMount(200)

  const observerTarget = useRef(null);
  useEffect(() => {
    let target = observerTarget.current;
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          pagination.hasNextPage && fetchProductsByCategory(categoryId,pagination.nextPage,pagination.limit,true);
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
  }, [fetchProductsByCategory, observerTarget, pagination,categoryId]);

  if (hasNoProducts)
    return (
      <div className={s.notFoundMessage}>
        <p>Sorry We don't have any products in this category</p>
        <p>
          Back to the <Link to="/">Home page</Link>
        </p>
      </div>
    );

  return (
    <div className={s.products}>
      {products?.map((product) => (
        <ProductCard
          product={product}
          key={product._id}
          customization={customization}
        />
      ))}
      <div className="w-full text-center flex justify-center items-center" ref={observerTarget}>
        {
          pagination.hasNextPage ?
          <div className='animate-spin'>
            <div className='scale-150'>Loading...</div>
          </div>
          :
          <div></div>
        }
      </div>
    </div>
  );
};
export default ProductsCategory;
