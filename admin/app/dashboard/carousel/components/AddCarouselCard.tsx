import React from 'react';
import axios from 'axios';
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
import { CarouselMain, useCarouselStore } from "@/store/productStore";
import axiosInstance from "@/lib/axiosInstance";

type AddCarouselProps = {
  id: string | null;
  dialog: {
    state: boolean;
    open: () => void;
    close: () => void;
  };
};

const AddCarouselCard = ({ id, dialog }: AddCarouselProps) => {
  const { createCarousel, updateCarousel } = useCarouselStore((state) => ({
    createCarousel: state.createCarousel,
    updateCarousel: state.updateCarousel
  }));

  const { toast } = useToast();
  const [carouselName, setCarouselName] = React.useState("");
  const [carouselImg, setCarouselImg] = React.useState<File | null>(null);
  const [logoImg, setLogoImg] = React.useState<File | null>(null);
  const [discountText, setDiscountText] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const uploadImage = async (img: File | null, key: keyof CarouselMain) => {
    if (!img) return "";
    console.log("Uploading Image");
    let formData = new FormData();
    formData.append("image", img);

    try {
      const res = await axiosInstance.post("/ecommerce/assets/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });
      console.log(res.data.url);
      return res.data.url;
    } catch (error) {
      console.error("Upload failed:", error);
      return "";
    }
  };

  async function handleSubmit() {
    setLoading(true);
    if (carouselName && carouselImg && logoImg && discountText) {
      const carouselImgUrl = await uploadImage(carouselImg, "carouselImage");
      const logoImgUrl = await uploadImage(logoImg, "logoImages");

      if (carouselImgUrl && logoImgUrl) {
        const success = id ? await updateCarousel(id, carouselName, carouselImgUrl, logoImgUrl, discountText)
          : await createCarousel(carouselName, carouselImgUrl, logoImgUrl, discountText);

        if (success) {
          setCarouselName("");
          setCarouselImg(null);
          setLogoImg(null);
          setDiscountText("");
          dialog.close();
          setLoading(false);
          toast({
            title: id ? "Updated Carousel" : "Created Carousel",
            description: `Carousel ${id ? "updated" : "created"} successfully`,
          });
        }
      } else {
        setLoading(false);
      }
    } else {
      toast({
        title: "Error",
        description: "All fields are required",
        variant: "destructive",
      });
      setLoading(false);
    }
  }

  return (
    <Dialog open={dialog.state}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{id ? "Edit Carousel" : "Create New Carousel"}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-1">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="carouselName">Carousel Name</Label>
            <Input
              id="carouselName"
              type="text"
              placeholder="Enter Carousel Name"
              required
              value={carouselName}
              onChange={(e) => setCarouselName(e.target.value)}
            />
            <Label htmlFor="carouselImg">Carousel Image</Label>
            <Input
              id="carouselImg"
              type="file"
              required
              onChange={(e) => setCarouselImg(e.target.files ? e.target.files[0] : null)}
            />
            <Label htmlFor="logoImg">Logo Image</Label>
            <Input
              id="logoImg"
              type="file"
              required
              onChange={(e) => setLogoImg(e.target.files ? e.target.files[0] : null)}
            />
            <Label htmlFor="discountText">Discount Text</Label>
            <Input
              id="discountText"
              type="text"
              placeholder="Enter Discount Text"
              required
              value={discountText}
              onChange={(e) => setDiscountText(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter className="justify-end">
          <Button type="button" variant="secondary" onClick={dialog.close}>Close</Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? (
              <div className="animate-spin px-6">
                <AiOutlineLoading3Quarters />
              </div>
            ) : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddCarouselCard;
