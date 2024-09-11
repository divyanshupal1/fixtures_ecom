/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { useCategoryStore } from "@/store/productStore";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { MdArrowForward, MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";

type CategoryCardProps = {
  id: string;
  dialog: {
    state: boolean;
    open: () => void;
    close: () => void;
  };
  setId: (id: string) => void;
};

export const CategoryCard = ({ id, dialog, setId }: CategoryCardProps) => {
  const { deleteCategory, categories } = useCategoryStore((state) => ({
    deleteCategory: state.deleteCategory,
    categories: state.categories,
  }));

  const { toast } = useToast();

  const handleDelete = async () => {
    const success = await deleteCategory(categories[id]._id);
    if (!success) {
      toast({
        title: `Error deleting category`,
        description: `An error occurred while deleting category`,
        variant: "destructive",
      });
    } else {
      toast({
        title: `Category deleted`,
        description: `Category deleted successfully`,
      });
    }
  };

  return (
    <div className="relative group flex w-full justify-between items-center hover:pr-6 max-sm:pr-6 bg-card hover:bg-primary-foreground border border-transparent drop-shadow-sm transition-all grow-0 rounded-md overflow-hidden">
      <Link
        href={`/dashboard/productlist?category=${id}&page=1`}
        className="absolute w-full h-full cursor-pointer -z-10"
      ></Link>
      <div className="flex p-6 px-6 max-sm:flex-col w-[80%]">
        <div className="whitespace-nowrap text-base w-[30%]">
          {categories[id].name}
        </div>
        <div className="whitespace-nowrap text-base bg-[#1e293b] text-white rounded-[5px] px-5 py-2">
          {categories[id].hsCode}
        </div>

        <div className="flex justify-center items-center w-full">
          <img src={categories[id].svgImage} className="w-auto h-full max-h-[100px]" alt="image"/>
        </div>
        <div className="text-xs text-opacity-75 sm:hidden w-[20%]">
          {categories[id].owner.username}
        </div>
      </div>

      <div className="flex items-center">
        <div className="ml-6 text-sm text-opacity-75 mr-6 max-sm:hidden">
          {categories[id].owner.username}
        </div>
        <div className="block group-hover:block sm:hidden">
          <Button
            className="gap-x-3 p-4"
            variant={"outline"}
            size={"sm"}
            onClick={() => {
              dialog.open();
              setId(id);
            }}
          >
            <div className="scale-125">
              <MdEdit />
            </div>
          </Button>
        </div>
        <div className="block group-hover:block sm:hidden ml-2">
          <DeleteCategory handleDelete={handleDelete} />
        </div>
        <div className="hidden sm:group-hover:block ml-4">
          <MdArrowForward />
        </div>
      </div>
    </div>
  );
};

const DeleteCategory = ({ handleDelete }: { handleDelete: () => void }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"destructive"}>
          <div className="scale-125">
            <MdDelete />
          </div>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Once a category is deleted it cannot be recovered. Another category
            with the same name can be created.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
