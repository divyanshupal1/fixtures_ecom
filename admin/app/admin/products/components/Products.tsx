/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { IoArrowBack } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoIosMore } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import axiosInstance from "@/lib/axiosInstance";
import { useToast } from "@/components/ui/use-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function Products({
  categories,
  clearCategory,
  category,
}: ProductListProps) {
  const [products, setProducts] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  async function fetchProducts() {
    setLoading(true);
    try {
      const res = await axiosInstance.get(
        "/ecommerce/products/category/" + category._id
      );
      if (res.data.success) {
        const products = res.data.data.reduce(
          (
            acc: Record<string, Record<string, any>>,
            curr: Record<string, any>
          ) => {
            const { _id, ...rest } = curr;
            acc[_id] = { ...rest, _id };
            return acc;
          },
          {}
        );
        const sortedData = Object.keys(products)
          .sort((a, b) => products[a].name.localeCompare(products[b].name))
          .reduce((acc: Record<string, Record<string, any>>, key) => {
            acc[key] = products[key];
            return acc;
          }, {});
        setProducts(sortedData);
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
      toast({
        title: "Sommething went wrong!",
        variant: "destructive",
      });
      setLoading(false);
    }
  }

  useEffect(() => {
    if (category._id) {
      fetchProducts();
    }
  }, [category]);

  if (Object.keys(categories).length == 0) {
    return <></>;
  }
  return (
    <>
      <div className="w-full flex items-center justify-between p-2 max-sm:p-0 max-sm:flex-col max-sm:items-start gap-y-3">
        <div className="flex items-center gap-x-3 ">
          <Button
            className=" rounded-full"
            variant={"outline"}
            onClick={clearCategory}
          >
            <IoArrowBack />
          </Button>
          <div className="text-xl font-semibold tracking-tight pl-2">
            {category && category?.name}
          </div>
        </div>
        <div className="max-sm:absolute right-0 bottom-0 z-40">
          <AddProduct fetchProducts={fetchProducts} categories={categories} />
        </div>
      </div>
      <div className="w-full h-full space-y-3 overflow-x-hidden pr-2 pb-4 mt-2">
        <ProductHeader />
        {loading && (
          <div className="w-full h-full flex justify-center items-center">
            <div className="animate-spin">
              <AiOutlineLoading3Quarters />
            </div>
          </div>
        )}
        {!loading && Object.keys(products).length == 0 && (
          <div className="w-full h-full flex justify-center items-center text-opacity-50">
            No Products Found
          </div>
        )}
        {!loading &&
          Object.keys(products).map((product_id) => (
            <ProductCard
              key={product_id}
              product={products[product_id]}
              category={categories[products[product_id].category]}
            />
          ))}
      </div>
    </>
  );
}

type ProductListProps = {
  categories: Record<string, Record<string, any>>;
  clearCategory: () => void;
  category: Record<string, any>;
};

function ProductHeader() {
  return (
    <div className="w-full rounded-md flex items-center  p-3 px-6 sticky top-0 z-20 backdrop-blur-md max-sm:hidden">
      <div className="w-[3%] flex justify-start">
        <Checkbox />
      </div>
      <div className="w-1/12 flex justify-center">
        <p className="text-sm font-semibold">Image</p>
      </div>
      <div className="w-3/12 flex pl-6 justify-start">
        <p className="text-sm font-semibold">Details</p>
      </div>
      <div className="w-[11%] flex justify-center">
        <p className="text-sm font-semibold">Price</p>
      </div>
      <div className="w-[11%] flex justify-center">
        <p className="text-sm font-semibold">Stock</p>
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
function ProductCard({
  product,
  category,
}: {
  product: Record<string, any>;
  category: Record<string, any>;
}) {
  return (
    <div
      key={product._id}
      className="w-full drop-shadow-md h-[100px] max-sm:h-auto bg-white dark:bg-primary-foreground p-2 px-6 max-sm:px-2 rounded-md flex items-center max-sm:flex-col max-sm:justify-center relative"
    >
      <div className="w-[3%] flex justify-start max-sm:hidden">
        <Checkbox />
      </div>
      <div className="w-1/12 max-sm:w-full h-5/6 max-sm:h-auto flex justify-start ml-3 max-sm:ml-0">
        <img
          src={product.mainImage.url}
          className="h-full rounded-md"
          alt="product-image"
        />
      </div>
      <div className="w-3/12 max-sm:w-full h-full flex flex-col justify-start pt-2 pl-2 overflow-hidden text-ellipsis whitespace-nowrap">
        <p className="font-semibold">{product.name}</p>
        <p className="max-sm:hidden">{product.description}</p>
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
      <div className="w-2/12 flex justify-center max-sm:w-full items-center max-sm:justify-start">
        <span className="sm:hidden pl-2 text-sm font-semibold">
          Category :{" "}
        </span>
        <div className="px-2 p-1 bg-yellow-50 dark:bg-yellow-700 rounded-md text-sm font-semibold">
          {category.name}
        </div>
      </div>
      <div className="w-2/12 flex justify-center max-sm:w-full max-sm:inline">
        <p className="text-sm font-semibold">
          <span className="sm:hidden pl-2">Updated : </span>
          {new Date(product.updatedAt).toLocaleDateString()}
        </p>
      </div>
      <div className="w-1/12 flex justify-center max-sm:absolute max-sm:bottom-[10px] max-sm:right-[20px]">
        <Actions />
      </div>
    </div>
  );
}
function Actions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-primary-foreground p-3 rounded-md hover:bg-primary hover:text-white">
        <IoIosMore />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="gap-x-4 py-2 px-3">
          <div className="scale-150">
            <MdEdit />
          </div>
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-x-4 py-2 px-3">
          <div className="scale-150">
            <FaEye />
          </div>
          View
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-x-4 py-2 px-3">
          <div className="scale-150">
            <MdDelete />
          </div>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function AddProduct({
  edit = false,
  product,
  categories,
  fetchProducts,
}: {
  edit?: boolean;
  product?: Record<string, string>;
  categories?: Record<string, Record<string, string>>;
  fetchProducts: () => void;
}) {
  const [name, setName] = useState(product ? product.name : "");
  const [description, setDescription] = useState(product ? product.name : "");
  const [stock, setStock] = useState(product ? product.stock : 0);
  const [price, setPrice] = useState(product ? product.stock : 1);
  const [category, setCategory] = useState(product ? product.category : "");
  const [mainImage, setMainImage] = useState<File | null>();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);

  function addNewProduct() {
    setLoading(true);
    try {
      axiosInstance
        .post(
          "/ecommerce/products",
          { name, description, stock, price, category, mainImage },
          { headers: { "Content-Type": "multipart/form-data" } }
        )
        .then((res) => {
          if (res.data.success) {
            toast({
              title: "Product Created",
            });
            setName("");
            setLoading(false);
            setDialogOpen(false);
            fetchProducts();
          } else {
            toast({
              title: "Category alreay Exists!",
              variant: "destructive",
            });
            setLoading(false);
          }
        });
    } catch (e) {
      console.log(e);
      toast({
        title: "Sommething went wrong!",
        variant: "destructive",
      });
      setLoading(false);
    }
    setLoading(false);
  }
  function updateCategory() {
    //   setLoading(true)
    //   axiosInstance.patch('/ecommerce/categories/'+category?._id,{name})
    //    .then((res)=>{
    //      if(res.data.success){
    //       toast({
    //         title: "Category Updated",
    //       })
    //       setLoading(false)
    //       setDialogOpen(false)
    //       fetchProducts()
    //      }
    //      else{
    //       toast({
    //         title: "Category alreay exists with same name!",
    //         variant: "destructive",
    //       })
    //       setLoading(false)
    //      }
    //    })
    //    .catch(e=>{
    //      toast({
    //       title: "Sommething went wrong!",
    //       variant: "destructive",
    //      })
    //      setLoading(false)
    //    })
    //   setLoading(false)
  }

  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  console.log(editorState.getCurrentContent().getAllEntities())
  return (
    <Dialog open={dialogOpen}>
      <DialogTrigger asChild>
        <Button
          className="gap-x-3 py-5"
          variant={edit ? "outline" : "default"}
          onClick={() => setDialogOpen(true)}
        >
          {edit ? (
            <div className="scale-125">
              <MdEdit />
            </div>
          ) : (
            <>
              <IoMdAdd className="scale-150" />
              Add Product
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[80%] h-[90%] max-sm:h-full max-sm:w-full flex flex-col gap-y-6">
        <DialogHeader>
          <DialogTitle>
            {edit ? "Edit " + product?.name + " category" : "Add a new product"}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-2 w-full h-full mt-0">
          <div className="w-full sm:flex sm:space-x-3">
            <div className="w-full">
              <InputField
                label="Name"
                placeholder="Product Name"
                value={name}
                onChange={setName}
                type="text"
                required
              />
            </div>
            <div className="w-full flex space-x-3">
              <div className="w-full">
                <InputField
                  label="Price"
                  placeholder="Price"
                  value={price}
                  onChange={setPrice}
                  type="number"
                  required
                />
              </div>
              <div className="w-full">
                <InputField
                  label="Stock"
                  placeholder="Stock"
                  value={stock}
                  onChange={setStock}
                  type="number"
                  required
                />
              </div>
            </div>
          </div>
          <div className="w-full">
            {/* <InputField
              label="Description"
              placeholder="Product Description"
              value={description}
              onChange={setDescription}
              type="text"
            /> */}
            <Editor
              editorState={editorState}
              toolbarClassName="toolbarClassName bg-gray-500 shadow-sm rounded-md p-2"
              wrapperClassName="wrapperClassName shadow-sm  rounded-md p-2"
              editorClassName="editorClassName"
              onEditorStateChange={setEditorState}
            />
          </div>

          <div className="w-full space-y-2">
            <Label>Select Category</Label>
            <Select onValueChange={(val) => setCategory(val)} value={category}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Category" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(categories || {}).map((category_id) => (
                  <SelectItem key={category_id} value={category_id}>
                    {categories && categories[category_id].name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full">
            <Label htmlFor={"mainImage"}>Product Image</Label>
            <Input
              id={"mainImage"}
              type={"file"}
              required
              onChange={(e) =>
                setMainImage(e.target.files ? e.target.files[0] : null)
              }
              className={`${
                0 < 1
                  ? "border-red-500 border-2 outline-none"
                  : "border-primary"
              }`}
            />
          </div>
          <div className="w-full h-16 bg-black">
            {mainImage && (
              <img
                src={mainImage ? URL.createObjectURL(mainImage) : ""}
                alt="product-image"
                className="h-full"
              />
            )}
          </div>
        </div>
        <DialogFooter className="justify-end">
          <Button
            type="button"
            variant="secondary"
            onClick={() => setDialogOpen(!dialogOpen)}
          >
            Close
          </Button>
          <Button
            onClick={edit ? updateCategory : addNewProduct}
            disabled={loading || name?.length == 0}
          >
            {loading ? (
              <div className="animate-spin px-6">
                <AiOutlineLoading3Quarters />
              </div>
            ) : edit ? (
              "Update"
            ) : (
              `Create`
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface InputFieldProps {
  label: string;
  placeholder: string;
  value: string | number;
  onChange: (i: string) => void;
  type: string;
  required?: boolean;
}

const InputField = ({
  label,
  placeholder,
  value,
  onChange,
  type,
  required = false,
}: InputFieldProps) => {
  return (
    <div className="w-full space-y-2">
      <Label htmlFor={label} >{label}</Label>
      <Input
        id={label}
        type={type}
        placeholder={placeholder}
        required
        value={value}
        className={`${
          required && (typeof value == "number" ? value : value.length) < 1
            ? "border-red-500 border-2 outline-none"
            : "border-primary"
        }`}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from 'draft-js'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectDemo() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
