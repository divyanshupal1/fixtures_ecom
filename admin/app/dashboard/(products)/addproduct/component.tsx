"use client"
import React from 'react'
import { useSearchParams } from 'next/navigation'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { CategorySelector } from '../productlist/components/CategorySelector'
import { FiUploadCloud } from "react-icons/fi";
import WYSIWYS from '@/components/WYSIWYS'
import { Button } from '@/components/ui/button'
import axiosInstance from '@/lib/axiosInstance'
// import { subImgContext } from './page'



const Page = () => {

    const searchParams = useSearchParams()
    let edit = searchParams.get('edit') || false

    const [product, setProduct] = React.useState({
        name: '',
        category: '',
        price: 0,
        stock: 0,
        description: '',
        mainImage: null,
        subImages: [null,null,null,null]
    })
    const modifyProduct = (key: string, value: any) => {
        setProduct({ ...product, [key]: value })
    }
    const modifySubImages = (key: number, value: any) => {
        let subImages = product.subImages
        subImages[key] = value
        setProduct({ ...product, subImages: subImages })
    }

    function addProduct() {
        axiosInstance.post('/products', product,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res=>console.log(res))
    }


    return (
        <>
            <div className="flex max-sm:items-start justify-between items-center w-full mb-5 px-5 pt-8 rounded-xl">
                <div>
                    <h2 className="text-2xl font-semibold tracking-tight">
                        {edit ? 'Edit Product' : 'Add Product'}
                    </h2>
                    <h6 className='opacity-80'>Add Products to the store</h6>
                </div>
                <div>
                {/* <CategoryFilter/> */}
                </div>
            </div>
            <div className="px-5 pr-3 max-sm:px-2 flex flex-col gap-x-3 w-full h-full">
                <div className='rounded-lg p-2 bg-card bg-opacity-40 shadow-md mb-3 '>
                    <div className='flex flex-col md:flex-row justify-between'>
                        <div className="dets flex flex-col  bg-opacity-20 p-4 w-full md:w-1/2 space-y-5 ">
                            <div className="flex flex-col gap-3">
                                <Label className='text-base'>Product Name</Label>
                                <Textarea placeholder="Product Name" value={product.name} onChange={(e)=>modifyProduct('name',e.target.value)} />
                            </div>
                            <div className="flex flex-col gap-3">
                                <Label className='text-base'>Category</Label>
                                <CategorySelector value={product.category} handleChange={(val)=>modifyProduct('category',val)} />
                            </div>
                            <div className='flex gap-x-5 w-full'>
                                <div className="flex flex-col gap-3 w-1/2">
                                    <Label className='text-base'>Price</Label>
                                    <Input type="number" placeholder='Price' value={product.price} onChange={(e)=>modifyProduct('price',e.target.value)} />
                                </div>
                                <div className="flex flex-col gap-3 w-1/2">
                                    <Label className='text-base'>Stock</Label>
                                    <Input type="number" placeholder='Stock' value={product.stock} onChange={(e)=>modifyProduct('stock',e.target.value)} />
                                </div>
                            </div>
                            <div className="w-full flex flex-col gap-3 h-max grow">
                                <Label className='text-base'>Description</Label>
                                {/* <WYSIWYS value={description} setValue={setDescription}/> */}
                                <WYSIWYS value={product.description} setValue={(val)=>modifyProduct('description',val)}/>
                                {/* <Textarea className='h-96' placeholder="Product Description" /> */}
                                                            
                            </div>
                        </div>
                        <div className="dets flex flex-col bg-opacity-40 p-4 w-full md:w-1/2 space-y-5">
                            <div className="w-full flex flex-col gap-3">
                                <Label className='text-base'>Main image</Label>
                                <div className='h-72 w-full'> <ImageSelector image={product.mainImage} onChange={(img)=>modifyProduct('mainImage',img)} scale={3}/> </div>
                                                            
                            </div>
                            <div className="flex flex-col gap-3">
                                <Label className='text-base'>Sub Images</Label>
                                <div className='w-full flex flex-col gap-y-4 '>
                                    <div className='flex gap-x-4 w-full'>
                                        <div className='w-1/2 h-44'><ImageSelector scale={2} image={product.subImages[0]} onChange={(img)=>modifySubImages(0,img)}/></div>
                                        <div className='w-1/2 h-44'><ImageSelector scale={2} image={product.subImages[1]} onChange={(img)=>modifySubImages(1,img)}/></div>                             
                                    </div>
                                    <div className='flex gap-x-4 w-full'>
                                        <div className='w-1/2 h-44'><ImageSelector scale={2} image={product.subImages[2]} onChange={(img)=>modifySubImages(2,img)}/></div>
                                        <div className='w-1/2 h-44'><ImageSelector scale={2} image={product.subImages[3]} onChange={(img)=>modifySubImages(3,img)}/></div>                             
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-full flex justify-end gap-x-4 p-2'>
                        <Button className='' variant={`secondary`}>Clear</Button>
                        <Button className='' onClick={addProduct}>Add Product</Button>
                    </div>
                </div>
            </div>
        </>
    )
}



const ImageSelector = ({image,onChange,scale}:{image:File|null|undefined,onChange:(i:File|null|undefined)=>void,scale:number}) => {
    console.log(image)
    return (
            <div className='w-full h-full border-border overflow-hidden flex flex-col gap-y-6 justify-center items-center relative border-4 border-dotted rounded-xl'>
                <Input type='file' className='h-full w-full opacity-0 absolute z-10' onChange={(e)=>{
                    onChange(e.target.files?.item(0))
                }}/>
                {
                    image ?                    
                    <div>
                        <img src={URL.createObjectURL(image)} alt="Main Image" className='w-full h-full' />
                    </div>
                    :
                    <>
                        <div className={`scale-[${scale}]`}><FiUploadCloud/></div>
                        <p className='w-1/2 text-center'>Drag and drop or click to upload</p>
                    </>
                    
                    
                }
            </div>                            
    )
}


export default Page