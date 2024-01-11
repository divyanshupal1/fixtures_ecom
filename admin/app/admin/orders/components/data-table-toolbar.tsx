"use client"

import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "./data-table-view-options"

import { payment, sellers, statuses } from "../data/filtersData"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { DatePickerWithRange } from "./date-picker"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Order Id..."
          value={(table.getColumn("_id")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("_id")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn("isPaymentDone") && (
          <DataTableFacetedFilter
            column={table.getColumn("isPaymentDone")}            
            title="Payment"
            options={payment}
          />
        )}
        {table.getColumn("seller") && (
          <DataTableFacetedFilter
            column={table.getColumn("seller")}
            title="seller"
            options={sellers}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex  items-center gap-x-5">
        <DataTableViewOptions table={table} />
      </div>
    </div>
  )
}
