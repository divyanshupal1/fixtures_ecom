/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import { useCarouselStore } from "@/store/productStore";
import { Button } from "@/components/ui/button";
import { MdAdd } from "react-icons/md";
import CarouselCard from "./components/CarouselCard";
import AddCarouselCard from "./components/AddCarouselCard";
import { useToast } from "@/components/ui/use-toast";

const Page = () => {
  const { carousels, fetchCarousels } = useCarouselStore((state) => ({
    carousels: state.carousels,
    fetchCarousels: state.fetchCarousels,
  }));

  const [dialogOpen, setDialogOpen] = useState(false);
  const dialog = {
    state: dialogOpen,
    open: () => setDialogOpen(true),
    close: () => setDialogOpen(false),
  };

  const [carouselId, setCarouselId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchData() {
      if (Object.keys(carousels).length !== 0) return;
      const success = await fetchCarousels();
      if (!success) {
        toast({
          title: `Error fetching carousels`,
          description: `An error occurred while fetching carousels`,
          variant: "destructive",
        });
      }
    }
    fetchData();
  }, [fetchCarousels]);

  console.log(carousels);

  return (
    <>
      {dialogOpen && <AddCarouselCard id={carouselId} dialog={dialog} />}
      <div className="flex max-sm:items-start justify-between items-center w-full mb-5 px-5 pt-8">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Carousels</h2>
        </div>
        <div>
          <Button
            className="flex flex-row"
            onClick={() => {
              setCarouselId(null);
              dialog.open();
            }}
          >
            Create Carousel
          </Button>
        </div>
      </div>
      <div className="px-5 max-sm:px-2 flex flex-col gap-3 w-full">
        {Object.keys(carousels).map((key) => (
          <CarouselCard
            id={key}
            key={key}
            dialog={dialog}
            setId={setCarouselId}
          />
        ))}
      </div>
    </>
  );
};

export default Page;
