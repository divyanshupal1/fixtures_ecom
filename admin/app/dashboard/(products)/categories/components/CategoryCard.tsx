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
        description: `An error occured while deleting category`,
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
    <div className="relative group flex w-full justify-between items-center hover:pr-6 max-sm:pr-6 bg-card hover:bg-primary-foreground border  border-transparent drop-shadow-sm transition-all grow-0 rounded-md overflow-hidden">
      <div className="absolute w-full h-full cursor-pointer -z-10"></div>
      <div className="flex p-6 px-6 max-sm:flex-col">
        <div className="whitespace-nowrap text-base">{categories[id].name}</div>
        <div className="text-xs text-opacity-75 sm:hidden">
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
          <DeleteCategory handleDelete={handleDelete}/>
        </div>
        <div className="hidden sm:group-hover:block ml-4">
          <MdArrowForward />
        </div>
      </div>
    </div>
  );
};


const DeleteCategory = ({handleDelete}:{handleDelete:()=>void})=>{
  return (
    <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant={"destructive"}
            >
              <div className="scale-125">
                <MdDelete />
              </div>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                Once a category is deleted it cannot be recovered another
                category with the same name can be created.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
  )
}