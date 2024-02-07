"use client"

import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"
import { UserNav } from "./components/user-nav"
import useOrderList from "@/hooks/useOrderList"
import React from "react"


export default function TaskPage() {
  const [status, setStatus] = React.useState<"PENDING"|"DELIVERED"|"CANCELLED">("PENDING") // ["PENDING","DELIVERED","CANCELLED"
  const [page, setPage] = React.useState(1)
  const [limit, setLimit] = React.useState(20)
  const { orders, loading, error } = useOrderList(status,page,limit);

  return (
    <>
      <div className=" h-full flex-1 flex-col justify-start items-start space-y-8 p-2 sm:p-8 sm:py-0 sm:pt-5 sm:pb-3 md:flex">
        <div className="flex max-sm:flex-col items-center justify-between space-y-2 grow-0 w-full max-sm:items-start">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Orders</h2>
          </div>
          <div className="flex items-center space-x-2 gap-x-3">
            <span className="font-bold max-sm:hidden">Date Range : </span>
            <UserNav />
          </div>
        </div>
        {!loading && <DataTable data={orders} status={{get:status,set:setStatus}} columns={columns} page={{get:page,set:setPage}} limit={{get:limit,set:setLimit}} />}
      </div>
    </>
  )
}
