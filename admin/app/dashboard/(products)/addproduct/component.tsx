/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { CategorySelector } from "../productlist/components/CategorySelector";
import { FiUploadCloud } from "react-icons/fi";
import WYSIWYG from "@/components/WYSIWYG";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axiosInstance";
import { useToast } from "@/components/ui/use-toast";
import { useProductStore } from '@/store/productStore'

type Product = {
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  mainImage: File | null | string | undefined;
};

const Page = () => {

  const router = useRouter();
  const searchParams = useSearchParams();
  let edit = searchParams.get("id") || undefined;
  const { toast } = useToast()

  const { addProduct, fetchProductByID, updateProduct } = useProductStore((state) => ({
    addProduct: state.addProduct,
    fetchProductByID: state.fetchProductByID,
    updateProduct: state.updateProduct,
  }))

  const [loading, setLoading] = React.useState(false);

  const [subImages, setSubImages] = React.useState<Record<number, File | null | undefined | string>>({ 1: null, 2: null, 3: null, 4: null });
  const [product, setProduct] = React.useState<Product>({
    name: "",
    category: "",
    price: 0,
    stock: 0,
    description: "",
    mainImage: null,
  });
  // const modifyProduct = (key: string, value: any) => {
  //   setProduct({ ...product, [key]: value });
  // };

  const createFormData = () => {
    let productForm = new FormData();
    productForm.append("name", product.name);
    productForm.append("category", product.category);
    productForm.append("price", product.price.toString());
    productForm.append("stock", product.stock.toString());
    productForm.append("description", product.description);
    typeof product.mainImage != 'string' && productForm.append("mainImage", product.mainImage!);
    Object.keys(subImages).forEach((value) => {
      (subImages[Number(value)] != null && typeof subImages[Number(value)] != 'string' ) ? productForm.append(`subImage${value}`, subImages[Number(value)] || "") : "";
    });
    return productForm;
  }
  const submitProduct = async () => {
    setLoading(true);
    let productForm = createFormData();
    const res = edit? await updateProduct(edit,productForm) :await addProduct(productForm);
    if (res) {
      toast({
        title: `Product ${edit?"edited":"added"} successfully`,
        description: `Product ${product.name} ${edit?"edited":"added"} successfully`,
      });
      clear()
      setLoading(false);
    } else {
      toast({
        title: `Error ${edit?"editing":"adding"} product`,
        description: `An error occured while ${edit?"editing":"adding"} product`,
        variant: "destructive",
      });
      setLoading(false);
    }
  }
  const clear = () => {
    edit ? router.push("/dashboard/addproduct") :
    setProduct(() => ({
      name: "",
      category: "",
      price: 0,
      stock: 0,
      description: "",
      mainImage: null,
    }));
    setSubImages({ 1: null, 2: null, 3: null, 4: null })
  }


  useEffect(() => {
    if (edit) {
      fetchProductByID(edit).then((res) => {
        console.log(res)
        if (typeof res !== 'boolean') {
          setProduct({name:res.name,category:res.category,price:res.price,stock:res.stock,description:res.description,mainImage:res.mainImage.url});
          const subImg = res.subImages.reduce((acc: any, curr: any, index: number) => {
            acc[index + 1] = curr.url
            return acc
          }, {})
          setSubImages(subImg)
        }
      })
    }
  }, [edit])


  return (
    <>
      <div className="flex max-sm:items-start justify-between items-center w-full mb-5 px-5 pt-8 rounded-xl">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            {edit ? "Edit Product" : "Add Product"}
          </h2>
          <h6 className="opacity-80">{edit ? "Edit a product" : "Add Product to the store"}</h6>
        </div>
        <div className="flex items-center gap-x-3"><Input className=" border-2 border-slate-950 bg-card" value={edit} placeholder="Enter product id" /><Button>Edit Product</Button></div>
      </div>
      <div className="px-5 pr-3 max-sm:px-2 flex flex-col gap-x-3 w-full h-full">
        <div className="rounded-lg p-2 bg-card bg-opacity-40 shadow-md mb-3 ">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="dets flex flex-col  bg-opacity-20 p-4 w-full md:w-1/2 space-y-5 ">
              <div className="flex flex-col gap-3">
                <Label className="text-base">Product Name</Label>
                <Textarea
                  placeholder="Product Name"
                  value={product.name}
                  onChange={(e) => setProduct((prev)=>({...prev,"name": e.target.value}))}
                />
              </div>
              <div className="flex flex-col gap-3">
                <Label className="text-base">Category</Label>
                <CategorySelector
                  value={product.category}
                  handleChange={(val) => setProduct((prev)=>({...prev,"category": val}))}
                />
              </div>
              <div className="flex gap-x-5 w-full">
                <div className="flex flex-col gap-3 w-1/2">
                  <Label className="text-base">Price</Label>
                  <Input
                    type="number"
                    placeholder="Price"
                    value={product.price}
                    onChange={(e) => setProduct((prev)=>({...prev,"price": Number(e.target.value)}))}
                  />
                </div>
                <div className="flex flex-col gap-3 w-1/2">
                  <Label className="text-base">Stock</Label>
                  <Input
                    type="number"
                    placeholder="Stock"
                    value={product.stock}
                    onChange={(e) => setProduct((prev)=>({...prev,"stock": Number(e.target.value)}))}
                  />
                </div>
              </div>
              <div className="w-full flex flex-col gap-3 h-max grow">
                <Label className="text-base">Description</Label>
                {/* <WYSIWYS value={description} setValue={setDescription}/> */}
                <WYSIWYG
                  value={product.description}
                  setValue={(val) =>setProduct((prev)=>({...prev,"description": val})) }
                />
                {/* <Textarea className='h-96' placeholder="Product Description" /> */}
              </div>
            </div>
            <div className="dets flex flex-col bg-opacity-40 p-4 w-full md:w-1/2 space-y-5">
              <div className="w-full flex flex-col gap-3">
                <Label className="text-base">Main image</Label>
                <div className="h-72 w-full">
                  {" "}
                  <ImageSelector
                    image={product.mainImage}
                    onChange={(img) => setProduct((prev)=>({...prev,"mainImage": img}))}
                    scale={3}
                  />{" "}
                </div>
              </div>
              <div className="flex flex-col gap-3 h-full">
                <Label className="text-base">Sub Images <span className="text-xs opacity-70">( Maximum 4 allowed )</span> </Label>
                <div className={`w-full h-full flex flex-col gap-y-4 relative `}>
                  <div className="flex gap-x-4 w-full">
                    <div className='w-1/2 h-44'>
                      <ImageSelector
                        image={subImages[1]}
                        onChange={(img) => setSubImages({ ...subImages, 1: img })}
                        scale={3}
                      />
                    </div>
                    <div className='w-1/2 h-44'>
                      <ImageSelector
                        image={subImages[2]}
                        onChange={(img) => setSubImages({ ...subImages, 2: img })}
                        scale={3}
                      />
                    </div>
                  </div>
                  <div className="flex gap-x-4 w-full">
                    <div className='w-1/2 h-44'>
                      <ImageSelector
                        image={subImages[3]}
                        onChange={(img) => setSubImages({ ...subImages, 3: img })}
                        scale={3}
                      />
                    </div>
                    <div className='w-1/2 h-44'>
                      <ImageSelector
                        image={subImages[4]}
                        onChange={(img) => setSubImages({ ...subImages, 4: img })}
                        scale={3}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-end gap-x-4 p-2">
            <Button className="" variant={`secondary`} onClick={clear}>
              Clear
            </Button>
            <Button className="" onClick={submitProduct} disabled={loading} loading={loading}>
              Save Product
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

const ImageSelector = ({
  image,
  multiple = false,
  onChange,
  scale,
  disabled = false,
  imgRef
}: {
  multiple?: boolean;
  image: File | null | undefined | Blob | string;
  onChange?: (i: File | null | undefined) => void;
  scale: number;
  disabled?: boolean;
  imgRef?: React.RefObject<HTMLInputElement>;
}) => {

  return (
    <div className="w-full h-full border-border overflow-hidden flex flex-col gap-y-6 justify-center items-center relative border-4 border-dotted rounded-xl">
      {!disabled && <Input
        ref={imgRef}
        type="file"
        accept="image/png, image/jpeg"
        className="h-full w-full opacity-0 absolute z-10"
        onChange={(e) => {
          onChange && onChange(e.target.files?.item(0));
        }}
      />}
      {image ? (
        <ImagePreview image={image} border={false} />
      ) : (
        <InputImagePlaceholder scale={scale} />
      )}
    </div>
  );
};

export default Page;


const ImagePreview = ({ image, border = true }: { image: Blob | string, border?: boolean }) => {
  return (
    <div className={`w-full h-full ${border ? "border-4 border-border border-dotted rounded-xl p-1" : ""}`}>
      {image && <img
        src={typeof image == 'string' ? image : URL.createObjectURL(image)}
        alt="Main Image"
        className="w-full h-full"
      />}
    </div>
  )
}
const InputImagePlaceholder = ({ scale }: { scale?: number }) => {
  return (
    <>
      <div className={`scale-[${scale}]`}>
        <FiUploadCloud />
      </div>
      <p className="w-1/2 text-center">Drag and drop or click to upload</p>
    </>
  )
}