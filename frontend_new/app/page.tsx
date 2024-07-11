"use client"
import CategoryCards from "@/components/CategoryCards";
import HomeCarousel from "@/components/home_carousel";
import { useCategoryStore } from "@/store/useCategoryStore";
import { useEffect } from "react";


export default function Home() {
  const {categories,fetchCategories} = useCategoryStore((state)=>({
    categories: state.categories,
    fetchCategories: state.fetchCategories
  }))

  useEffect(()=>{
    if(Object.keys(categories).length==0) fetchCategories()
  },[fetchCategories,categories])

  return (
    <main className="w-full">
      <div className="w-full flex justify-center p-2">
        <HomeCarousel/>
      </div>
      <div className="w-full">
        <CategoryCards/>
      </div>
    </main>
  );
}
