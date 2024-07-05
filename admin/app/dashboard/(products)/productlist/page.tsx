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
  SelectValue
} from "@/components/ui/select"
import { useRouter } from 'next/navigation'
import { useCategoryStore, useProductStore } from '@/store/productStore'
import { ProductCard, ProductHeader } from './components/ProductCard'
import { CategoryFilter } from './components/CategoryFilter'
import { Button } from '@/components/ui/button'
import axiosInstance from '@/lib/axiosInstance'
import { useToast } from '@/components/ui/use-toast'


const Page = () => {

  const router = useRouter()
  const searchParams = useSearchParams()

  const {toast} = useToast()

  let page = Number(searchParams.get('page')) || 1
  let category = searchParams.get('category') || 'select';

  const [limit, setLimit] = useState(10)

  const { products, pagination, fetchProducts, fetchProductsByCategory } = useProductStore((state) => ({
    products: state.products,
    pagination: state.pagination,
    fetchProducts: state.fetchProducts,
    fetchProductsByCategory: state.fetchProductsByCategory
  }))
  const { categories, fetchCategories } = useCategoryStore((state) => ({
    categories: state.categories,
    fetchCategories: state.fetchCategories
  }))

  useEffect(() => {
    if (category === 'select') {
      fetchProducts(page, limit);
    }
    else {
      fetchProductsByCategory(category, page, limit);
    }
    if (Object.keys(categories).length === 0) {
      fetchCategories();
    }
  }, [fetchProducts, page, limit, category])

  const [selected,setSelected] = useState<string[]>([])
  const selectChange = (item:string) => {
    if(selected.includes(item)){
      setSelected(selected.filter((i)=>i!==item))
    }else{
      setSelected([...selected,item])
    }
  }

  const merge = async () => {
    axiosInstance.post('/ecommerce/products/variants',{products:selected})
    .then((res)=>{
      if(res.data.success){
        toast({
          title: "Products Merged",
          description: "The products have been merged successfully",
        })
        setSelected([])
      }
    }).catch((err)=>{
      toast({
        title: "Products Merge Failed",
        description: "The products could not be merged",
        variant:"destructive"
      })
    })
  }

  return (
    <>

      <div className="flex max-sm:items-start justify-between items-center w-full mb-5 px-5 pt-8 rounded-xl relative">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Products
          </h2>
        </div>
        <div className='flex gap-x-3'>
          {
            selected.length>1 && 
            <div className="flex items-center space-x-3 max-sm:fixed bottom-4 right-5 z-50">
              <Button onClick={merge} className='dark:text-white'> Merge as Variants </Button>
            </div>
          }
          <CategoryFilter />
        </div>
      </div>
      <div className="px-5 max-sm:px-2 flex flex-col gap-2 w-full h-full">
        <ProductHeader />
        {
          products.length>0?
          products.map((product) => (
            <ProductCard key={product._id} product={product} selectHandle={selectChange} selected={selected.includes(product._id)?true:false} />
          ))
          :
          <div className='mx-auto pt-[150px] h-[300px]'>No products found</div>
        }
        <div className='w-full pb-10 h-10 px-5 pt-3 mt-auto flex justify-between items-center flex-wrap max-md:justify-center gap-y-3'>
          <div className='flex items-center space-x-3 max-sm:hidden'>
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
          <div className='flex items-center space-x-3 max-md:pb-5'>
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



