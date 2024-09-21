import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axiosInstance from '@/lib/axiosInstance';
import { GridItem, Grid, useGridStore } from '@/store/gridStore';
import { useToast } from '@/components/ui/use-toast';
import { useUserStore } from '@/store/userStore';
import { Dialog, DialogContent, DialogTrigger } from '@radix-ui/react-dialog';
import { HexColorPicker } from "react-colorful";


export const GridComp = () => {
  const {toast} = useToast()

  const user = useUserStore((state)=>state.user)
  const {grid,fetchGrid,updateGridData} = useGridStore((state)=>({
    grid:state.grid,
    fetchGrid:state.fetchGrid,
    updateGridData:state.updateGrid
  })) 
  
  const [localGrid,setLocalGrid]=useState(grid)
  const updateGrid = (key:keyof Grid,value:GridItem) => {
    if(localGrid==null) return
    setLocalGrid({...localGrid,[key]:value})
  }

  useEffect(()=>{
    grid!=null && setLocalGrid(grid)
  },[grid])

  useEffect(()=>{
    if(user==null) return
    const fetchData = async () =>{
      const res = await fetchGrid();
      if(!res){
        toast({
          title:"error fetching data"
        })
      }
    }
    fetchData()
  },[fetchGrid,toast,user])

  const handleSave = async () => {
    const res = await updateGridData(grid?._id|| "",localGrid!)
    if(res){
      toast({
        title:"Grid updated successfully!"
      })
    }else{
      toast({
        title:"Error Updating grid !"
      })
    }
  }

  if(localGrid==null) return <></>
  
  return (
    <>
    <div className='w-full h-full flex flex-col md:flex-row items-center gap-x-4 gap-y-4'>
      <div className='w-full md:w-1/2 aspect-square relative bg-black'>
        <GridContent content={localGrid.leftImage} name="leftImage" setGrid={updateGrid}/>
      </div>
      <div className='w-full h-full md:w-1/2 md:aspect-square flex flex-col items-start gap-x-4 gap-y-4'>
        <div className='w-full h-full max-md:aspect-video md:h-1/2 bg-black relative'>
          <GridContent content={localGrid.rightTopImage} name="rightTopImage" setGrid={updateGrid}/>
        </div>
        <div className='w-full h-auto flex-grow flex flex-col md:flex-row gap-x-4 gap-y-4'>
            <div className='w-full h-full md:w-1/2 bg-black max-md:aspect-video relative'> 
              <GridContent content={localGrid.rightBottomRightImage} name="rightBottomRightImage" setGrid={updateGrid}/>
            </div>
            <div className='w-full h-full md:w-1/2 bg-black max-md:aspect-video relative'>
              <GridContent content={localGrid.rightBottomLeftImage} name="rightBottomLeftImage" setGrid={updateGrid}/>              
            </div>
        </div>

      </div>
    </div>
    <Button className='mt-2' onClick={handleSave}>Save Grid</Button>
    </>
  )
}

interface GridContentProps {
  name:keyof Grid
  content:GridItem
  setGrid:(key: keyof Grid,value:GridItem)=>void
}

const GridContent = ({content,name,setGrid}:GridContentProps) => {

  const handleImageChange = async (img:File|undefined|null) =>{
      const url = await uploadImage(img);
      setGrid(name,{...content,imageUrl:url})
  }
  const [color, setColor] = useState("#aabbcc");

  
  return (
    <>
    <div className='absolute bottom-0 p-6 w-[242px] '>
      <input className='text-xl font-bold bg-black bg-opacity-15 ' 
        value={content.title}
        onChange={(e)=>setGrid(name,{...content,title:e.target.value})}
        style={{color:content.textColor}}
      />

      <input className="text-sm my-4 bg-black bg-opacity-15 " 
        value={content.description}
        onChange={(e)=>setGrid(name,{...content,description:e.target.value})}
        style={{color:content.textColor}}
      />

      <a href={content.buttonAction}>
        <div className='p-3 border-b-2 w-fit'>Shop Now</div>
      </a>
    </div>
    <img src={content.imageUrl} className='h-full w-full object-cover'/>
    
    <div className='absolute top-0 left-0 p-2 w-full flex gap-x-2'>
      <div className='relative cursor-pointer'>
        <Button size={"sm"} variant={"secondary"} className='pointer-events-none'>Change Image</Button>
        <input type='file' onChange={(e)=>handleImageChange(e.target?.files?.[0])} className='h-full w-full opacity-0 absolute left-0 z-10 cursor-pointer'/>
      </div>      
      <Dialog>
        <DialogTrigger asChild><Button size={"sm"} variant={"secondary"}>Change Link</Button></DialogTrigger>
        <DialogContent className='bg-black'>
          <Input value={content.buttonAction} onChange={(e)=>setGrid(name,{...content,buttonAction:e.target.value})}/>
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger asChild><Button size={"sm"} variant={"secondary"}>Color</Button></DialogTrigger>
        <DialogContent className='absolute left-2 top-12'>
            <HexColorPicker color={content.textColor} onChange={(value)=>setGrid(name,{...content,textColor:value})} />
        </DialogContent>
      </Dialog>
    </div>
    </>
  )
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
    return res.data.url
  }
  else return ""
}