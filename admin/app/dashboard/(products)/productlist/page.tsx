/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import React, { useEffect, useState } from 'react'
import { PaginationComp } from '@/components/system/pagination'
import { useSearchParams } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue} from "@/components/ui/select"
import { useRouter } from 'next/navigation'
import { useCategoryStore, useProductStore } from '@/store/productStore'
import { ProductCard ,ProductHeader} from './components/ProductCard'
import { CategoryFilter } from './components/CategoryFilter'

const Page = () => {

  const router = useRouter()
  const searchParams = useSearchParams()

  let page = Number(searchParams.get('page')) || 1
  let category = searchParams.get('category') || 'select';

  const [limit,setLimit] = useState(10)

  const {products,pagination,fetchProducts,fetchProductsByCategory} = useProductStore((state)=>({
    products:state.products,
    pagination:state.pagination,
    fetchProducts:state.fetchProducts,
    fetchProductsByCategory:state.fetchProductsByCategory
  }))

  const {categories,fetchCategories} = useCategoryStore((state)=>({
    categories:state.categories,
    fetchCategories:state.fetchCategories
  }))

  useEffect(()=>{
      if(category==='select'){
        fetchProducts(page,limit);
      }
      else{
        fetchProductsByCategory(category,page,limit);
      }
      if(Object.keys(categories).length===0){
        fetchCategories();
      }
  },[fetchProducts,page,limit,category])

  return (
    <>

      <div className="flex max-sm:items-start justify-between items-center w-full mb-5 px-5 pt-8 rounded-xl">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Products
          </h2>
        </div>
        <div>
          <CategoryFilter/>
        </div>
      </div>
      <div className="px-5 max-sm:px-2 flex flex-col gap-3 w-full h-full">
        <ProductHeader />
        {
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        }
        <div className='w-full pb-3 h-10 px-5 pt-3 mt-auto flex justify-between items-center'>
          <div className='flex items-center space-x-3'>
            <h6 className='text-sm'>
              Total Products : {pagination.totalProducts}
            </h6>
            <div className='text-sm'>
              Total Pages : {pagination.totalPages}
            </div>
            <div className="flex items-center space-x-2">
                <p className="text-sm font-medium">items per page</p>
                <Select
                  value={`${limit}`}
                  onValueChange={(value) => {
                    setLimit(Number(value))
                    router.replace(`?page=1`)
                  }}
                >
                  <SelectTrigger className="h-8 w-[70px] bg-primary-foreground">
                    <SelectValue placeholder={limit} />
                  </SelectTrigger>
                  <SelectContent side="top">
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                      <SelectItem key={pageSize} value={`${pageSize}`}>
                        {pageSize}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
            </div>
          </div>
          <div className='flex items-center space-x-3'>
            <div>
              <PaginationComp />
            </div>

          </div>
        </div>
      </div>

  </>
  )
}
export default Page



