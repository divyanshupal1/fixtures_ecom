import { orderListData } from "../../data";
import { NextRequest } from "next/server";

function divideArrayIntoSubarrays(arr:typeof orderListData.data.orders, n:number) {
  const subarrays = [];
  for (let i = 0; i < arr.length; i += n) {
      subarrays.push(arr.slice(i, i + n));
  }
  return subarrays;
}

export async function GET(request:NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const { page, limit,status } = { page: Number(searchParams.get('page'))||1, limit: Number(searchParams.get('limit'))||20, status: searchParams.get('status') };
  const filteredData = orderListData.data.orders.filter((order) => {
    if (status) {
      return order.status === status;
    }
    return true;
  });
  let newOrders = divideArrayIntoSubarrays(filteredData, limit);
  let response = {
    data: {
      "orders": newOrders[page-1],
      "totalOrders": orderListData.data.orders.length,
      "limit": limit,
      "page": page,
      "totalPages": newOrders.length,
      "serialNumberStartFrom": (page - 1) * limit + 1,
      "hasPrevPage": page > 1,
      "hasNextPage": page < newOrders.length,
      "prevPage": page > 1 ? page - 1 : null,
      "nextPage": page < newOrders.length ? page + 1 : null,
    },
    message: "succcess",
    statusCode: 200,
    success: true,
  };

  return new Response(JSON.stringify(response), {});
}