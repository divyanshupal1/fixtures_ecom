/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import React from 'react';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export function Categories({ categories, changeCategory, fetchCategories, loading }: { loading: boolean; fetchCategories: () => void; categories: Record<string, Record<string, any>>; changeCategory: (id: string) => void; }) {
  return (
    <>
      <div className='w-full flex items-center justify-between p-2 max-sm:p-0'>
        <div className='text-xl font-semibold tracking-tight pl-2'>Categories</div>
        <AddCategory fetchCategories={fetchCategories} />
      </div>
      <div className='flex flex-col gap-3 mt-6 overflow-y-scroll w-full pr-2'>
        {Object.keys(categories).length == 0 ?
          <div className='w-full h-full flex justify-center items-center'>
            {loading ? <div className='animate-spin'><AiOutlineLoading3Quarters /></div> : <div className='text-opacity-50'>No Categories Found</div>}
          </div>
          :
          Object.keys(categories).map((item) => <CategoryCard key={categories[item]._id} category={categories[item]} changeCategory={changeCategory} fetchCategories={fetchCategories} />
          )}
      </div>
    </>
  );
}
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
import { useToast } from "@/components/ui/use-toast"
import axiosInstance from '@/lib/axiosInstance';
import { MdArrowForward, MdDelete } from "react-icons/md";
import { Button } from '@/components/ui/button';

export function CategoryCard({category,changeCategory,fetchCategories}:{category:Record<string,any>,changeCategory:(i:string)=>void,fetchCategories:()=>void}){
  const { toast } = useToast()
  async function deleteCategory(){
    const res = await axiosInstance.delete('/ecommerce/categories/'+category._id)
    if(res.data.success){
      toast({
        title: "Category Deleted",
      })
      fetchCategories()
    }
    else{
      toast({
        title: "Category has products, cannot delete",
        variant: "destructive",
      })
    }
  }

  return (
    <div className='relative group flex w-full justify-between items-center hover:pr-6 bg-card hover:bg-primary-foreground border  border-transparent drop-shadow-sm transition-all grow-0 rounded-md' >
      <div onClick={()=>changeCategory(category._id)} className='absolute w-full h-full cursor-pointer -z-10'></div>
      <div className='flex p-6 px-6'>
        <div>{category.name}</div>        
      </div>
      <div className='flex items-center'>
        <div className='ml-6 text-sm text-opacity-75 mr-6'>{category.owner.username}</div>
        <div className='hidden group-hover:block'><AddCategory edit category={category} fetchCategories={fetchCategories}/></div>
        
        <AlertDialog>
          <AlertDialogTrigger asChild>
          <Button variant={"destructive"} className='hidden group-hover:block ml-2'><div className='scale-125'><MdDelete/></div></Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                Once a category is deleted it cannot be recovered another category with the samme name can be created.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={deleteCategory}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <div className='hidden group-hover:block ml-4'><MdArrowForward/></div>
      </div>
      
    </div>
  )
}
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from 'react';
import { MdEdit } from "react-icons/md";
import {IoMdAdd} from "react-icons/io";

export function AddCategory({edit=false,category,fetchCategories}:{edit?:boolean,category?:Record<string,string>,fetchCategories:()=>void}){
  const [name, setName] = useState(category ? category.name:"")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const [dialogOpen,setDialogOpen] = useState(false)

  function createCategory(){
    setLoading(true)
    try{
      axiosInstance.post('/ecommerce/categories',{name})
      .then((res)=>{
        if(res.data.success){
          toast({
            title: "Category Created",
          })
          setName('')
          setLoading(false)
          setDialogOpen(false)
          fetchCategories()
        }
        else{
          toast({
            title: "Category alreay Exists!",
            variant: "destructive",
          })
          setLoading(false)
        }
      })
    }
    catch(e){
      console.log(e)
      toast({
        title: "Sommething went wrong!",
        variant: "destructive",
      })
      setLoading(false)
    }
    setLoading(false)
  }
  function updateCategory(){
    setLoading(true)
    axiosInstance.patch('/ecommerce/categories/'+category?._id,{name})
     .then((res)=>{
       if(res.data.success){
        toast({
          title: "Category Updated",
        })
        setLoading(false)
        setDialogOpen(false)
        fetchCategories()
       }
       else{
        toast({
          title: "Category alreay exists with same name!",
          variant: "destructive",
        })
        setLoading(false)
       }
     })
     .catch(e=>{
       toast({
        title: "Sommething went wrong!",
        variant: "destructive",
       })
       setLoading(false)
     })    
    setLoading(false)
  }
 
  return (
    <Dialog open={dialogOpen}>
      <DialogTrigger asChild>
        <Button className='gap-x-3 py-5' variant={edit?"outline":"default"} onClick={()=>setDialogOpen(true)}>
          {edit?<div className='scale-125'><MdEdit/></div>:<><IoMdAdd className="scale-150" />New Category</>}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{edit?"Edit "+category?.name+" category":"Create a new category"}</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
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
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter className="justify-end">
          <Button type="button" variant="secondary" onClick={()=>setDialogOpen(!dialogOpen)}>
              Close
          </Button>
          <Button onClick={edit?updateCategory:createCategory} disabled={loading||name.length==0}>{loading?<div className='animate-spin px-6'><AiOutlineLoading3Quarters/></div>:edit?"Update":`Create`}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}