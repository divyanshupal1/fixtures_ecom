"use client";
import React from "react";
import { useCarouselStore } from "@/store/productStore";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdArrowForward, MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";

type CarouselCardProps = {
  id: string;
  dialog: {
    state: boolean;
    open: () => void;
    close: () => void;
  };
  setId: (id: string) => void;
};

export const CarouselCard = ({ id, dialog, setId }: CarouselCardProps) => {
  const { deleteCarousel, carousels } = useCarouselStore((state) => ({
    deleteCarousel: state.deleteCarousel,
    carousels: state.carousels,
  }));

  const { toast } = useToast();

  const handleDelete = async () => {
    const success = await deleteCarousel(carousels[id]._id);
    if (!success) {
      toast({
        title: `Error delete carousel`,
        description: `An error occured while deleting carousel`,
        variant: "destructive",
      });
    } else {
      toast({
        title: `carousel deleted`,
        description: `carousel deleted successfully`,
      });
    }
  };

  return (
    <div className="relative group flex w-full justify-between items-center hover:pr-6 max-sm:pr-6 bg-card hover:bg-primary-foreground border border-gray-300 hover:border-primary drop-shadow-sm transition-all rounded-md overflow-hidden">
      <Link
        href={`/dashboard/productlist?carousel=${id}&page=1`}
        className="absolute w-full h-full cursor-pointer -z-10"
      ></Link>
      <div className="flex p-6 max-sm:flex-col w-[80%]">
        <div className="whitespace-nowrap text-lg font-semibold w-[45%]">
          {carousels[id].carouselName}
        </div>
        <div className="flex justify-around items-center w-full gap-4">
          <img
            src={carousels[id].carouselImg}
            alt="Carousel"
            className="object-cover w-16 h-16 rounded-md border border-gray-200"
          />
          <img
            src={carousels[id].logoImg}
            alt="Logo"
            className="object-cover w-16 h-16 rounded-md border border-gray-200"
          />
        </div>
        <div className="text-sm text-gray-500 sm:hidden w-[20%] mr-2">
          {carousels[id].discountText}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-sm text-gray-500 hidden sm:block mr-2">
          {carousels[id].discountText}
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
          <DeleteCarousel handleDelete={handleDelete} />
        </div>
        <MdArrowForward className="hidden sm:group-hover:block text-primary ml-4 scale-150" />
      </div>
    </div>
  );
};

const DeleteCarousel = ({ handleDelete }: { handleDelete: () => void }) => {
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
            Once a carousel is deleted it cannot be recovered another carousel
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


export default CarouselCard;
