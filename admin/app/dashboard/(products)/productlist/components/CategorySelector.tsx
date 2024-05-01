/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup
} from "@/components/ui/select";
import { useCategoryStore } from '@/store/productStore';




export const CategorySelector = ({ value,className, handleChange }: { value: string; handleChange: (category: string) => void;className?:string }) => {
  const { categories } = useCategoryStore((state) => ({ categories: state.categories }));
  return (
    <Select
      value={value}
      onValueChange={handleChange}
    >
      <SelectTrigger className={"w-full "+className}>
        <SelectValue placeholder="Select a Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem key={"select"} value={"select"}>Select a Category</SelectItem>
          {Object.keys(categories).map((categoryId) => (
            <SelectItem key={categoryId} value={categoryId}>
              {categories[categoryId].name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
