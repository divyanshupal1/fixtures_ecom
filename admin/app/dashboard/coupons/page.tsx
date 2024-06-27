"use client"
import React, { useEffect } from 'react'
import { useCouponStore,couponType} from '@/store/productStore'
import { Button } from '@/components/ui/button'
import { MdAdd, MdDelete, MdEdit } from 'react-icons/md'

const Page = () => {

  const [addDialogOpen, setAddDialogOpen] = React.useState(false)
  const {coupons,fetchCoupons} = useCouponStore((state)=>({
    coupons:state.coupons,
    fetchCoupons:state.fetchCoupons
  }))
  console.log(coupons)
  React.useEffect(()=>{
    fetchCoupons()
  },[])

  const [focused, setFocused] = React.useState("")
  const updateFocused = (id:string)=>{
    if(focused===id){
      setFocused("")
    }
    else{
      setFocused(id)
    }
  }
  React.useEffect(()=>{
    if(focused!=""){
      setAddDialogOpen(true);
    }
    else{
      setAddDialogOpen(false);
    }
  },[focused])

  return (
    <>
      <AddCoupon isOpen={addDialogOpen} id={{get:focused,set:updateFocused}} close={()=>{setAddDialogOpen(false)}}/>
      <div className="flex max-sm:items-start justify-between items-center w-full mb-5 px-5 pt-8 rounded-xl">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Coupons
          </h2>
        </div>
        <div>
          <Button className="bg-primary text-white px-6" onClick={()=>{setFocused("");setAddDialogOpen(true)}}><MdAdd className='mr-3'/>Create Coupon</Button>
        </div>
      </div>
      <div className="px-5 max-sm:px-2 grid  grid-cols-1 relative sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 w-full h-full flex-wrap ">
        {coupons&&coupons.map((coupon:couponType)=> <Coupon key={coupon._id} focused={{get:focused,set:updateFocused}} coupon={coupon} />)}        
      </div>

    </>
  )
}
export default Page



const Coupon = ({coupon,focused}:{coupon:couponType,focused:{get:string,set:(id:string)=>void}})=>{
  const startDate = new Date(coupon.startDate)
  const endDate = new Date(coupon.expiryDate)

  return (
    <div className={`grow shrink-0 transition-all relative group`}>
      <div className={`coupon bg-card p-3 shadow-md rounded-lg min-w-[280px] max-w-[400px] flex gap-x-4 relative group-hover:scale-105 transition-all  `} >
        <div className='bg-blue-500 text-white  rounded-lg flex flex-col justify-center items-center px-3 py-3 gap-y-2'>
          <div className='flex flex-col items-center'>
            <span className="text-4xl font-bold">{coupon.discountValue}</span>
            <span className="text-xl font-semibold">{coupon.type}</span>
          </div>  
          <span className='text-sm font-medium whitespace-nowrap'>Min txn. {coupon.minimumCartValue}</span>          
        </div>
        <div className='flex flex-col justify-between'>
          <div className='flex flex-col'>
            <span className="text-lg font-semibold">{coupon.name}</span>
            <span className="text-sm font-medium">{startDate.getDate()} {startDate.toLocaleString('default', { month: 'short' })} - {endDate.getDate()} {endDate.toLocaleString('default', { month: 'short' })}</span>
          </div>         
          <div>          
            <span className='font-bold text-base rounded-full text-center bg-secondary border-2 border-secondary p-0.5 px-1'>{coupon.couponCode}</span>
          </div>
        </div>
        { 
          coupon.isActive&&
          <div className='absolute right-2 bottom-2 p-1 rounded-full bg-green-200 bg-opacity-90'>
            <div className='p-1 rounded-full bg-green-300'>
              <div className='w-2 h-2 rounded-full bg-green-400'></div>
            </div>
          </div>
        }
      </div>
      {
      <div className='hidden bg-accent bg-opacity-65 rounded-full absolute right-[10px] top-1/2 -translate-y-1/2 z-50 group-hover:flex flex-col gap-y-2 p-1.5'>
          <div className='w-9 h-9 flex justify-center items-center rounded-full bg-green-500' onClick={()=>focused.set(coupon._id)}><div className='scale-125'><MdEdit/></div></div>
          <AlertCouponDelete id={coupon._id}/>
      </div>
      
      }
    </div>
  )
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
} from "@/components/ui/alert-dialog"


export function AlertCouponDelete({id}:{id:string}) {
  const {deleteCoupon} = useCouponStore((state)=>({
    deleteCoupon:state.deleteCoupon
  }))
  const {toast} = useToast()
  const handleDelete = async ()=>{
    const res = await deleteCoupon(id)
    if(res){
      toast({
        title:"Coupon Deleted",      
      })
    }
    else{
      toast({
        title:"Error",
        description:"Something went wrong", 
        variant:"destructive"
      })
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
      <div className='p-2 rounded-full border-2 border-red-500 bg-red-500 bg-opacity-45'><div className='scale-125'><MdDelete/></div></div>
      </AlertDialogTrigger>
      <AlertDialogContent className='border-border'>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete coupon ?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className='bg-red-500 hover:bg-red-600 text-white' onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}



import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DatePickerWithRange } from '../orders/components/date-picker'
import { DateRange } from 'react-day-picker'
import { addDays, set } from 'date-fns'
import { useToast } from '@/components/ui/use-toast'

export function AddCoupon({isOpen,close,id}:{isOpen:boolean,close:()=>void,id:{get:string,set:(id:string)=>void}}) {

  const {toast} = useToast()

  const [loading, setLoading] = React.useState(false)

  const [date, setDate] = React.useState<DateRange|undefined>({
    from: new Date(),
    to: addDays(new Date(), 20),
  })

  const {createCoupon,updateCoupon,coupons} = useCouponStore((state)=>({
    createCoupon:state.createCoupon,
    coupons:state.coupons,
    updateCoupon:state.updateCoupon
  }))

  const [coupon,setCoupon] = React.useState(id.get!=""?coupons.find((c:couponType)=>c._id===id.get)!:{
    name:'',
    couponCode:'',
    discountValue:0,
    type:'FLAT',
    minimumCartValue:0,
  })

  useEffect(()=>{
    if(id.get!=""){
      const coupon = coupons.find((c:couponType)=>c._id===id.get)
      if(coupon){
        const startDate = new Date(coupon.startDate)
        const endDate = new Date(coupon.expiryDate)
        const dateField = {
          from:startDate,
          to:endDate
        }
        setDate(dateField)
        setCoupon(coupon)
      }
    }
    else{
      setCoupon({
        name:'',
        couponCode:'',
        discountValue:0,
        type:'FLAT',
        minimumCartValue:0,
      })
    }
  },[id.get,coupons])

  const handleSubmit = async (e:React.FormEvent)=>{
    setLoading(true)
    e.preventDefault()
    const dateField = {
      startDate:date?.from?.toISOString()||"",
      expiryDate:date?.to?.toISOString() || "",
    }
    const res = id.get==" "?
    await createCoupon({
      name:coupon.name,
      couponCode:coupon.couponCode,
      discountValue:coupon.discountValue,
      type:coupon.type,
      minimumCartValue:coupon.minimumCartValue,     
      ...dateField

    }):
    await updateCoupon(id.get,{
      name:coupon.name,
      couponCode:coupon.couponCode,
      discountValue:coupon.discountValue,
      type:coupon.type,
      minimumCartValue:coupon.minimumCartValue,     
      ...dateField
    })

    if(res){
      setLoading(false)
      toast({
        title:`Coupon ${id.get==""?"Created":"Updated"}`,
      })
      close()

    }
    else{
      toast({
        title:"Error",
        description:"Something went wrong",
        variant:"destructive"
      })
      setLoading(false)
    }
    id.set("")

  }

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[425px] max-sm:h-full">
        <DialogHeader>
          <DialogTitle>{id.get==""?"Create":"Edit"} Coupon</DialogTitle>
          <DialogDescription>
            Create coupons for the customers.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="name">
              Coupon Name
            </Label>
            <Input
              id="name"
              placeholder="New User Coupon"
              className="col-span-3"
              value={coupon?.name}
              onChange={(e)=>setCoupon({...coupon,name:e.target.value})}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="name">
              Coupon Code
            </Label>
            <Input
              id="name"
              placeholder="WELCOME50"
              className="col-span-3"
              value={coupon.couponCode}
              onChange={(e)=>setCoupon({...coupon,couponCode:e.target.value})}
            />
          </div>
          <div className='grid grid-cols-2 gap-x-4'>
            <div className="flex flex-col gap-y-2">
              <Label htmlFor="name">
                Discount Value
              </Label>
              <Input
                id="name"
                type='number'
                placeholder="700"
                className="col-span-3"
                value={coupon.discountValue}
                onChange={(e)=>setCoupon({...coupon,discountValue:parseInt(e.target.value)})}
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label htmlFor="name">
                Discount Type
              </Label>
              <ToggleGroup type="single" className='w-full' onValueChange={(val)=>setCoupon({...coupon,type:val})} value={coupon.type}>
                <ToggleGroupItem value="FLAT" aria-label="Toggle flat" className='w-1/2'>
                  Flat
                </ToggleGroupItem>
                <ToggleGroupItem value="PERCENT" aria-label="Toggle percent"  className='w-1/2'>
                  Percent
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
              <Label htmlFor="name">
                Minimum Cart Value
              </Label>
              <Input
                id="name"
                type='number'
                placeholder="700"
                className="col-span-3"
                value={coupon.minimumCartValue}
                onChange={(e)=>setCoupon({...coupon,minimumCartValue:parseInt(e.target.value)})}
              />
          </div>
          <div className="flex flex-col gap-y-2">
              <Label htmlFor="name">
                Active Period
              </Label>
              <DatePickerWithRange date={date} setDate={setDate}/>
          </div>
          
          
        </div>
        <DialogFooter className='gap-y-3 flex-row justify-end items-end gap-x-3'>
          <Button onClick={close} variant={"secondary"} className='max-sm:w-1/2' disabled={loading}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit} className='max-sm:w-1/2' loading={loading} disabled={loading}>{id.get==""?"Create":"Save"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
