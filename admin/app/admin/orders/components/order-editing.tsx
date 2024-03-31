/* eslint-disable @next/next/no-img-element */
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import React from 'react'
import { orderListSchema } from "../../../../schema/orderSchema"


function EditOrder({row}:{row:any}) {
  const order = orderListSchema.parse(row.original)
  return (
    <Sheet>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent side={'left'} className=" w-[600px]  p-0">
            <SheetHeader className="p-4">
                <SheetTitle className="flex items-center gap-x-4 justify-between pr-7">
                    <div className="flex items-center gap-x-4">
                        Order Details 
                       
                    </div>
                    <div className="text-sm">
                        order_id : {order._id}
                    </div>
                </SheetTitle>
            </SheetHeader>
            <div className="grid gap-4 py-4 h-full">
             <ProfileForm order_id={order._id}/>
            </div>
        </SheetContent>
    </Sheet>
  )
}

export default EditOrder  

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { itemType } from "../../../../schema/orderSchema"
import  useOrderById  from "@/hooks/useOrderById"

export function ProfileForm({order_id}:{order_id:string}) {
  
  const {order_data,loading,error} = useOrderById(order_id)

  if(order_data==undefined || loading || error )
  return (
    <div className="w-full h-full flex">
      <div className="animate-spin flex-grow-0 h-fit mx-auto">
        {error?<div>Some Error Occured Retry!</div>:<AiOutlineLoading3Quarters className="scale-150"/>}
      </div>
    </div>
  )
  
  var OrderDate = new Date(order_data.createdAt)

  return (
    <>
      { 
        <div className="w-full h-full overflow-y-scroll  p-4 pb-[50px] dark:border-border">
          <div className="w-full">
            {/* Order Details */}
            <div className="border-2 rounded-md border-black dark:border-border">
              <Row item={"Order date"} item2={OrderDate.toLocaleDateString('en-US', {day: 'numeric',month: 'long',year: 'numeric',})}/>
              <Row item={"Order id"} item2={order_data._id}/>
              <Row item={"Order total"} item2={`Rs. ${order_data.discountedOrderPrice} ( ${order_data.items.length} items)`} border={false}/>
            </div>
            {/* Payment Details */}
            <div className=" py-2 text-lg font-semibold dark:border-border">
              Payment Details
            </div>
            <div className="border-2 rounded-md border-black dark:border-border">
              <Row item={"Payment Status"} item2={order_data.isPaymentDone?'Verified':'Not Verified'}/>
              <Row item={"Payment Id"} item2={order_data.paymentId}/>
              <Row item={"Payment Provider"} item2={order_data.paymentProvider} border={false}/>
            </div>
            {/* Shipment Details */}
            <div className=" py-2 text-lg font-semibold dark:border-border">
              Shipment Details
            </div>
            <div className="border-2 rounded-md border-black dark:border-border">
              <Row item={"Shipment Status"} item2={order_data.status}/>
              <Row 
                item={<div className="font-bold">Shipping Address</div>} 
                item2={
                    <div className="text-right">
                      <div>{order_data.address.addressLine1}</div>
                      <div>{order_data.address.addressLine2}</div>
                    </div>
                }
                border={false}
                className="py-[0px]"
              />
              <Row item={"City :"} item2={order_data.address.city} border={false} className="py-[0px]"/>
              <Row item={"State :"} item2={order_data.address.state} border={false} className="py-[0px]"/>
              <Row item={"Pincode :"} item2={order_data.address.pincode} border={false} className="py-[0px]"/>
            </div>
            <div className=" py-2 text-lg font-semibold">
              Customer Details
            </div>
            <div className="border-2 rounded-md border-black dark:border-border">
              <Row item={"Customer ID"} item2={order_data.customer._id}/>
              <Row item={"Email"} item2={order_data.customer.email}/>
              <Row item={"Username"} item2={order_data.customer.username} border={false}/>
            </div>
            {/* Price Details */}
            <div className=" py-2 text-lg font-semibold">
              Price Details
            </div>
            <div className="border-2 rounded-md border-black dark:border-border">
              <div>
                {
                  order_data.items.map((item:itemType,index:number) => {
                    return (
                      <div key={index}>
                        <Row
                          item={
                            <div className="flex gap-x-4">
                              <div>
                                <img src={item.product.mainImage.url} className="w-36 rounded-sm" alt={`product_thumbnail`} />
                              </div>
                              <div>
                                <div className="text-lg font-semibold line-clamp-2">{order_data.items[0].product.name}</div>
                                <div className="text-base">Price : Rs. {item.product.price}</div>
                                <div className="text-sm">Qty: {item.quantity}</div>
                              </div>
                            </div>
                          }
                          item2={
                            <div>
                              <div className="text-base">Rs. {item.product.price*item.quantity}</div>
                            </div>
                          }
                        />
                      </div>
                    )
                  })
                }
              </div>
              <Row item={"Sub total :"} item2={`Rs. ${order_data.orderPrice}`} border={false}/>
              <Row item={"Charges (inc. delivery and other)  :"} item2={`Rs. ${0}`} border={false}/>
              <Row item={`Discount (${order_data.coupon?.couponCode})`} item2={`- Rs. ${order_data.orderPrice-order_data.discountedOrderPrice}`} border={false}/>
              <Row item={`Tax :`} item2={`Rs. ${0}`} border={false}/>
              <Row item={`Order Total :`} item2={`Rs. ${order_data.discountedOrderPrice}`} border={false}/>
            </div>
          </div>
        
        </div>
      }


    </>
  )
}

function Row({item,item2,border=true,className}:{item:any,item2:any,border?:boolean,className?:string}) {
  return (
    <div className={`flex justify-between  ${className} p-2 ${border && `border-b-2 border-black dark:border-border`}`}>
      <div>{item}</div>  
      <div>{item2}</div>     
    </div>
  )
}