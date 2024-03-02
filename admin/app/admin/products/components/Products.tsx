/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import React from 'react';
import { Button } from '@/components/ui/button';
import { IoArrowBack } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { productList } from '../data';

export function Products({ categories, clearCategory, category }: ProductListProps) {
  if (Object.keys(categories).length == 0) {
    return <></>;
  }
  return (
    <>
      <div className='w-full flex items-center justify-between p-2 max-sm:p-0 max-sm:flex-col max-sm:items-start gap-y-3'>
        <div className='flex items-center gap-x-3 '>
          <Button className=' rounded-full' variant={"outline"} onClick={clearCategory}>
            <IoArrowBack />
          </Button>
          <div className='text-xl font-semibold tracking-tight pl-2'>{category && category?.name}</div>
        </div>
        <div className='max-sm:absolute right-0 bottom-0 z-40'>
          <Button className='gap-x-3 py-5 max-sm:rounded-full' variant={"default"}><IoMdAdd className="scale-150" />Add Product</Button>
        </div>
      </div>
      <div className='w-full h-full space-y-3 overflow-x-hidden pr-2 pb-4 mt-2'>
        <ProductHeader />
        {productList.data.products.map(
          product => <ProductCard key={product._id} product={product} category={categories[product.category]} />
        )}
      </div>
    </>
  );
}

import { Checkbox } from "@/components/ui/checkbox"

export type ProductListProps = {
  categories: Record<string, Record<string, any>>
  clearCategory: ()=>void
  category: Record<string, any>
}

export function ProductHeader(){
  return (
    <div className='w-full rounded-md flex items-center  p-3 px-6 sticky top-0 backdrop-blur-md max-sm:hidden'>
      <div className='w-[3%] flex justify-start'><Checkbox /></div>
      <div className='w-1/12 flex justify-center'>
        <p className='text-sm font-semibold'>Image</p>
      </div>
      <div className='w-3/12 flex pl-6 justify-start'>
        <p className='text-sm font-semibold'>Details</p>
      </div>
      <div className='w-[11%] flex justify-center'>
        <p className='text-sm font-semibold'>Price</p>
      </div>
      <div className='w-[11%] flex justify-center'>
        <p className='text-sm font-semibold'>Stock</p>
      </div>
      <div className='w-2/12 flex justify-center'>
        <p className='text-sm font-semibold'>Category</p>
      </div>
      <div className='w-2/12 flex justify-center'>
        <p className='text-sm font-semibold'>Last Updated</p>
      </div>
      <div className='w-1/12 flex justify-center'>
        <p className='text-sm font-semibold'>Actions</p>
      </div>
    </div>
  )
}
export function ProductCard({product,category}:{product:Record<string,any>,category:Record<string,any>}){
 return (
    <div key={product._id} className='w-full drop-shadow-md h-[100px] max-sm:h-auto bg-white dark:bg-primary-foreground p-2 px-6 max-sm:px-2 rounded-md flex items-center max-sm:flex-col max-sm:justify-center relative'>
      <div className='w-[3%] flex justify-start max-sm:hidden'>
        <Checkbox />
      </div>
      <div className='w-1/12 max-sm:w-full h-5/6 max-sm:h-auto flex justify-start ml-3 max-sm:ml-0'>
        <img src={product.mainImage.url} className='h-full rounded-md' alt='product-image'/>
      </div>
      <div className='w-3/12 max-sm:w-full h-full flex flex-col justify-start pt-2 pl-2 overflow-hidden text-ellipsis whitespace-nowrap'>
        <p className='font-semibold'>{product.name}</p>
        <p className='max-sm:hidden'>{product.description}</p>
      </div>
      <div className='w-[11%] flex justify-center max-sm:w-full max-sm:inline'>
        <p className='text-sm font-semibold'><span className='sm:hidden pl-2'>Price : </span>₹ {product.price}</p>
      </div>
      <div className='w-[11%] flex justify-center max-sm:w-full max-sm:inline'>
        <p className='text-sm font-semibold'><span className='sm:hidden pl-2'>Stock : </span>{product.stock}</p>
      </div>
      <div className='w-2/12 flex justify-center max-sm:w-full items-center max-sm:justify-start'>
        <span className='sm:hidden pl-2 text-sm font-semibold'>Category : </span>
        <div className='px-2 p-1 bg-yellow-50 dark:bg-yellow-700 rounded-md text-sm font-semibold'>
          {category.name}
        </div>
      </div>
      <div className='w-2/12 flex justify-center max-sm:w-full max-sm:inline'>
        <p className='text-sm font-semibold'><span className='sm:hidden pl-2'>Updated : </span>{new Date(product.updatedAt).toLocaleDateString()}</p>
      </div>
      <div className='w-1/12 flex justify-center max-sm:absolute max-sm:bottom-[10px] max-sm:right-[20px]'>
        <Actions />
      </div>
    </div>
 )
}

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IoIosMore  } from "react-icons/io";
import { MdArrowForward, MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import axiosInstance from '@/lib/axiosInstance';
function Actions(){
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='bg-primary-foreground p-3 rounded-md hover:bg-primary hover:text-white'><IoIosMore /></DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className='gap-x-4 py-2 px-3'><div className='scale-150'><MdEdit/></div>Edit</DropdownMenuItem>
        <DropdownMenuItem className='gap-x-4 py-2 px-3'><div className='scale-150'><FaEye/></div>View</DropdownMenuItem>
        <DropdownMenuItem className='gap-x-4 py-2 px-3'><div className='scale-150'><MdDelete/></div>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

  )
}