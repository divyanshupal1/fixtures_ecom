"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import useOrderList from "@/hooks/useOrderList"
import React from "react"


export default function TaskPage() {
  // const { orders, loading, error } = useOrderList(status,page,limit);

  return (
    <>
      <div className=" h-full grow w-full flex flex-col justify-start items-start space-y-8 max-sm:space-y-5 p-2 sm:p-8 sm:py-0 sm:pt-5 sm:pb-3 md:flex">
          <div className="flex max-sm:flex-col max-sm:items-start max-sm:gap-y-3  gap-x-3 justify-between items-center w-full">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Orders</h2>
            </div>
            <div className="flex items-center gap-x-3">
              <Input placeholder="Search order by id" className="border-2 border-slate-500"/>
              <Input placeholder="Search order by phone" className="border-2 border-slate-500"/>
              <Button className="h-8">Search</Button>
            </div>
          </div>
          <div className="w-full h-auto  rounded-lg border dark:border-slate-600 overflow-hidden">
              <div className="w-full flex justify-around rounded-t-lg border-b dark:border-slate-700 bg-neutral-300 dark:bg-slate-900 items-center *:p-2 *:border-r *:text-center *:flex-grow-0  *:dark:border-slate-700">
                  <div className="w-[15%]">Order id</div>
                  <div className="w-[15%]">Date</div>
                  <div className="w-[15%]">Customer</div>
                  <div className="w-[15%]">Total</div>
                  <div className="w-[15%]">Payment</div>
                  <div className="w-[15%]">Status</div>
                  <div className="w-[10%]">Action</div>
              </div>
              <div className="w-full flex justify-around *:p-2 border-b dark:border-slate-700 rounded-t-lg items-center  *:border-r *:text-center *:flex-grow-0 *:dark:border-slate-700 *:text-ellipsis *:whitespace-nowrap *:overflow-hidden">
                  <div className="w-[15%]">#5425365467</div>
                  <div className="w-[15%]">22-Nov-2024</div>
                  <div className="w-[15%]">amantiwari@gmail.com</div>
                  <div className="w-[15%]">₹ 2809</div>
                  <div className="w-[15%]"><PaymentLabel isPaymentDone={true}/></div>
                  <div className="w-[15%]"><StatusLabel status="CANCELLED"/></div>
                  <div className="w-[10%]"><RowActions/></div>
              </div>
              
          </div>
      </div>
    </>
  )
}

interface OrderListRowProps {
  order: {
    _id:string,
    createdAt:string,
    customer:{
      email:string
    },
    orderPrice:number,
    isPaymentDone:boolean,
    status:string
  }
}


const OrderListRow = ({order}:OrderListRowProps) => {
  return (
    <div className="w-full flex justify-around *:p-2 border-b dark:border-slate-700 rounded-t-lg items-center  *:border-r *:text-center *:flex-grow-0  *:w-[14.28%] *:dark:border-slate-700 *:text-ellipsis *:whitespace-nowrap *:overflow-hidden">
        <div>{order._id}</div>
        <div>{order.createdAt}</div>
        <div>{order.customer.email}</div>
        <div>₹ {order.orderPrice}</div>
        <div>{order.isPaymentDone?"verified":"pending"}</div>
        <div>{order.status}</div>
        <div>. . .</div>
    </div>
  )
}

const PaymentLabel = ({isPaymentDone}:{isPaymentDone:boolean}) => {
  if(isPaymentDone){
    return <span className="bg-green-700 text-green-200 text-sm px-3 py-1 rounded-full">verified</span>
  }else{
    return <span className="bg-red-500 text-red-100 text-sm px-3 py-1 rounded-full">Pending</span>
  }
}

const StatusLabel = ({status}:{status:string}) => {
  if(status == "PENDING"){
    return <span className="bg-yellow-700 text-yellow-100 text-sm px-3 py-1 rounded-full">Pending</span>
  }else if(status == "DELIVERED"){
    return <span className="bg-green-700 text-green-200 text-sm px-3 py-1 rounded-full">Delivered</span>
  }else{
    return <span className="bg-red-500 text-red-100 text-sm px-3 py-1 rounded-full">Cancelled</span>
  }
}

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MdOutlineMoreHoriz, MdOutlineMoreVert } from "react-icons/md";

const RowActions = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="px-2"><MdOutlineMoreVert/></DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}