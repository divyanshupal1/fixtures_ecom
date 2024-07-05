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
import { useToast } from "@/components/ui/use-toast";
import { useProductStore ,Product, ProductVariant } from '@/store/productStore'
import { MdCancel, MdDelete } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import axiosInstance from "@/lib/axiosInstance";


const initialProduct: Product = {
  name: "",
  category: "",
  price: 0,
  stock: 0,
  description: "",
  mainImage: "",
  variants: []
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
  const [active, setActive] = React.useState(-1);
  const [product, setProduct] = React.useState<Product>(initialProduct);
  // const [variants, setVariant] = React.useState<Product[]>([]);

  const submitProduct = async () => {
    setLoading(true);
    let productForm = product;
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
    ()=>{
      setProduct(() => initialProduct);
      setActive(-1);
    }
  }

  const addVariant = () => {
    if(!product.variants) return
    let variants = product.variants || []
    variants.push({name:"",price:0,stock:0,description:"",mainImage:"",subImages:[]})
    setProduct((prev)=>({...prev,variants:variants}))
  }

  const removeVariant = (index:number) => {
    console.log(index,"index")
    if(!product.variants) return    
    let vars = product.variants || []
    vars.splice(index,1)
    if(active==0 && vars.length==0) setActive(-1) 
    else if (active>vars.length-1) setActive((prev)=>prev-1)
    setProduct({...product,variants:vars})
  }

  const handleProductUpdate = (key:keyof Product,value:string|number|symbol|any) =>{
    if(active==-1){
      setProduct((prev)=>({...prev,[key]:value}))
    }
    else{
      let vars = product.variants || []
      vars[active] = {...vars[active],[key]:value}
      setProduct((prev)=>({...prev,variants:vars}))
    }
  }

  console.log(product)
  console.log(active)

  useEffect(() => {
    if (edit) {
      fetchProductByID(edit).then((res) => {
        console.log(res)
        if (typeof res !== 'boolean') {
          setProduct({
            name:res.name,
            category:res.category,
            price:res.price,
            stock:res.stock,
            description:res.description,
            mainImage:res.mainImage,
            subImages:res.subImages,
            variants: res.variants 
          });
        }
      })
    }
  }, [edit,fetchProductByID])

  
  return (
    <>
      <div className="flex max-sm:items-start max-sm:flex-col justify-between items-center w-full mb-5 px-5 pt-8 rounded-xl">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            {edit ? "Edit Product" : "Add Product"}
          </h2>
          <h6 className="opacity-80">{edit ? "Edit a product" : "Add Product to the store"}</h6>
        </div>
        <div className="flex items-center gap-x-3 max-sm:hidden"><Input className=" border-2 border-slate-950 bg-card" value={edit} placeholder="Enter product id" /><Button>Edit Product</Button></div>
      </div>
      <div className="px-5 pr-3 max-sm:px-2 pt-0 flex flex-col w-full h-full">
        <div className="w-full flex bg-card rounded-t-md p-2 items-center">
          <div className="flex  gap-x-2 overflow-x-scroll w-full small-scrollbar  pb-1">
            <div className={` p-1.5 px-4 shrink-0  w-fit rounded-lg cursor-pointer ${active==-1?'bg-primary text-primary-foreground ':"bg-secondary text-card-foreground"}`} onClick={()=>setActive(-1)}>Main Product</div>
            {
              product.variants && active!=undefined && product.variants.map((variant, index) => (
                <div key={index} 
                className={` p-1.5 px-3 shrink-0 relative cursor-pointer w-fit rounded-lg flex gap-x-3 items-center justify-between overflow-hidden ${active==index?'bg-primary text-primary-foreground':"bg-secondary"}` } 
                
                >
                  <div className="z-20 pointer-events-none">Variant {index+1}</div>
                  <div className="rounded-full scale-105 hover:bg-red-100 hover:text-red-500 z-20" onClick={()=>removeVariant(index)}><IoClose/></div>
                  <div className="absolute w-full h-full left-0 z-10" onClick={()=>setActive(index)}></div>
                </div>
              ))
            }
          </div>
          <div className="w-auto pl-2 pb-2 ">
          <Button className="self-end ml-auto" variant={`secondary`} onClick={addVariant}>
              Add Variant
          </Button>
          </div>
        </div>
        <div className="rounded-lg rounded-t-none p-2 pt-0 bg-card bg-opacity-40 shadow-md mb-3 ">
          <AddProductForm product={active==-1?product:(product.variants ? product.variants[active] : initialProduct)} setProduct={handleProductUpdate} index={active}/>
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
  image: string;
  onChange?: (i: File | null | undefined|string) => void;
  scale: number;
  disabled?: boolean;
  imgRef?: React.RefObject<HTMLInputElement>;
}) => {
  console.log(image,"image")

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


function AddProductForm({product,setProduct,index}:{
  product:Product ,
  setProduct: (key:keyof Product,s:string|number|symbol|any|null|undefined|File)=>void,
  index:number
}) {


  const uploadImage = async (img:File | null | undefined | string,key:keyof Product,index?:number) => {
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
      if(index!=undefined){
        let vars = product.subImages || []
        vars[index] = res.data.url
        setProduct("subImages",vars)
      }
      else setProduct(key,res.data.url)
    }
    else return ""
  }

  return (
    <div className="flex flex-col md:flex-row justify-between">
    <div className="dets flex flex-col  bg-opacity-20 p-4 w-full md:w-1/2 space-y-5 ">
      <div className="flex flex-col gap-3">
        <Label className="text-base">Product Name</Label>
        <Textarea
          placeholder="Product Name"
          value={product.name}
          onChange={(e) => setProduct("name", e.target.value)}
        />
      </div>
      {index==-1 && <div className="flex flex-col gap-3">
        <Label className="text-base">Category</Label>
        <CategorySelector
          value={product?.category||""}
          handleChange={(val) => setProduct("category", val)}
        />
      </div>}
      <div className="flex gap-x-5 w-full">
        <div className="flex flex-col gap-3 w-1/2">
          <Label className="text-base">Price</Label>
          <Input
            type="number"
            placeholder="Price"
            value={product.price}
            onChange={(e) => setProduct("price",Number(e.target.value))}
          />
        </div>
        <div className="flex flex-col gap-3 w-1/2">
          <Label className="text-base">Stock</Label>
          <Input
            type="number"
            placeholder="Stock"
            value={product.stock}
            onChange={(e) => setProduct("stock", Number(e.target.value))}
          />
        </div>
      </div>
      <div className="w-full flex flex-col gap-3 h-max grow">
        <Label className="text-base">Description</Label>
        {/* <WYSIWYS value={description} setValue={setDescription}/> */}
        <WYSIWYG
          value={product.description}
          setValue={(val) =>setProduct("description", val) }
        />
        {/* <Textarea className='h-96' placeholder="Product Description" /> */}
      </div>
    </div>
    <div className="dets flex flex-col bg-opacity-40 p-4 w-full md:w-1/2 space-y-5">
      <div className="w-full flex flex-col gap-3">
        <Label className="text-base">Main image</Label>
        <div className="h-72 w-full">
          
          <ImageSelector
            image={product.mainImage}
            onChange={(img) => uploadImage(img,"mainImage")}
            scale={3}
          />
        </div>
      </div>
      <div className="flex flex-col gap-3 h-full">
        <Label className="text-base">Sub Images <span className="text-xs opacity-70">( Maximum 4 allowed )</span> </Label>
        <div className={`w-full h-full flex flex-col gap-y-4 relative `}>
          <div className="flex gap-x-4 w-full">
            <div className='w-1/2 h-44'>
              <ImageSelector
                image={product.subImages && product?.subImages[0]||""}
                onChange={(img) => uploadImage(img,"subImages",0)}
                scale={3}
              />
            </div>
            <div className='w-1/2 h-44'>
              <ImageSelector
                image={product.subImages && product?.subImages[1]||""}
                onChange={(img) => uploadImage(img,"subImages",1)}
                scale={3}
              />
            </div>
          </div>
          <div className="flex gap-x-4 w-full">
            <div className='w-1/2 h-44'>
              <ImageSelector
                image={product.subImages && product?.subImages[2]||""}
                onChange={(img) => uploadImage(img,"subImages",2)}
                scale={3}
              />
            </div>
            <div className='w-1/2 h-44'>
              <ImageSelector
                image={product.subImages && product?.subImages[3]||""}
                onChange={(img) => uploadImage(img,"subImages",3)}
                scale={3}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}




const ImagePreview = ({ image, border = true }: { image:string, border?: boolean }) => {
  console.log(typeof image," img")
  return (
    <div className={`w-full h-full ${border ? "border-4 border-border border-dotted rounded-xl p-1" : ""}`}>
      {typeof image == 'string' && <img
        src={image}
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