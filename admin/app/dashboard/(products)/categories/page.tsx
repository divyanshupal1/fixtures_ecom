/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { useCategoryStore } from "@/store/productStore";
import { Button } from "@/components/ui/button";
import { MdAdd } from "react-icons/md";
import { CategoryCard } from "./components/CategoryCard";
import { AddCategory } from "./components/AddCategory";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";

const Page = () => {
  const { categories, fetchCategories } = useCategoryStore((state) => ({
    categories: state.categories,
    fetchCategories: state.fetchCategories,
  }));

  const [dialogOpen, setDialogOpen] = useState(false);
  const dialog = {
    state: dialogOpen,
    open: () => setDialogOpen(true),
    close: () => setDialogOpen(false),
  };

  const [catId, setCatId] = useState<string | null>(null);

  const { toast } = useToast();

  useEffect(() => {     
    async function fetchData() {
      if (Object.keys(categories).length !== 0) return
      const success = await fetchCategories();
      if (!success) {
        toast({
          title: `Error fetching categories`,
          description: `An error occured while fetching categories`,
          variant: "destructive",
        });
      }
    }
    fetchData();
  }, [fetchCategories]);

  return (
    <>
      {dialogOpen && <AddCategory id={catId} dialog={dialog} />}
        <div className="flex max-sm:items-start justify-between items-center w-full mb-5 px-5 pt-8">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Categories
            </h2>
          </div>
          <div>
            <Button
              className="flex flex-row"
              onClick={() => {
                setCatId(null);
                dialog.open();
              }}
            >
              Create Category
            </Button>
          </div>
        </div>
        <div className="px-5 max-sm:px-2 flex flex-col gap-3 w-full">
          {Object.keys(categories).map((key) => (
            <CategoryCard id={key} key={key} dialog={dialog} setId={setCatId} />
          ))}
        </div>
    </>
  );
};

export default Page;
