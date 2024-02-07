import { orderListData } from "./data";
import { NextRequest } from "next/server";

export async function GET(request:NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const { page, limit,status } = { page: searchParams.get('page'), limit: searchParams.get('limit'), status: searchParams.get('status') };
  console.log(page, limit, status)
  const filteredData = orderListData.data.orders.filter((order) => {
    if (status) {
      return order.status === status;
    }
    return true;
  });
  return new Response(JSON.stringify(filteredData), {});
}