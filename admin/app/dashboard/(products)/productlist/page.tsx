import React from 'react'

const Page = () => {
  return (
    <>

      <div className="flex max-sm:items-start justify-between items-center w-full mb-5 px-5 pt-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Products
          </h2>
        </div>
        <div>
          {/* <Button
            className="gap-x-3 py-5"
            variant={"default"}
            onClick={() => {
              setCatId(null);
              dialog.open();
            }}
          >
            <div className="scale-125"><MdAdd /></div>
            <span>New Category</span>
          </Button> */}
        </div>
      </div>
      <div className="p-2 flex flex-col gap-3 w-full">
        <ProductHeader />
        {
          productList.data.products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        }
        {/* <ProductCard product={productList.data.products[0]} /> */}
        {/* {Object.keys(categories).map((key) => (
          <CategoryCard key={key} id={key} dialog={dialog} setId={setCatId} />
        ))} */}
      </div>
  </>
  )
}

export default Page

import { productList } from '../products/components/data'
type ProductListProps = {
  categories: Record<string, Record<string, any>>;
  clearCategory: () => void;
  category: Record<string, any>;
};

function ProductHeader() {
  return (
    <div className="w-full rounded-md flex items-center  p-3 px-6 sticky top-0 z-20 backdrop-blur-md max-sm:hidden">
      <div className="w-[3%] flex justify-start">
        <Checkbox />
      </div>
      <div className="w-1/12 flex justify-center">
        <p className="text-sm font-semibold">Image</p>
      </div>
      <div className="w-3/12 flex pl-6 justify-start">
        <p className="text-sm font-semibold">Details</p>
      </div>
      <div className="w-[11%] flex justify-center">
        <p className="text-sm font-semibold">Price</p>
      </div>
      <div className="w-[11%] flex justify-center">
        <p className="text-sm font-semibold">Stock</p>
      </div>
      <div className="w-2/12 flex justify-center">
        <p className="text-sm font-semibold">Category</p>
      </div>
      <div className="w-2/12 flex justify-center">
        <p className="text-sm font-semibold">Last Updated</p>
      </div>
      <div className="w-1/12 flex justify-center">
        <p className="text-sm font-semibold">Actions</p>
      </div>
    </div>
  );
}

import { Checkbox } from "@/components/ui/checkbox";
function ProductCard({
  product,

}: {
  product: Record<string, any>;

}) {
  return (
    <div
      key={product._id}
      className="w-full drop-shadow-md h-[100px] max-sm:h-auto bg-white dark:bg-primary-foreground p-2 px-6 max-sm:px-2 rounded-md flex items-center max-sm:flex-col max-sm:justify-center relative"
    >
      <div className="w-[3%] flex justify-start max-sm:hidden">
        <Checkbox />
      </div>
      <div className="w-1/12 max-sm:w-full h-5/6 max-sm:h-auto flex justify-start ml-3 max-sm:ml-0">
        <img
          src={product.mainImage.url}
          className="h-full rounded-md"
          alt="product-image"
        />
      </div>
      <div className="w-3/12 max-sm:w-full h-full flex flex-col justify-start pt-2 pl-2 overflow-hidden text-ellipsis whitespace-nowrap">
        <p className="font-semibold">{product.name}</p>
        <p className="max-sm:hidden">{product.description}</p>
      </div>
      <div className="w-[11%] flex justify-center max-sm:w-full max-sm:inline">
        <p className="text-sm font-semibold">
          <span className="sm:hidden pl-2">Price : </span>₹ {product.price}
        </p>
      </div>
      <div className="w-[11%] flex justify-center max-sm:w-full max-sm:inline">
        <p className="text-sm font-semibold">
          <span className="sm:hidden pl-2">Stock : </span>
          {product.stock}
        </p>
      </div>
      <div className="w-2/12 flex justify-center max-sm:w-full items-center max-sm:justify-start">
        <span className="sm:hidden pl-2 text-sm font-semibold">
          Category :{" "}
        </span>
        <div className="px-2 p-1 bg-yellow-50 dark:bg-yellow-700 rounded-md text-sm font-semibold">
          {/* {category.name} */}
        </div>
      </div>
      <div className="w-2/12 flex justify-center max-sm:w-full max-sm:inline">
        <p className="text-sm font-semibold">
          <span className="sm:hidden pl-2">Updated : </span>
          {new Date(product.updatedAt).toLocaleDateString()}
        </p>
      </div>
      <div className="w-1/12 flex justify-center max-sm:absolute max-sm:bottom-[10px] max-sm:right-[20px]">
        {/* <Actions /> */}
      </div>
    </div>
  );
}