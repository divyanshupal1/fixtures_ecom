"use client";
import React from 'react';
import { useCategoryStore } from '@/store/productStore';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useToast } from '@/components/ui/use-toast';
import axiosInstance from '@/lib/axiosInstance';
import { ImageSelector } from '../../addproduct/component';

type AddCategoryProps = {
  id:string|null,
  dialog:{
    state:boolean,
    open:()=>void,
    close:()=>void
  }
}

const uploadImage = async (img:File | null | undefined | string) => {
  console.log("Uploading Image")
  let imageForm = new FormData();
  imageForm.append("image", img!);

  const res = await axiosInstance.post("/ecommerce/assets/image", imageForm ,{
    headers: {
      "Content-Type": "multipart/form-data",
    }
  });
  if (res){
    console.log(res.data.url)
    return res.data.url
  }
  else return ""
}

export const AddCategory = ({ id, dialog }: AddCategoryProps) => {

  const { createCategory, updateCategory, categories } = useCategoryStore((state) => ({
    createCategory: state.createCategory,
    updateCategory: state.updateCategory,
    categories: state.categories
  }));

  const { toast } = useToast();
  const [name, setName] = React.useState("");
  const [svgImage,setSvgImage]= React.useState("");
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (id != null) {
      setName(categories[id].name);
      setSvgImage(categories[id].svgImage);
    } else {
      setName("");
      setSvgImage("");
    }
  }, [id, categories]);

  async function handleSubmit() {
    if (name.length > 0) {
      setLoading(true);
      let success = id != null ? await updateCategory(id!, name,svgImage) : await createCategory(name,svgImage);
      if (success) {
        setName("");
        dialog.close();
        setLoading(false);
        toast({
          title: `${id != null ? "Updated" : "Created"} category`,
          description: `Category ${id != null ? "updated" : "created"} successfully`,
        });
      } else {
        toast({
          title: `Error ${id != null ? "updating" : "creating"} category`,
          description: `An error occured while ${id != null ? "updating" : "creating"} category`,
          variant: "destructive",
        });
        setLoading(false);
      }

    }
  }

  const onImageChange = async (i:File|string|null|undefined
  ) => {
    if (i) {
      const url = await uploadImage(i);
      setSvgImage(url);
    }
  }

  return (
    <Dialog open={dialog?.state}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{id != null ? "Edit category" : "Create a new category"}</DialogTitle>
        </DialogHeader>
        <div className="flex items-center flex-col gap-1">
          <div className="flex flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Name
            </Label>
            <Input
              id="link"
              type="text"
              placeholder="Category Name"
              required
              value={name}
              className={name.length > 0 ? "border-primary" : "border-red-500 border-2 outline-none"}
              onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="grid flex-1 gap-2 relative">
            <Label htmlFor="link" className="sr-only">
              svgImage
            </Label>
            <ImageSelector image={svgImage || ""} onChange={(i)=>onImageChange(i)} scale={1}/>
          </div>
        </div>
        <DialogFooter className="justify-end">
          <Button type="button" variant="secondary" onClick={() => dialog.close()}>
            Close
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>{loading ? <div className='animate-spin px-6'><AiOutlineLoading3Quarters /></div> : id != null ? "Update" : `Create`}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
