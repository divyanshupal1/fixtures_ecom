"use client";
import React from "react";
import { useCategoryStore } from "@/store/productStore";
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

type AddCategoryProps = {
  id: string | null;
  dialog: {
    state: boolean;
    open: () => void;
    close: () => void;
  };
};

export const AddCategory = ({ id, dialog }: AddCategoryProps) => {
  const { createCategory, updateCategory, categories } = useCategoryStore(
    (state) => ({
      createCategory: state.createCategory,
      updateCategory: state.updateCategory,
      categories: state.categories,
    })
  );

  const { toast } = useToast();
  const [name, setName] = React.useState("");
  const [svgImage, setSvgImage] = React.useState("");
  const [hsCode, setHsCode] = React.useState(""); // New state for HS Code
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (id != null) {
      setName(categories[id].name);
      setSvgImage(categories[id].svgImage);
      setHsCode(categories[id].hsCode || ""); // Load HS Code if it exists
    } else {
      setName("");
      setSvgImage("");
      setHsCode("");
    }
  }, [id, categories]);

  async function handleSubmit() {
    if (name.length > 0 && hsCode.length === 4) {
      // Ensure HS Code is exactly 4 digits
      setLoading(true);
      let success =
        id != null
          ? await updateCategory(id!, name, svgImage, hsCode)
          : await createCategory(name, svgImage, hsCode);
      if (success) {
        setName("");
        setSvgImage("");
        setHsCode("");
        dialog.close();
        setLoading(false);
        toast({
          title: `${id != null ? "Updated" : "Created"} category`,
          description: `Category ${
            id != null ? "updated" : "created"
          } successfully`,
        });
      } else {
        toast({
          title: `Error ${id != null ? "updating" : "creating"} category`,
          description: `An error occurred while ${
            id != null ? "updating" : "creating"
          } category`,
          variant: "destructive",
        });
        setLoading(false);
      }
    } else {
      toast({
        title: "Validation Error",
        description: "Please ensure the HS Code is exactly 8 digits long",
        variant: "destructive",
      });
    }
  }

  return (
    <Dialog open={dialog?.state}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {id != null ? "Edit category" : "Create a new category"}
          </DialogTitle>
        </DialogHeader>
        <div className="flex items-center flex-col gap-1">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="name" className="sr-only">
              Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Category Name"
              required
              value={name}
              className={
                name.length > 0
                  ? "border-primary"
                  : "border-red-500 border-2 outline-none"
              }
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid flex-1 gap-2">
            <Label htmlFor="svgImage" className="sr-only">
              SVG Image
            </Label>
            <Input
              id="svgImage"
              type="text"
              placeholder="SVG Image Code"
              required
              value={svgImage}
              className={
                svgImage?.length > 0
                  ? "border-primary"
                  : "border-red-500 border-2 outline-none"
              }
              onChange={(e) => setSvgImage(e.target.value)}
            />
          </div>
          <div className="grid flex-1 gap-2">
            <Label htmlFor="hsCode" className="sr-only">
            </Label>
            <Input
              id="hsCode"
              type="text"
              placeholder="HS Code"
              required
              value={hsCode}
              maxLength={8} // Restrict input to 4 digits
              pattern="\d{4}" // Ensure only digits are entered
              className={
                hsCode.length === 4
                  ? "border-primary"
                  : "border-red-500 border-2 outline-none"
              }
              onChange={(e) => {
                // Ensure only numeric input
                const value = e.target.value.replace(/\D/g, "");
                setHsCode(value);
              }}
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
            ) : id != null ? (
              "Update"
            ) : (
              `Create`
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
