import { Metadata } from "next"
import { z } from "zod"

import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"
import { UserNav } from "./components/user-nav"
import { orderListSchema } from "@/schema/orderSchema"
import { getDummyOrderListData, orderListData } from "../../../dummyData/orderData"
export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
}



export default async function TaskPage() {
  const tasks =  getDummyOrderListData()

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
        <DataTable data={tasks} columns={columns}/>
      </div>
    </>
  )
}
