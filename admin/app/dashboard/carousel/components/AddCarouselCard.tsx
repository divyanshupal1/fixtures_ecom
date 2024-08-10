"use client";
import React from "react";
import { useCarouselStore } from "@/store/productStore";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useToast } from "@/components/ui/use-toast";

type AddCarouselProps = {
  id: string | null;
  dialog: {
    state: boolean;
    open: () => void;
    close: () => void;
  };
};

const AddCarouselCard = ({ id, dialog }: AddCarouselProps) => {
  
  const { createCarousel, updateCarousel, carousels } = useCarouselStore((state) => ({
    createCarousel: state.createCarousel,
    updateCarousel:state.updateCarousel,
    carousels:state.carousels,
  }));

  const { toast } = useToast();
  const [carouselName, setCarouselName] = React.useState("");
  const [carouselImg, setCarouselImg] = React.useState("");
  const [logoImg, setLogoImg] = React.useState("");
  const [discountText, setDiscountText] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (id != null) {
      setCarouselName(carousels[id].carouselName);
      setCarouselImg(carousels[id].carouselImg);
      setLogoImg(carousels[id].logoImg);
      setDiscountText(carousels[id].discountText);
    } else {
      setCarouselName("");
      setCarouselImg("");
      setLogoImg("");
      setDiscountText("");
    }
  }, [id, carousels]);

  async function handleSubmit() {
    if (
      carouselName.length > 0 &&
      carouselImg.length > 0 &&
      logoImg.length > 0 &&
      discountText.length > 0
    ) {
      setLoading(true);
      const success =
        id != null
          ? await updateCarousel(
              id!,
              carouselName,
              carouselImg,
              logoImg,
              discountText
            )
          : await createCarousel(
              carouselName,
              carouselImg,
              logoImg,
              discountText
            );

      if (success) {
        setCarouselName("");
        setCarouselImg("");
        setLogoImg("");
        setDiscountText("");
        dialog.close();
        setLoading(false);
        toast({
          title: `${id != null ? "Updated" : "Created"} carousel`,
          description: `Carousel ${
            id != null ? "updated" : "created"
          } successfully`,
        });
      } else {
        toast({
          title: `Error ${id != null ? "updating" : "creating"} carousel`,
          description: `An error occured while ${
            id != null ? "updating" : "creating"
          } carousel`,
          variant: "destructive",
        });
        setLoading(false);
      }
    } else {
      toast({
        title: "Error",
        description: "All fields are required",
        variant: "destructive",
      });
    }
  }

  return (
    <Dialog open={dialog?.state}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {id != null ? "Edit carousel" : "Create a new carousel"}
          </DialogTitle>
        </DialogHeader>
        <div className="flex items-center flex-col gap-1">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="carouselName" className="sr-only">
              Carousel Name
            </Label>
            <Input
              id="carouselName"
              type="text"
              placeholder="Carousel Name"
              required
              value={carouselName}
              className={
                carouselName.length > 0
                  ? "border-primary"
                  : "border-red-500 border-2 outline-none"
              }
              onChange={(e) => setCarouselName(e.target.value)}
            />
          </div>
          <div className="grid flex-1 gap-2">
            <Label htmlFor="carouselImg" className="sr-only">
              Carousel Image URL
            </Label>
            <Input
              id="carouselImg"
              type="text"
              placeholder="Carousel Image URL"
              required
              value={carouselImg}
              className={
                carouselImg.length > 0
                  ? "border-primary"
                  : "border-red-500 border-2 outline-none"
              }
              onChange={(e) => setCarouselImg(e.target.value)}
            />
          </div>
          <div className="grid flex-1 gap-2">
            <Label htmlFor="logoImg" className="sr-only">
              Logo Image URL
            </Label>
            <Input
              id="logoImg"
              type="text"
              placeholder="Logo Image URL"
              required
              value={logoImg}
              className={
                logoImg.length > 0
                  ? "border-primary"
                  : "border-red-500 border-2 outline-none"
              }
              onChange={(e) => setLogoImg(e.target.value)}
            />
          </div>
          <div className="grid flex-1 gap-2">
            <Label htmlFor="discountText" className="sr-only">
              Discount Text
            </Label>
            <Input
              id="discountText"
              type="text"
              placeholder="Discount Text"
              required
              value={discountText}
              className={
                discountText.length > 0
                  ? "border-primary"
                  : "border-red-500 border-2 outline-none"
              }
              onChange={(e) => setDiscountText(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter className="justify-end">
          <Button
            type="button"
            variant="secondary"
            onClick={() => dialog.close()}
          >
            Close
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? (
              <div className="animate-spin px-6">
                <AiOutlineLoading3Quarters />
              </div>
            ) : (
              "Create"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddCarouselCard;
