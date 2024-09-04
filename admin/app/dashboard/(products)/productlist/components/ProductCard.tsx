/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  useCategoryStore,
  useProductStore,
  DetailedProduct,
} from "@/store/productStore";
import { MdDelete, MdEdit, MdFileDownload } from "react-icons/md";
import { Button, buttonVariants } from "@/components/ui/button";
import { useRouter } from "next/navigation";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HiDotsVertical } from "react-icons/hi";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { jsPDF } from "jspdf";
import JsBarcode from "jsbarcode";

export function ProductCard({
  product,
  selectHandle,
  selected,
}: {
  product: DetailedProduct;
  selectHandle: (id: string) => void;
  selected: boolean;
}) {
  const router = useRouter();
  const { categories } = useCategoryStore((state) => ({
    categories: state.categories,
  }));
  const { deleteProduct } = useProductStore((state) => ({
    deleteProduct: state.deleteProduct,
  }));
  const [loading, setLoading] = React.useState(false);
  const { toast } = useToast();
  const [deleteAlertActive, setDeleteAlertActive] = React.useState(false);

  const handleEdit = () => {
    router.push(`/dashboard/addproduct?id=${product._id}`);
  };

  const handleDelete = async () => {
    setDeleteAlertActive(false);
    setLoading(true);
    const res = await deleteProduct(product._id);
    if (res) {
      setLoading(false);
      toast({
        title: "Product Deleted",
        description: "The product has been deleted successfully",
      });
    } else {
      setLoading(false);
      toast({
        title: "Product Deletion Failed",
        description: "The product could not be deleted",
        variant: "destructive",
      });
    }
  };

  const generatePdf = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "in",
      format: [2, 1.2],
    });

    const margin = 0.1;
    const lineHeight = 0.2;
    const barcodeCanvas = document.createElement("canvas");

    // Generate a random barcode number
    const randomBarcode = Math.floor(
      100000000000000 + Math.random() * 900000000000000
    ).toString();
    JsBarcode(barcodeCanvas, randomBarcode, { format: "CODE128" });
    const barcodeDataUrl = barcodeCanvas.toDataURL("image/png");

    doc.setTextColor(128, 128, 128);

    doc.setFontSize(4.45);
    doc.setFont("helvetica", "bold");
    doc.text(`${product.name}`, margin, lineHeight);

    doc.setFontSize(6);
    doc.text(`MRP: ${product.price}`, margin, margin + 1.5 * lineHeight);

    doc.setFontSize(5);
    doc.setFont("helvetica", "bold");
    let categoryText = `${categories[product.category]?.name || "N/A"}`;
    let productIdText = randomBarcode; // Use the generated random barcode as the product ID
    doc.text(categoryText, margin, margin + 3 * lineHeight);

    let categoryTextWidth = doc.getTextWidth(categoryText);
    doc.text(categoryText, margin, margin + 2.0 * lineHeight);
    doc.text(
      productIdText,
      margin + categoryTextWidth + 0.1,
      margin + 2.5 * lineHeight
    );

    doc.addImage(
      barcodeDataUrl,
      "PNG",
      margin,
      margin + 2.5 * lineHeight,
      1.6,
      0.3
    );

    const currentDate = new Date().toLocaleDateString();
    doc.setFontSize(4);
    doc.setFont("helvetica", "normal");
    doc.text(`Date: ${currentDate}`, margin, margin + 4.5 * lineHeight);

    doc.setFontSize(5);
    doc.text(
      `Thank you for purchasing from Aquaso.com, Visit Again :)`,
      margin,
      margin + 5.0 * lineHeight
    );

    doc.save(`${product.name}_MRP_Tag.pdf`);
  };

  return (
    <div
      key={product._id}
      className="w-full drop-shadow-md h-[100px] max-sm:h-auto bg-white dark:bg-primary-foreground p-2 px-6 max-sm:px-2 rounded-md flex items-center max-sm:flex-col max-sm:justify-center relative"
    >
      <AlertDialog open={deleteAlertActive}>
        <AlertDialogContent className="border-border">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              product.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteAlertActive(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className={cn(
                buttonVariants({ variant: "destructive" }),
                "relative"
              )}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="w-[3%] flex justify-start max-sm:absolute max-sm:top-2 max-sm:left-2 max-sm:bg-primary-foreground max-sm:rounded-br-md max-sm:pb-1.5 max-sm:pr-1.5 max-sm:w-auto">
        <Checkbox
          checked={selected}
          onCheckedChange={() => selectHandle(product._id)}
        />
      </div>
      <div className="w-1/12 max-sm:w-full h-5/6 max-sm:h-auto flex justify-start ml-3 max-sm:ml-0">
        <img
          src={product.mainImage}
          className="h-full rounded-md"
          alt="product-image"
        />
      </div>
      <div className="w-3/12 max-sm:w-full h-full flex flex-col justify-start pt-2 pl-2 overflow-hidden text-ellipsis whitespace-nowrap">
        <p className="font-semibold">{product.name}</p>
        <p
          className="max-sm:hidden"
          dangerouslySetInnerHTML={{ __html: product.description }}
        ></p>
      </div>
      <div className="w-[11%] flex justify-center max-sm:w-full max-sm:inline">
        <p className="text-sm font-semibold">
          <span className="sm:hidden pl-2">Price : </span>₹ {product.price}
        </p>
      </div>
      <div className="w-[11%] flex justify-center max-sm:w-full max-sm:inline">
        <p className="text-sm font-semibold">
          <span className="sm:hidden pl-2">Stock : </span>
          {product.stock}
        </p>
      </div>
      <div className="w-[11%] flex justify-center max-sm:w-full max-sm:inline">
        <p className="text-sm font-semibold">
          <span className="sm:hidden pl-2">Variants : </span>
          {product.variants.length}
        </p>
      </div>
      <div className="w-2/12 flex justify-center max-sm:w-full items-center max-sm:justify-start">
        <span className="sm:hidden pl-2 text-sm font-semibold">
          Category :{" "}
        </span>
        <div className="px-2 p-1 bg-yellow-50 dark:bg-yellow-700 rounded-md text-sm font-semibold">
          {categories[product.category]?.name}
        </div>
      </div>
      <div className="w-2/12 flex justify-center max-sm:w-full max-sm:inline">
        <p className="text-sm font-semibold">
          <span className="sm:hidden pl-2">Updated : </span>
          {new Date(product.updatedAt).toLocaleDateString()}
        </p>
      </div>
      <div className="w-1/12 flex justify-center max-sm:absolute max-sm:bottom-[10px] max-sm:right-[10px] gap-x-3">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <HiDotsVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="max-w-[100px]">
            <DropdownMenuItem onClick={handleEdit}>
              <div className="scale-100 mr-3">
                <MdEdit />
              </div>{" "}
              Edit{" "}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDeleteAlertActive(true)}>
              <div className="scale-100 mr-3">
                <MdDelete />
              </div>{" "}
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          onClick={generatePdf}
          className="text-xs flex items-center justify-center p-2"
        >
          <MdFileDownload size={24} /> {/* Adjust size as necessary */}
        </Button>
      </div>
    </div>
  );
}

export function ProductHeader() {
  return (
    <div className="w-full rounded-md flex items-center  p-3 px-6 sticky top-0 z-20 backdrop-blur-md max-sm:hidden">
      <div className="w-[3%] flex justify-start">{/* <Checkbox onse /> */}</div>
      <div className="w-3/12 flex pl-6 justify-start">
        <p className="text-sm font-semibold">Details</p>
      </div>
      <div className="w-[11%] flex justify-center">
        <p className="text-sm font-semibold">Price</p>
      </div>
      <div className="w-[11%] flex justify-center">
        <p className="text-sm font-semibold">Stock</p>
      </div>
      <div className="w-[11%] flex justify-center">
        <p className="text-sm font-semibold">Variants</p>
      </div>
      <div className="w-2/12 flex justify-center">
        <p className="text-sm font-semibold">Category</p>
      </div>
      <div className="w-2/12 flex justify-center">
        <p className="text-sm font-semibold">Last Updated</p>
      </div>
      <div className="w-1/12 flex justify-center">
        <p className="text-sm font-semibold">Actions</p>
      </div>
    </div>
  );
}
