/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client"
import React, {useEffect, useState } from 'react'
import { Categories } from './components/Categories';
// import { Products } from './components/Products';
import { useToast } from "@/components/ui/use-toast"
import axiosInstance from '@/lib/axiosInstance';

export default function Page() {
  const {toast} = useToast()
  const [active, setActive] = useState(0)
  const [category, setCategory] = useState<Record<string,any>>({})
  const [categories, setCategories] = useState<Record<string,any>>({})
  const [laodingCategories, setLoadingCategories] = useState(true)

  const changeCategory = (id:string)=>{
    setCategory(categories[id])
    setActive(1)
  }
  const clearCategory = ()=>{
    setCategory({})
    setActive(0)
  }

  function fetchCategories(){
    axiosInstance.get('/ecommerce/categories')
    .then((res)=>{
      if(res.data.success){
        const categories = res.data.data.reduce((acc:Record<string,Record<string,any>>, curr:Record<string,any>) => {
          const { _id, ...rest } = curr;
          acc[_id] = {...rest,_id};
          return acc;
        }, {});
        const sortedData = Object.keys(categories)
        .sort((a, b) => categories[a].name.localeCompare(categories[b].name))
        .reduce((acc:Record<string,Record<string,any>>, key) => {
          acc[key] = categories[key];
          return acc;
        }, {});
        setCategories(sortedData)
        setLoadingCategories(false)
      }
    })
    .catch(e=>{
      toast({
        title: "Sommething went wrong!",
        variant: "destructive",      
      })
      setLoadingCategories(false)
    })
  }  
  useEffect(()=>{
    fetchCategories()
  },[])

  return (
    <>
      <div className=" h-full max-sm:h-[calc(100%-60px)] flex flex-col justify-start items-start space-y-2 sm:p-8 max-sm:p-3 sm:pt-5 sm:pb-0 md:flex">
          <div className="flex max-sm:hidden max-sm:items-start justify-between items-center w-full">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">Products</h2>
              </div>            
          </div>
          <div className={`w-full h-full flex transition-all ease-in-out relative overflow-hidden ${active==0?'':''}`}>
            <div className={`w-full h-full absolute left-0 top-0 flex transition-all ${active==1?'-translate-x-full':''}`}>
              <div className='w-full h-full shrink-0 flex flex-col' >
              {<Categories categories={categories} changeCategory={changeCategory} fetchCategories={fetchCategories} loading={laodingCategories}/> }
              </div>
              <div className='w-full h-full shrink-0 flex flex-col relative' >
                {/**<Products categories={categories} category={category} clearCategory={clearCategory}/>**/}
              </div>              
            </div>
          </div>
      </div>
    </>
  )
}