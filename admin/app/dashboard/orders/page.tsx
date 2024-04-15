"use client"

import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"
import { Button } from "@/components/ui/button"
import useOrderList from "@/hooks/useOrderList"
import React from "react"


export default function TaskPage() {
  const [status, setStatus] = React.useState<"PENDING"|"DELIVERED"|"CANCELLED">("PENDING") // ["PENDING","DELIVERED","CANCELLED"
  const [page, setPage] = React.useState(1)
  const [limit, setLimit] = React.useState(20)
  const { orders, loading, error } = useOrderList(status,page,limit);

  function updateStatus(status:"PENDING"|"DELIVERED"|"CANCELLED"){
    setStatus(status)
    setPage(1)
  }

  return (
    <>
      <div className=" h-full grow w-full flex flex-col justify-start items-start space-y-8 max-sm:space-y-5 p-2 sm:p-8 sm:py-0 sm:pt-5 sm:pb-3 md:flex">
          <div className="flex max-sm:flex-col max-sm:items-start max-sm:gap-y-3  gap-x-3 justify-between items-center w-full">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Orders</h2>
            </div>
            <div className="flex flex-1 items-center justify-end space-x-0 sm:space-x-2">
              <Button variant={status != "PENDING"?"secondary":"default"} onClick={()=>updateStatus("PENDING")} className="h-8">Pending</Button>
              <Button variant={status != "DELIVERED"?"secondary":"default"} onClick={()=>updateStatus("DELIVERED")} className="h-8">Delivered</Button>
              <Button variant={status != "CANCELLED"?"secondary":"default"} onClick={()=>updateStatus("CANCELLED")} className="h-8">Cancelled</Button>
            </div>
          </div>
        {!loading && <DataTable data={orders} status={{get:status,set:setStatus}} columns={columns} page={{get:page,set:setPage}} limit={{get:limit,set:setLimit}} />}
      </div>
    </>
  )
}
