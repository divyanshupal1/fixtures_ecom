/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { CategorySelector } from './CategorySelector';

export const CategoryFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || 'select';

  const handleCategoryChange = (category: any) => {
    if (category === 'select') {
      router.push('/dashboard/productlist');
    } else {
      router.push(`/dashboard/productlist?category=${category}&page=1`);
    }
  };

  return (
    <div className="flex items-center space-x-3">
      <CategorySelector value={category} handleChange={handleCategoryChange} className=' bg-primary text-white' />
      {category != 'select' && <div>
        <Button
          onClick={() => router.push('/dashboard/productlist')}
        >
          Clear
        </Button>
      </div>}
    </div>
  );
};
