"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import {payment, sellers, statuses } from "../data/filtersData"
import { OrderListType} from "../../../../schema/orderSchema"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import { customerType } from "../../../../schema/orderSchema"


type Extended = ColumnDef<OrderListType> | { title:string }

export const columns: Extended[] = [
  {
    accessorKey: "count",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="S.no" />
    ),
    title:"S.no",
    cell: ({ row }) => {
      return <div className="w-[40px] truncate">{row.index+1+"."}</div>
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="OrderId" />
    ),
    title:"OrderId",
    cell: ({ row }) => {
      return <div className="w-[120px] truncate">{row.getValue("_id")}</div>
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "customer",
    title:"Customer",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer" />
    ),
    cell: ({ row }) => {
      const customer : customerType = row.getValue("customer")
      return <div className="w-[120px] truncate">{customer.email}</div>
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "seller",
    title:"Seller",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Seller" />
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableSorting: true,
    enableHiding: true,
    cell: ({ row }) => {
      const label = sellers.find((label) => label.value === row.getValue("seller"))

      return (
        <div className="flex space-x-2">
          {/* {label && <Badge variant="outline">{label.label}</Badge>} */}
          <span className="max-w-[200px] truncate font-medium">
            {label?.label}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "discountedOrderPrice",
    title:"Order Price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order Price" />
    ),
    enableSorting: true,
    enableHiding: true,
    cell: ({ row }) => {
      // const label = labels.find((label) => label.value === row.original.label)

      return (
        <div className="flex space-x-2">
          {/* {label && <Badge variant="outline">{label.label}</Badge>} */}
          <span className="max-w-[200px] truncate font-medium">
            {row.getValue("discountedOrderPrice")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "orderPrice",
    title:"Price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    enableSorting: true,
    enableHiding: true,
    cell: ({ row }) => {
      // const label = labels.find((label) => label.value === row.original.label)

      return (
        <div className="flex space-x-2">
          {/* {label && <Badge variant="outline">{label.label}</Badge>} */}
          <span className="max-w-[200px] truncate font-medium">
            {row.getValue("orderPrice")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "coupon",
    title:"Coupon Used",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Coupon Used" />
    ),
    cell: ({ row }) => {

      const coupon = row.getValue("coupon")

      return (
        <div className="flex items-center">
          <Badge variant={coupon?'default':'secondary'} className={coupon?'bg-green-600':''}>{coupon?"YES":"NO"}</Badge>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "createdAt",
    title:"Order Date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order Date" />
    ),
    enableSorting: true,
    enableHiding: true,
    cell: ({ row }) => {
      const val = new Date(row.getValue("createdAt")).toLocaleDateString("en-US",{ month: 'long', day: 'numeric',year: 'numeric'})

      return (
        <div className="flex space-x-2">
          {/* {label && <Badge variant="outline">{label.label}</Badge>} */}
          <span className="max-w-[200px] truncate font-medium">
            {val}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    title:"Status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      )

      if (!status) {
        return null
      }

      return (
        <div className="flex w-fit items-center ">
          <Badge variant={status.label=='CANCELLED'?"destructive":status.label=='PENDING'?"secondary":'default'}>{status.label}</Badge>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "isPaymentDone",
    title:"Payment",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payment" />
    ),
    cell: ({ row }) => {
      const payStatus = payment.find(
        (payment) => (payment.value) === row.getValue("isPaymentDone")
      )
      return (
        <div className="flex items-center">
          <Badge variant={payStatus?.value?'default':'secondary'} className={payStatus?.value?'bg-green-600':''}>{payStatus?.label}</Badge>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  }
]
