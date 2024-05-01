/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useCategoryStore, useProductStore } from '@/store/productStore'


const Page = () => {



  

  return (
    <>

      <div className="flex max-sm:items-start justify-between items-center w-full mb-5 px-5 pt-8 rounded-xl">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Coupons
          </h2>
        </div>
        <div>
          {/* <CategoryFilter /> */}
        </div>
      </div>
      <div className="px-5 max-sm:px-2 flex flex-col gap-3 w-full h-full">
        
      </div>

    </>
  )
}
export default Page



